const API_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export interface KGBMendatang {
  nama: string;
  kgb_berikutnya: string;
}

interface RawKGB {
  nama_lengkap?: string;
  kgb_berikutnya?: string;
}

export async function getKGBMendatang(): Promise<KGBMendatang[]> {
  try {
    const response = await fetch(`${API_URL}/rest/v1/kgb_mendatang`, {
      method: 'GET',
      headers: {
        apikey: API_KEY!,
        Authorization: `Bearer ${API_KEY!}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorData: { message?: string } = await response.json();
      throw new Error(errorData.message || 'Gagal memuat data KGB');
    }

    const rawData: RawKGB[] = await response.json();

    return rawData.map((item): KGBMendatang => ({
      nama: item.nama_lengkap ?? 'Tidak Diketahui',
      kgb_berikutnya: item.kgb_berikutnya ?? '',
    }));
  } catch (error) {
    console.error('Fetch error (KGB):', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Terjadi kesalahan saat memuat data KGB'
    );
  }
}
