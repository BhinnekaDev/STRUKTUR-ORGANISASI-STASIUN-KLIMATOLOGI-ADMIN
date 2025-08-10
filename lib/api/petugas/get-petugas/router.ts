const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Petugas {
  nip: string;
  nama_lengkap: string;
  tempat_tanggal_lahir: string;
  pendidikan_terakhir: string;
  pangkat_golongan: string;
  kgb_terakhir: string;
  kgb_berikutnya: string;
  no_telepon: string;
  foto_pegawai: string;
  tmt: string;
}

interface RawPetugas {
  nip: string;
  nama_lengkap: string;
  tempat_tanggal_lahir?: string;
  pendidikan_terakhir?: string;
  pangkat_golongan?: string;
  kgb_terakhir?: string;
  kgb_berikutnya?: string;
  no_telepon?: string;
  foto_pegawai?: string;
  tmt?: string;
}

export async function getAllPetugas(): Promise<Petugas[]> {
  try {
    const response = await fetch(`${API_BASE_URL}petugas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    });

    const rawData: RawPetugas[] = await response.json();

    if (!response.ok) {
      const errorData = rawData as unknown as { message?: string };
      throw new Error(errorData?.message || 'Gagal mengambil data petugas');
    }

    const data: Petugas[] = rawData.map((item) => ({
      nip: item.nip,
      nama_lengkap: item.nama_lengkap,
      tempat_tanggal_lahir: item.tempat_tanggal_lahir ?? '',
      pendidikan_terakhir: item.pendidikan_terakhir ?? '',
      pangkat_golongan: item.pangkat_golongan ?? '',
      kgb_terakhir: item.kgb_terakhir ?? '',
      kgb_berikutnya: item.kgb_berikutnya ?? '',
      no_telepon: item.no_telepon ?? '',
      foto_pegawai: item.foto_pegawai ?? '',
      tmt: item.tmt ?? '',
    }));

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Terjadi kesalahan saat mengambil data pegawai'
    );
  }
}
