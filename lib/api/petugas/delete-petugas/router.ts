const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export async function deletePetugas(nip: string) {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/petugas/${nip}`;

  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`Gagal delete: ${JSON.stringify(errorBody)}`);
  }

  return await response.json();
}
