// Kho tài liệu: nạp file .txt (từ tools/playlist_to_text.py), lưu trong IndexedDB,
// tìm đoạn liên quan bằng TF-IDF đơn giản (không cần máy chủ).

export interface Doc {
  id: string;     // tên file
  title: string;
  url: string;
  text: string;
}

export interface Hit {
  doc: Doc;
  chunk: string;
  score: number;
}

const DB = 'knowledge-db';
const STORE = 'docs';

function open(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE, { keyPath: 'id' });
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}

export async function loadDocs(): Promise<Doc[]> {
  const db = await open();
  return new Promise((res, rej) => {
    const q = db.transaction(STORE).objectStore(STORE).getAll();
    q.onsuccess = () => res(q.result as Doc[]);
    q.onerror = () => rej(q.error);
  });
}

export async function saveDocs(docs: Doc[]): Promise<void> {
  const db = await open();
  return new Promise((res, rej) => {
    const tx = db.transaction(STORE, 'readwrite');
    docs.forEach((d) => tx.objectStore(STORE).put(d));
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}

export async function clearDocs(): Promise<void> {
  const db = await open();
  return new Promise((res, rej) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).clear();
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}

// Định dạng file: dòng 1 = tiêu đề, dòng 2 = link, dòng 4+ = nội dung.
export async function parseFile(f: File): Promise<Doc> {
  const raw = await f.text();
  const [title = f.name, url = '', ...rest] = raw.split('\n');
  return { id: f.name, title: title.trim(), url: url.trim(), text: rest.join('\n').trim() };
}

const fold = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
const tokens = (s: string) => fold(s).split(/[^a-z0-9]+/).filter((t) => t.length > 1);

function chunkText(text: string, size = 900, overlap = 150): string[] {
  const out: string[] = [];
  for (let i = 0; i < text.length; i += size - overlap) out.push(text.slice(i, i + size));
  return out;
}

export function search(docs: Doc[], query: string, k = 6): Hit[] {
  const q = [...new Set(tokens(query))];
  if (!q.length) return [];
  const chunks = docs.flatMap((doc) => chunkText(doc.text).map((chunk) => ({ doc, chunk, t: tokens(chunk) })));
  const df: Record<string, number> = {};
  for (const c of chunks) {
    const seen = new Set(c.t);
    for (const w of q) if (seen.has(w)) df[w] = (df[w] || 0) + 1;
  }
  const N = chunks.length || 1;
  return chunks
    .map((c) => {
      const tf: Record<string, number> = {};
      c.t.forEach((w) => (tf[w] = (tf[w] || 0) + 1));
      let score = 0;
      for (const w of q) if (tf[w]) score += (1 + Math.log(tf[w])) * Math.log(1 + N / (df[w] || 1));
      return { doc: c.doc, chunk: c.chunk, score: score / Math.sqrt(c.t.length + 50) };
    })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
