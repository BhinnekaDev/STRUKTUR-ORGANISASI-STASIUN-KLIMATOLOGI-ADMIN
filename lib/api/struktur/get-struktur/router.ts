import { apiUrl } from '@/lib/utils/apiUrl';

export interface Struktur {
  id_struktur: string;
  nip: string;
  nama_petugas: string;
  foto_pegawai: string;
  no_telepon: string;
  jabatan: string;
  tmt: string;
}

interface RawPetugas {
  nip: string;
  nama_lengkap: string;
  foto_pegawai: string;
  no_telepon: string;
}

interface RawStruktur {
  ID_Struktur: string;
  petugas: RawPetugas | null;
  jabatan: string;
  tmt: string;
}

interface ErrorResponse {
  message?: string;
}

export async function getAllStruktur(): Promise<Struktur[]> {
  const url = apiUrl('struktur-organisasi');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const rawData = await response.json();

    if (!response.ok) {
      const errorData: ErrorResponse = rawData;
      const errorMessage = errorData.message || 'Gagal mengambil data struktur organisasi';
      throw new Error(errorMessage);
    }

    const strukturData: RawStruktur[] = rawData;

    const data: Struktur[] = strukturData.map((item) => ({
      id_struktur: item.ID_Struktur,
      nip: item.petugas?.nip ?? '-',
      nama_petugas: item.petugas?.nama_lengkap ?? '-',
      foto_pegawai: item.petugas?.foto_pegawai ?? '',
      no_telepon: item.petugas?.no_telepon ?? '-',
      jabatan: item.jabatan ?? '-',
      tmt: item.tmt ?? '-',
    }));

    return data;
  } catch (error) {
    console.error('Gagal mengambil data struktur organisasi:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Terjadi kesalahan saat mengambil data struktur organisasi'
    );
  }
}
