// lib/api/petugas/get-count/router.ts
import { apiUrl } from '@/lib/utils/apiUrl';

export async function getTotalPegawai(): Promise<number> {
  const url = apiUrl('petugas/count');        

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' }, 
    });

    const contentType = res.headers.get('content-type')?.toLowerCase() ?? '';
    const isJson = contentType.includes('application/json');

    // jika bukan JSON, lempar error bawaan
    if (!isJson) {
      const text = await res.text();
      throw new Error(`Server mengirim non‑JSON: ${text.slice(0, 120)}…`);
    }

    const body = await res.json(); // aman karena sudah dicek JSON

    // tangani error dari server
    if (!res.ok) {
      throw new Error(body?.message || `HTTP ${res.status}`);
    }

    // beberapa backend memakai data.count — beberapa data.data.count
    const count =
      body?.count ??
      body?.data?.count ??
      (Array.isArray(body) ? body.length : undefined);

    if (typeof count !== 'number')
      throw new Error('Format response tidak berisi properti count');

    return count;
  } catch (err) {
    // log detail ke console, lempar pesan umum ke pemanggil
    console.error('[getTotalPegawai] error:', err);
    throw new Error('Gagal mengambil total petugas');
  }
}
