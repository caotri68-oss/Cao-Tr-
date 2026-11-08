/*
 * Danh mục sản phẩm.
 * - id: số thứ tự sản phẩm trong đơn (dùng trong dòng "* id. tên *").
 * - variants: danh sách loại (mã) của sản phẩm. [] = không có loại, chỉ nhập "các loại khác".
 *
 * Các loại của mục 6, 7 mới có một phần (theo đơn mẫu). Trong app có thể bấm
 * "+ Thêm loại" để thêm loại còn thiếu, không cần sửa file này.
 * units: đơn vị khác 'balení' cho từng loại (ví dụ paleta).
 */
window.CATALOG = [
  { id: 1, name: 'Pleťový a tělový krém 250ml', variants: ['Aloe', 'Mandlovy', 'Hermanek'] },
  { id: 2, name: 'Krem na ruce 100ml', variants: ['Aloe', 'Ibiskovy', 'Mesíckovy'] },
  { id: 3, name: 'Sul do koupele 600g', variants: [] },
  { id: 4, name: 'Trim prací prášek', variants: ['2kg', '4,5kg', '9kg'], units: { '9kg': 'paleta' } },
  {
    id: 5,
    name: 'Lazen Chopa 1,5l',
    variants: ['Bylinný elixír', 'Kouzlo lesa', 'Vodni svet', 'Vanikove nebe', 'Kvetinova romance', 'Morska terapie']
  },
  { id: 6, name: 'Kremova koupel chopa 1,5l', variants: ['Mineraly', 'Pro jemnou pokozku'] },
  { id: 7, name: 'Tekute mydlo chopa 1,5l', variants: ['Frezie', 'Grep a caj', 'Venice', 'Aloe', 'Discovery'] },
  { id: 8, name: 'Devore chopa 1.5l', variants: ['Luxe', 'Broskev', 'Atractive', 'Vanilka'] },
  { id: 9, name: 'Trim s rozprašovačem 500ml', variants: ['Okna zrcadla', 'Kuchyne', 'Rez vodni kamen', 'Wc koupelna'] },
  {
    id: 10,
    name: 'Tekute mydlo chopa 500ml',
    variants: ['Frezie', 'Grep a caj', 'Lavadule', 'Discovery', 'Aloe', 'Atractive', 'Luxe', 'Broskev']
  },
  { id: 11, name: 'Devore chopa 1l', variants: ['Atractive', 'Broskev', 'Luxe'] },
  { id: 12, name: 'Sampon na vlasy 1l', variants: ['S vuni 7 bylin', 'S vuni koprivy', 'Na normalni vlasy'] },
  {
    id: 13,
    name: 'Kremmova koupel 1l',
    variants: ['Lavandule', 'Bylinna pro uklidneni pleti', 'S mineraly', 'Pro jemnou pokozku', 'Svezi vune medu z kvetu lipy']
  },
  { id: 14, name: 'Aviváž 1l', variants: ['Vanilka', 'Broskev', 'Green fantasy', 'Balzam', 'Fresh'] },
  { id: 15, name: 'Balzam 1l bily', variants: ['Chai 1l'] },
  { id: 16, name: 'Balzam na vlasy 500ml', variants: ['Chai 500ml'] },
  { id: 17, name: 'Devore 500ml chopa', variants: ['Canella', 'Niva mar', 'Orange fizz', 'Mandarinka green tea'] },
  {
    id: 18,
    name: 'Sampon na vlasy 500ml',
    variants: [
      'Žloutkový s vanilkovou vůní',
      'pro mastné vlasy s vůní 7 bylin',
      's vůní kopřivy',
      'pro jemné vlasy s vůní aloe vera',
      's vůní břizy'
    ]
  },
  {
    id: 19,
    name: 'Trim na nádobi 1 lit',
    variants: ['Pomeranc', 'Ostruziny', 'Jahody', 'Grap-caj', 'Citron', 'Bananova vune', 'Jablko']
  },
  { id: 20, name: 'Odlakovac', variants: ['Aceton', 'Bezaceton'] },
  { id: 21, name: 'Trim gel 1,5l', variants: ['Trim gel na praní 1,5l', 'Trim color gel - 1,5l'] }
];
