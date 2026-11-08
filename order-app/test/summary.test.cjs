const fs = require('fs'), vm = require('vm');
const path = require('path');
const dir = path.join(__dirname, '..') + path.sep;
const ctx = { window: {}, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(dir + 'catalog.js', 'utf8'), ctx);
vm.runInContext(fs.readFileSync(dir + 'logic.js', 'utf8'), ctx);
const L = ctx.OrderLogic, CAT = ctx.window.CATALOG;
const o = L.emptyOrder('11.10.2026');
const V = (pid, v, q) => L.setVariantQty(o, pid, v, q);
const X = (pid, q) => L.setExtra(o, pid, q);
V(1,'Aloe',5); X(2,20);
V(4,'2kg',40); V(4,'4,5kg',20); V(4,'9kg',1);
V(5,'Bylinný elixír',10); V(5,'Kouzlo lesa',5); V(5,'Vodni svet',5); V(5,'Vanikove nebe',5); V(5,'Kvetinova romance',5); V(5,'Morska terapie',20);
V(6,'Mineraly',10); V(6,'Pro jemnou pokozku',15);
V(7,'Frezie',15); V(7,'Grep a caj',20); V(7,'Venice',15); V(7,'Aloe',5); V(7,'Discovery',15);
V(8,'Broskev',5); V(8,'Vanilka',20);
V(9,'Okna zrcadla',10);
V(11,'Atractive',10); V(11,'Broskev',5);
V(12,'S vuni koprivy',10);
V(13,'Lavandule',15); V(13,'S mineraly',10); V(13,'Pro jemnou pokozku',5); V(13,'Svezi vune medu z kvetu lipy',5);
V(14,'Broskev',10); V(15,'Chai 1l',5); V(16,'Chai 500ml',5); V(17,'Orange fizz',10);
V(19,'Pomeranc',5); V(19,'Ostruziny',5); V(19,'Jahody',5); V(19,'Grap-caj',5); V(19,'Citron',5); V(19,'Bananova vune',10); V(19,'Jablko',5);
const s = L.buildSummary(CAT, o);
const expected = `11.10.2026 - Celkové množství: 435 balení
-----------------

* 1. Pleťový a tělový krém 250ml *
  - Aloe: 5 balení
* 2. Krem na ruce 100ml *
  => Všechny druhy navíc: 20 balení
* 4. Trim prací prášek *
  - 2kg: 40 balení
  - 4,5kg: 20 balení
  - 9kg: 1 paleta
* 5. Lazen Chopa 1,5l *
  - Bylinný elixír: 10 balení
  - Kouzlo lesa: 5 balení
  - Vodni svet: 5 balení
  - Vanikove nebe: 5 balení
  - Kvetinova romance: 5 balení
  - Morska terapie: 20 balení
* 6. Kremova koupel chopa 1,5l *
  - Mineraly: 10 balení
  - Pro jemnou pokozku: 15 balení
* 7. Tekute mydlo chopa 1,5l *
  - Frezie: 15 balení
  - Grep a caj: 20 balení
  - Venice: 15 balení
  - Aloe: 5 balení
  - Discovery: 15 balení
* 8. Devore chopa 1.5l *
  - Broskev: 5 balení
  - Vanilka: 20 balení
* 9. Trim s rozprašovačem 500ml *
  - Okna zrcadla: 10 balení
* 11. Devore chopa 1l *
  - Atractive: 10 balení
  - Broskev: 5 balení
* 12. Sampon na vlasy 1l *
  - S vuni koprivy: 10 balení
* 13. Kremmova koupel 1l *
  - Lavandule: 15 balení
  - S mineraly: 10 balení
  - Pro jemnou pokozku: 5 balení
  - Svezi vune medu z kvetu lipy: 5 balení
* 14. Aviváž 1l *
  - Broskev: 10 balení
* 15. Balzam 1l bily *
  - Chai 1l: 5 balení
* 16. Balzam na vlasy 500ml *
  - Chai 500ml: 5 balení
* 17. Devore 500ml chopa *
  - Orange fizz: 10 balení
* 19. Trim na nádobi 1 lit *
  - Pomeranc: 5 balení
  - Ostruziny: 5 balení
  - Jahody: 5 balení
  - Grap-caj: 5 balení
  - Citron: 5 balení
  - Bananova vune: 10 balení
  - Jablko: 5 balení`;
let failed = 0;
function check(name, ok) { console.log((ok ? 'PASS ' : 'FAIL ') + name); if (!ok) failed++; }
check('đơn mẫu 11.10.2026 khớp từng ký tự', s.text === expected);
check('tổng = 435 (1 paleta = 40 balení)', s.total === 435);
if (s.text !== expected) console.log(s.text);

const h = L.emptyOrder('01.01.2027');
L.addVariantQty(h, 4, '9kg', 0.5, true);
check('nửa palet = 0,5 paleta, tính 20 balení', L.buildSummary(CAT, h).text.includes('9kg: 0,5 paleta') && L.orderTotal(CAT, h) === 20);

const x = L.emptyOrder('01.01.2027');
L.toggleExcluded(x, 12, 'S vuni koprivy'); L.setExtra(x, 12, 10);
check('"Trừ loại" ra dòng Kromě druhů', L.buildSummary(CAT, x).text.includes('=> Kromě druhů "S vuni koprivy", ostatní druhy navíc: 10 balení'));

check('mục 1 có 3 loại, mục 2 có 3 loại, mục 3 có 8 loại, mục 4 có 3 loại',
  [1, 2, 3, 4].map(id => CAT.find(p => p.id === id).variants.length).join() === '3,3,8,3');
process.exit(failed ? 1 : 0);
