// pages/api/petugas/[nip].ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nip } = req.query;

  if (req.method === 'PUT') {
    try {
      const payload = req.body;

      console.log('Update data untuk NIP:', nip, 'Payload:', payload);

      // Simulasi response sukses
      return res.status(200).json({
        message: 'Data petugas berhasil diperbarui',
        data: payload,
      });
    } catch (error) {
      console.error('Error update:', error);
      return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  }
}