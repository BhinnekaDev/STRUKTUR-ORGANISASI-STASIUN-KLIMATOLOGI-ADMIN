import { apiUrl } from '@/lib/utils/apiUrl';

interface EditStrukturPayload {
  id: string;
  petugas: string;
  jabatan: string;
  tmt: string;           // ← Wajib ada
  userId: string;
}

export async function editStrukturOrganisasi({
  id,
  petugas,
  jabatan,
  tmt,
  userId,
}: EditStrukturPayload) {
  const url = apiUrl(`struktur-organisasi/${id}`);
  if (!url) throw new Error('API URL tidak tersedia');

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user_id: userId,
      },
      body: JSON.stringify({
        Petugas: petugas,
        jabatan,
        tmt, // ← penting!
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const msg =
        data?.message ||
        data?.error?.message ||
        `Gagal memperbarui struktur (Status ${response.status})`;
      throw new Error(msg);
    }

    return data;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Terjadi kesalahan saat memperbarui struktur organisasi';
    console.error('Edit struktur gagal:', message);
    throw new Error(message);
  }
}
