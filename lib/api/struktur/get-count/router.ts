// lib/api/struktur/get-count/router.ts
import { apiUrl } from '@/lib/utils/apiUrl';

export async function getTotalStruktur(): Promise<number> {
  const url = apiUrl('struktur-organisasi/count'); // hilangkan slash awal

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json', // lebih tepat daripada Content-Type
      },
    });

    const contentType = res.headers.get('content-type')?.toLowerCase() ?? '';
    const isJson = contentType.includes('application/json');

    if (!isJson) {
      const text = await res.text();
      throw new Error(`Response bukan JSON: ${text.slice(0, 120)}…`);
    }

    const body = await res.json();

    if (!res.ok) {
      throw new Error(body?.message || `HTTP ${res.status}`);
    }

    const count =
      body?.count ??
      body?.data?.count ??
      (Array.isArray(body) ? body.length : undefined);

    if (typeof count !== 'number') {
      throw new Error('Properti "count" tidak ditemukan atau bukan angka');
    }

    return count;
  } catch (err) {
    console.error('[getTotalStruktur] error:', err);
    throw new Error('Gagal mengambil total struktur organisasi');
  }
}
