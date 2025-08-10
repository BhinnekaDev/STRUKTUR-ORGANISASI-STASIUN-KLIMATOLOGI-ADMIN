import { AlertTriangle } from 'lucide-react';

export default function KGBWarningCard({
  nama,
  tanggal,
}: {
  nama: string;
  tanggal: string;
}) {
  return (
    <div className="flex items-center bg-pink-100 border border-pink-300 rounded-xl p-4 shadow-sm">
      <AlertTriangle className="text-pink-600 w-6 h-6 mr-4" />
      <div >
        <p className="font-semibold text-pink-700">{nama}</p>
        <p className="text-sm text-pink-600">KGB Berikutnya: {tanggal}</p>
      </div>
    </div>
  );
}
