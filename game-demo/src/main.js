import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// ---------------------------------------------------------------- shared state
const U = {
  uTime: { value: 0 },
  uWind: { value: 1 },
};

// ------------------------------------------------------------------- terrain
// Hàm độ cao đảo. PHẢI giữ giống hệt bản GLSL bên dưới (nước dùng nó để tính bọt bờ).
const smooth = (a, b, x) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};
function terrainH(x, z) {
  const d = Math.hypot(x, z) / 22;
  let h = 3.0 * (1 - smooth(0.15, 1.0, d)) - 1.6;
  h += 0.35 * Math.sin(x * 0.45) * Math.cos(z * 0.38) * (1 - smooth(0.3, 1.0, d));
  h += 0.15 * Math.sin(x * 1.1 + z * 0.7);
  return h;
}
const TERRAIN_GLSL = /* glsl */ `
float terrainH(vec2 p) {
  float d = length(p) / 22.0;
  float h = 3.0 * (1.0 - smoothstep(0.15, 1.0, d)) - 1.6;
  h += 0.35 * sin(p.x * 0.45) * cos(p.y * 0.38) * (1.0 - smoothstep(0.3, 1.0, d));
  h += 0.15 * sin(p.x * 1.1 + p.y * 0.7);
  return h;
}`;

function mulberry32(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20261030);

// ------------------------------------------------------------ renderer/scene
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xbfe3f2, 0.009);

const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1200);
camera.position.set(17, 8.5, 21);
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.8, 0);
controls.enableDamping = true;
controls.minDistance = 5;
controls.maxDistance = 60;
controls.maxPolarAngle = Math.PI * 0.49;

// -------------------------------------------------------------------- lights
const hemi = new THREE.HemisphereLight(0xcfe9ff, 0x6b7a4a, 0.9);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff1d6, 2.6);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
const sc = sun.shadow.camera;
sc.left = -22; sc.right = 22; sc.top = 22; sc.bottom = -22; sc.near = 1; sc.far = 160;
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.04;
scene.add(sun, sun.target);

// ----------------------------------------------------------------------- sky
const sky = new THREE.Mesh(
  new THREE.SphereGeometry(500, 32, 16),
  new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uZenith: { value: new THREE.Color() },
      uHorizon: { value: new THREE.Color() },
      uSunDir: { value: new THREE.Vector3() },
      uSunColor: { value: new THREE.Color() },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uZenith, uHorizon, uSunColor, uSunDir;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float t = clamp(d.y * 2.2, 0.0, 1.0);
        vec3 col = mix(uHorizon, uZenith, pow(t, 0.7));
        float s = max(dot(d, uSunDir), 0.0);
        col += uSunColor * (pow(s, 600.0) * 4.0 + pow(s, 10.0) * 0.35);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  }),
);
scene.add(sky);

// ------------------------------------------------------------------- terrain
{
  const geo = new THREE.PlaneGeometry(90, 90, 150, 150);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const sand = new THREE.Color(0xe8d49c);
  const wet = new THREE.Color(0xb7a574);
  const bed = new THREE.Color(0x4f7480);
  const grassA = new THREE.Color(0x79b550);
  const grassB = new THREE.Color(0x4c9a43);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const h = terrainH(x, z);
    pos.setY(i, h);
    const n = (Math.sin(x * 1.7) * Math.cos(z * 1.3) + 1) * 0.5; // đốm màu nhẹ
    if (h < -0.6) c.copy(bed);
    else if (h < 0.0) c.copy(bed).lerp(wet, smooth(-0.6, 0.0, h));
    else if (h < 0.28) c.copy(wet).lerp(sand, smooth(0.0, 0.1, h));
    else {
      c.copy(sand).lerp(grassA, smooth(0.28, 0.6, h));
      c.lerp(grassB, smooth(0.8, 1.6, h) * 0.6 + n * 0.25 * smooth(0.3, 0.7, h));
    }
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const terrain = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1 }),
  );
  terrain.receiveShadow = true;
  scene.add(terrain);
}

// --------------------------------------------------------------------- water
const water = (() => {
  const geo = new THREE.PlaneGeometry(500, 500, 250, 250);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      ...U,
      uDeep: { value: new THREE.Color(0x0b4f78) },
      uShallow: { value: new THREE.Color(0x3fd0c9) },
      uSkyColor: { value: new THREE.Color() },
      uSunDir: { value: new THREE.Vector3() },
      uSunColor: { value: new THREE.Color() },
      uFogColor: { value: new THREE.Color() },
      uFogDensity: { value: 0.009 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      varying vec3 vWorld;
      varying vec3 vN;
      void main() {
        vec3 p = position;
        float t = uTime;
        // 3 sóng sin chồng nhau; đạo hàm giải tích để có pháp tuyến
        float a1 = p.x * 0.35 + t * 0.8;
        float a2 = p.z * 0.5 + p.x * 0.2 - t * 0.6;
        float a3 = (p.x + p.z) * 0.9 + t * 1.3;
        p.y = sin(a1) * 0.12 + sin(a2) * 0.09 + sin(a3) * 0.04;
        float dx = cos(a1) * 0.35 * 0.12 + cos(a2) * 0.2 * 0.09 + cos(a3) * 0.9 * 0.04;
        float dz = cos(a2) * 0.5 * 0.09 + cos(a3) * 0.9 * 0.04;
        vN = normalize(vec3(-dx, 1.0, -dz));
        vWorld = p;
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime, uFogDensity;
      uniform vec3 uDeep, uShallow, uSkyColor, uSunDir, uSunColor, uFogColor;
      varying vec3 vWorld;
      varying vec3 vN;
      ${TERRAIN_GLSL}
      void main() {
        vec2 q = vWorld.xz;
        float t = uTime;
        // gợn nhỏ li ti làm vỡ mặt phản chiếu
        vec3 n = vN;
        n.xz += vec2(
          sin(q.y * 2.1 + t * 1.1) + sin(q.x * 3.3 - t * 0.9),
          cos(q.x * 2.3 + t * 0.8) + cos(q.y * 3.1 - t * 1.0)
        ) * 0.035;
        n = normalize(n);

        vec3 view = normalize(cameraPosition - vWorld);
        float fres = 0.04 + 0.96 * pow(1.0 - max(dot(n, view), 0.0), 4.0);

        // độ sâu = mực nước (0) trừ độ cao đáy; dùng cùng hàm với terrain
        float depth = max(-terrainH(q), 0.0);
        float shallow = exp(-depth * 1.1);
        vec3 body = mix(uDeep, uShallow, shallow);

        // phản xạ trời + điểm sáng mặt trời
        vec3 col = mix(body, uSkyColor, fres * 0.85);
        vec3 h = normalize(uSunDir + view);
        float spec = pow(max(dot(n, h), 0.0), 220.0);
        col += uSunColor * spec * 2.5;

        // bọt bờ: viền đặc + các dải sóng vỗ vào
        float wob = sin(t * 1.4 + q.x * 0.8 + q.y * 0.6) * 0.06;
        float edge = 1.0 - smoothstep(0.0, 0.16 + wob, depth);
        float ring = sin(depth * 11.0 - t * 1.7 + sin(q.x * 0.9 + q.y * 0.7) * 1.5);
        float rings = smoothstep(0.82, 1.0, ring) * (1.0 - smoothstep(0.1, 0.95, depth));
        float foam = clamp(edge + rings * 0.55, 0.0, 1.0);
        col = mix(col, vec3(1.0), foam);

        float alpha = mix(0.35, 0.93, smoothstep(0.0, 0.5, depth));
        alpha = max(alpha, foam);

        // sương mù (khớp FogExp2 của scene)
        float dist = length(cameraPosition - vWorld);
        float f = 1.0 - exp(-uFogDensity * uFogDensity * dist * dist);
        col = mix(col, uFogColor, f);
        alpha = mix(alpha, 1.0, f);

        gl_FragColor = vec4(col, alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 1;
  scene.add(mesh);
  return mesh;
})();

// ------------------------------------------------------- gió: rung cây/cỏ
// Chèn vào vertex shader của material chuẩn. Độ lắc tăng theo chiều cao.
function addSway(material, { stiff = 2.0, amp = 0.05 } = {}) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = U.uTime;
    shader.uniforms.uWind = U.uWind;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
         uniform float uTime;
         uniform float uWind;`,
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         #ifdef USE_INSTANCING
           vec3 ip = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
         #else
           vec3 ip = vec3(0.0);
         #endif
         float bend = pow(max(position.y, 0.0), ${stiff.toFixed(2)});
         // cơn gió giật: chậm, lan theo không gian
         float gust = 0.55 + 0.45 * sin(uTime * 0.55 + ip.x * 0.17 + ip.z * 0.11);
         float sw = sin(uTime * 1.9 + ip.x * 0.55 + ip.z * 0.4 + position.y * 0.9);
         transformed.x += (sw * 0.6 + 0.9) * gust * bend * uWind * ${amp.toFixed(3)};
         transformed.z += cos(uTime * 1.5 + ip.z * 0.5 + position.y * 0.6) * gust * bend * uWind * ${(amp * 0.5).toFixed(3)};`,
      );
  };
  material.customProgramCacheKey = () => `sway-${stiff}-${amp}`;
  return material;
}
// shadow map cũng phải lắc cùng cây, nếu không bóng đứng yên
function swayDepth(stiff, amp) {
  const m = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
  return addSway(m, { stiff, amp });
}

function paint(geo, hex) {
  const g = geo.index ? geo.toNonIndexed() : geo;
  g.deleteAttribute('uv');
  const col = new THREE.Color(hex);
  const arr = new Float32Array(g.attributes.position.count * 3);
  for (let i = 0; i < g.attributes.position.count; i++) {
    arr[i * 3] = col.r; arr[i * 3 + 1] = col.g; arr[i * 3 + 2] = col.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return g;
}

function pineGeometry() {
  const trunk = new THREE.CylinderGeometry(0.12, 0.2, 1.1, 6).translate(0, 0.55, 0);
  const c1 = new THREE.ConeGeometry(1.15, 1.7, 7).translate(0, 1.7, 0);
  const c2 = new THREE.ConeGeometry(0.9, 1.5, 7).translate(0, 2.6, 0);
  const c3 = new THREE.ConeGeometry(0.6, 1.3, 7).translate(0, 3.4, 0);
  return mergeGeometries([
    paint(trunk, 0x6b4a2e), paint(c1, 0x2f7a46), paint(c2, 0x3a8f4f), paint(c3, 0x49a05a),
  ]);
}
function roundTreeGeometry() {
  const trunk = new THREE.CylinderGeometry(0.14, 0.22, 1.5, 6).translate(0, 0.75, 0);
  const b1 = new THREE.IcosahedronGeometry(1.2, 0).translate(0, 2.2, 0);
  const b2 = new THREE.IcosahedronGeometry(0.85, 0).translate(0.55, 3.0, 0.2);
  const b3 = new THREE.IcosahedronGeometry(0.75, 0).translate(-0.5, 2.9, -0.25);
  return mergeGeometries([
    paint(trunk, 0x74502f), paint(b1, 0x7cc04f), paint(b2, 0x93d05a), paint(b3, 0x6db346),
  ]);
}

function makeSwayInstances(geo, count, stiff, amp, castShadow = true) {
  const mat = addSway(
    new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.9 }),
    { stiff, amp },
  );
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  if (castShadow) mesh.customDepthMaterial = swayDepth(stiff, amp);
  mesh.frustumCulled = false; // sway làm bounding box lệch nhẹ
  scene.add(mesh);
  return mesh;
}

// ----------------------------------------------------------------- đặt cây
const FIGURE_AT = new THREE.Vector3(3.4, 0, 4.6);
FIGURE_AT.y = terrainH(FIGURE_AT.x, FIGURE_AT.z);

const trees = [];
for (let tries = 0; tries < 3000 && trees.length < 26; tries++) {
  const r = 12 * Math.sqrt(rand());
  const a = rand() * Math.PI * 2;
  const x = Math.cos(a) * r, z = Math.sin(a) * r;
  const h = terrainH(x, z);
  if (h < 0.45) continue;
  if (Math.hypot(x - FIGURE_AT.x, z - FIGURE_AT.z) < 3.4) continue;
  if (trees.some((t) => Math.hypot(t.x - x, t.z - z) < 3.0)) continue;
  trees.push({ x, z, h, kind: rand() < 0.55 ? 'pine' : 'round', s: 0.8 + rand() * 0.6 });
}
const pines = trees.filter((t) => t.kind === 'pine');
const rounds = trees.filter((t) => t.kind === 'round');
const dummy = new THREE.Object3D();
const tint = new THREE.Color();

function fill(mesh, list) {
  list.forEach((t, i) => {
    dummy.position.set(t.x, t.h - 0.05, t.z);
    dummy.scale.setScalar(t.s);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, tint.setHSL(0, 0, 0.85 + rand() * 0.25));
  });
  mesh.instanceMatrix.needsUpdate = true;
}
fill(makeSwayInstances(pineGeometry(), pines.length, 2.0, 0.045), pines);
fill(makeSwayInstances(roundTreeGeometry(), rounds.length, 2.0, 0.05), rounds);

// -------------------------------------------------------------------- cỏ
{
  const blade = new THREE.ConeGeometry(0.05, 0.65, 3).translate(0, 0.325, 0);
  const g = blade.toNonIndexed();
  const cols = new Float32Array(g.attributes.position.count * 3);
  const base = new THREE.Color(0x2f7d3a), tip = new THREE.Color(0xa6dc62), cc = new THREE.Color();
  for (let i = 0; i < g.attributes.position.count; i++) {
    cc.copy(base).lerp(tip, g.attributes.position.getY(i) / 0.65);
    cols[i * 3] = cc.r; cols[i * 3 + 1] = cc.g; cols[i * 3 + 2] = cc.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  g.deleteAttribute('uv');

  const spots = [];
  for (let tries = 0; tries < 20000 && spots.length < 2600; tries++) {
    const r = 13 * Math.sqrt(rand());
    const a = rand() * Math.PI * 2;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const h = terrainH(x, z);
    if (h < 0.32) continue;
    spots.push({ x, z, h });
  }
  const mesh = makeSwayInstances(g, spots.length, 1.6, 0.14, false);
  spots.forEach((p, i) => {
    dummy.position.set(p.x, p.h - 0.03, p.z);
    dummy.scale.set(0.8 + rand() * 0.6, 0.7 + rand() * 1.1, 0.8 + rand() * 0.6);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, tint.setHSL(0, 0, 0.8 + rand() * 0.35));
  });
  mesh.instanceMatrix.needsUpdate = true;
}

// ----------------------------------------------------------- người que
const figure = new THREE.Group();
const inkMat = new THREE.MeshStandardMaterial({ color: 0x20202c, roughness: 0.55, metalness: 0.05 });
function limb(len, r, x, y, rotZ) {
  const pivot = new THREE.Group();
  pivot.position.set(x, y, 0);
  pivot.rotation.z = rotZ;
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 8), inkMat);
  m.position.y = -len / 2;
  m.castShadow = true;
  pivot.add(m);
  figure.add(pivot);
  return pivot;
}
const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.95, 8), inkMat);
torso.position.y = 1.5; torso.castShadow = true; figure.add(torso);
const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 14), inkMat);
head.position.y = 2.22; head.castShadow = true; figure.add(head);
const legL = limb(1.05, 0.06, 0, 1.03, -0.16);
const legR = limb(1.05, 0.06, 0, 1.03, 0.16);
const armL = limb(0.85, 0.055, 0, 1.92, -0.45);
const armR = limb(0.85, 0.055, 0, 1.92, 2.4);
// khăn đỏ bay theo gió
const scarf = new THREE.Mesh(
  new THREE.PlaneGeometry(0.9, 0.16, 12, 1).translate(0.45, 0, 0),
  new THREE.MeshStandardMaterial({ color: 0xd9363e, side: THREE.DoubleSide, roughness: 0.8 }),
);
scarf.position.set(0, 1.97, 0); scarf.castShadow = true; figure.add(scarf);
const scarfPos = scarf.geometry.attributes.position;
const scarfBase = scarfPos.array.slice();

figure.position.copy(FIGURE_AT);
figure.rotation.y = 0.35;
figure.scale.setScalar(1.15);
scene.add(figure);

// ----------------------------------------------------------- lá bay trong gió
const LEAVES = 70;
const leafMesh = new THREE.InstancedMesh(
  new THREE.PlaneGeometry(0.16, 0.1),
  new THREE.MeshLambertMaterial({ color: 0xd7e063, side: THREE.DoubleSide }),
  LEAVES,
);
leafMesh.frustumCulled = false;
scene.add(leafMesh);
const leaves = Array.from({ length: LEAVES }, () => ({
  x: (rand() - 0.5) * 30, y: 0.5 + rand() * 6, z: (rand() - 0.5) * 30,
  spin: (rand() - 0.5) * 5, ph: rand() * 6.28, fall: 0.15 + rand() * 0.25,
}));

// ----------------------------------------------------- buổi trong ngày
const TOD = {
  noon: {
    zenith: new THREE.Color(0x2d78c8), horizon: new THREE.Color(0xbfe3f2),
    sunCol: new THREE.Color(0xfff1d6), sunI: 2.6, hemiI: 0.9,
    hemiSky: new THREE.Color(0xcfe9ff), hemiGround: new THREE.Color(0x6b7a4a),
    dir: new THREE.Vector3(0.45, 0.8, 0.35), exposure: 1.0,
  },
  sunset: {
    zenith: new THREE.Color(0x2d3f7a), horizon: new THREE.Color(0xf8a469),
    sunCol: new THREE.Color(0xffa24a), sunI: 3.4, hemiI: 1.25,
    hemiSky: new THREE.Color(0xf2b99a), hemiGround: new THREE.Color(0x7a6a5a),
    dir: new THREE.Vector3(-0.9, 0.16, 0.45), exposure: 0.95,
  },
};
const tmpV = new THREE.Vector3();
function setTimeOfDay(k) {
  const a = TOD.noon, b = TOD.sunset;
  const dir = tmpV.copy(a.dir).normalize().lerp(b.dir.clone().normalize(), k).normalize();

  sky.material.uniforms.uZenith.value.copy(a.zenith).lerp(b.zenith, k);
  sky.material.uniforms.uHorizon.value.copy(a.horizon).lerp(b.horizon, k);
  sky.material.uniforms.uSunDir.value.copy(dir);
  sky.material.uniforms.uSunColor.value.copy(a.sunCol).lerp(b.sunCol, k);

  scene.fog.color.copy(sky.material.uniforms.uHorizon.value);
  sun.color.copy(a.sunCol).lerp(b.sunCol, k);
  sun.intensity = THREE.MathUtils.lerp(a.sunI, b.sunI, k);
  sun.position.copy(dir).multiplyScalar(70);
  hemi.color.copy(a.hemiSky).lerp(b.hemiSky, k);
  hemi.groundColor.copy(a.hemiGround).lerp(b.hemiGround, k);
  hemi.intensity = THREE.MathUtils.lerp(a.hemiI, b.hemiI, k);
  renderer.toneMappingExposure = THREE.MathUtils.lerp(a.exposure, b.exposure, k);

  const wu = water.material.uniforms;
  wu.uSkyColor.value.copy(sky.material.uniforms.uHorizon.value).lerp(sky.material.uniforms.uZenith.value, 0.35);
  wu.uSunDir.value.copy(dir);
  wu.uSunColor.value.copy(sun.color);
  wu.uFogColor.value.copy(scene.fog.color);
}
setTimeOfDay(0);

// ------------------------------------------------------------------ UI/loop
const q = new URLSearchParams(location.search);
const windEl = document.getElementById('wind');
const todEl = document.getElementById('tod');
if (q.has('wind')) windEl.value = q.get('wind');
if (q.has('tod')) todEl.value = q.get('tod');
if (q.has('cam')) camera.position.fromArray(q.get('cam').split(',').map(Number));
if (q.has('look')) controls.target.fromArray(q.get('look').split(',').map(Number));
const sync = () => {
  U.uWind.value = parseFloat(windEl.value);
  setTimeOfDay(parseFloat(todEl.value));
};
windEl.addEventListener('input', sync);
todEl.addEventListener('input', sync);
sync();

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

const clock = new THREE.Clock();
// ?t=… để chụp ảnh cố định thời điểm khi kiểm thử
let fixedT = q.has('t') ? parseFloat(q.get('t')) : null;
window.__setTime = (t) => { fixedT = t; };

function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = fixedT ?? clock.elapsedTime;
  U.uTime.value = t;
  const wind = U.uWind.value;

  // người que thở + vẫy tay
  torso.scale.y = 1 + Math.sin(t * 1.8) * 0.01;
  head.position.y = 2.22 + Math.sin(t * 1.8) * 0.012;
  armR.rotation.z = 2.4 + Math.sin(t * 5.5) * 0.3;
  armL.rotation.z = -0.45 + Math.sin(t * 1.8 + 1) * 0.04;
  legL.rotation.z = -0.16; legR.rotation.z = 0.16;

  // khăn: sóng chạy dọc theo chiều dài, mạnh dần về đuôi
  for (let i = 0; i < scarfPos.count; i++) {
    const bx = scarfBase[i * 3], by = scarfBase[i * 3 + 1];
    const k = bx / 0.9;
    scarfPos.setY(i, by + Math.sin(t * 7 - bx * 9) * 0.07 * k * (0.4 + wind) - k * k * 0.06);
    scarfPos.setZ(i, Math.sin(t * 5 - bx * 7) * 0.05 * k * (0.4 + wind));
  }
  scarfPos.needsUpdate = true;

  // lá bay
  for (let i = 0; i < LEAVES; i++) {
    const L = leaves[i];
    if (fixedT === null) {
      L.x += (0.9 + wind * 1.8) * dt;
      L.z += Math.sin(t * 0.7 + L.ph) * 0.4 * dt;
      L.y -= L.fall * dt;
      if (L.x > 16) L.x = -16;
      if (L.y < 0.2) { L.y = 5 + rand() * 3; L.x = -16; }
    }
    dummy.position.set(L.x, L.y + Math.sin(t * 2 + L.ph) * 0.12, L.z);
    dummy.rotation.set(t * L.spin, t * L.spin * 0.7, L.ph);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    leafMesh.setMatrixAt(i, dummy.matrix);
  }
  leafMesh.instanceMatrix.needsUpdate = true;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
frame();
window.__ready = true;
