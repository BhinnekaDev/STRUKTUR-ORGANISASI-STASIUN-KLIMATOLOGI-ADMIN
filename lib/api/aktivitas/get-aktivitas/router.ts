// lib/api/aktivitas/get-aktivitas/router.ts
import { apiUrl } from '@/lib/utils/apiUrl';

export async function getAktivitasTerbaru() {
  const url = apiUrl('/aktivitas/terbaru');

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const contentType = res.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      const text = await res.text();  // Tangkap isi respons HTML (jika error)
      console.error('Bukan JSON:', text);
      throw new Error('Respon dari server bukan JSON. Cek apakah endpoint /aktivitas/terbaru tersedia.');
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Gagal mengambil aktivitas terbaru');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Gagal mengambil aktivitas:', error.message);
      throw error;  
    }
  }
}
