import { apiUrl } from '@/lib/utils/apiUrl';

interface StrukturPayload {
  petugas: string;
  jabatan: string;
  tmt: string;      // ← tambah field ini
  userId: string;
}

export async function tambahStrukturOrganisasi({
  petugas,
  jabatan,
  tmt,
  userId,
}: StrukturPayload) {
  const url = apiUrl('struktur-organisasi');
  if (!url) throw new Error('API URL tidak tersedia');

  if (!petugas || !jabatan || !tmt) {
    throw new Error('Field petugas, jabatan, dan tmt harus diisi');
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user_id: userId,
      },
      body: JSON.stringify({
        Petugas: petugas,
        jabatan,
        tmt,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const msg =
        data?.message ||
        data?.error?.message ||
        `Gagal menambahkan struktur (Status ${response.status})`;
      throw new Error(msg);
    }

    return data;
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : 'Terjadi kesalahan saat menambahkan struktur organisasi';
    console.error('Tambah struktur gagal:', message);
    throw new Error(message);
  }
}
