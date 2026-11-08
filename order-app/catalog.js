/*
 * Danh mục sản phẩm.
 * - id: số thứ tự sản phẩm trong đơn (dùng trong dòng "* id. tên *").
 * - variants: danh sách loại (mã) của sản phẩm. [] = không có loại, chỉ nhập "các loại khác".
 *
 * Lưu ý: các mục 2, 6, 7 chưa có trong ảnh chụp nên chưa có ở đây.
 * Sửa / thêm sản phẩm trực tiếp trong file này.
 */
window.CATALOG = [
  { id: 1, name: 'Pleťový a tělový krém 250ml', variants: [] },
  { id: 3, name: 'Sul do koupele 600g', variants: [] },
  { id: 4, name: 'Trim prací prášek', variants: ['4,5kg'] },
  {
    id: 5,
    name: 'Lazen Chopa 1,5l',
    variants: ['Bylinný elixír', 'Kouzlo lesa', 'Vodni svet', 'Vanikove nebe', 'Morska terapie']
  },
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
