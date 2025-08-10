import { apiUrl } from '@/lib/utils/apiUrl';

export interface UpdatePetugasPayload {
  nama_lengkap: string;
  tempat_tanggal_lahir: string;
  pendidikan_terakhir: string;
  pangkat_golongan: string;
  kgb_terakhir: string;
  kgb_berikutnya: string;
  tmt: string;
  no_telepon: string;
  foto_pegawai: string;
}

export async function updatePetugas(nip: string, data: UpdatePetugasPayload) {
  const url = apiUrl(`petugas/${nip}`);
  if (!url) throw new Error('API URL tidak tersedia');

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      const msg =
        result?.message ||
        result?.error?.message ||
        `Gagal update petugas (Status ${response.status})`;
      throw new Error(msg);
    }

    return result;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Terjadi kesalahan saat update data petugas';
    console.error('Update petugas gagal:', message);
    throw new Error(message);
  }
}
