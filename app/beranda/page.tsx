'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import DashboardCard from '@/components/DashboardCard';
import ActivityCard from '@/components/ActivityCard';
import QuickAccessCard from '@/components/QuickAccessCard';
import KGBWarningCard from '@/components/KGBWarningCard';
import { AlertTriangle } from 'lucide-react';

import { getTotalPegawai } from '@/lib/api/petugas/get-count/router';
import { getTotalStruktur } from '@/lib/api/struktur/get-count/router';
import { getAktivitasTerbaru } from '@/lib/api/aktivitas/get-aktivitas/router';
import { getKGBMendatang } from '@/lib/api/petugas/get-kgb-mendatang/router';

export default function BerandaPage() {
  const router = useRouter();

  const [totalPegawai, setTotalPegawai] = useState(0);
  const [totalStruktur, setTotalStruktur] = useState(0);
  const [aktivitas, setAktivitas] = useState<
    { jenis: string; waktu: string; keterangan: string }[]
  >([]);
  const [kgbMendatang, setKgbMendatang] = useState<
    { nama: string; kgb_berikutnya: string }[]
  >([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const pegawaiCount = await getTotalPegawai();
        console.log('Total pegawai:', pegawaiCount);
        setTotalPegawai(pegawaiCount);

        const strukturCount = await getTotalStruktur();
        console.log('Total struktur:', strukturCount);
        setTotalStruktur(strukturCount);

        const aktivitasData = await getAktivitasTerbaru();
        console.log('Aktivitas terbaru:', aktivitasData);
        setAktivitas(aktivitasData);

        const kgbData = await getKGBMendatang();
        console.log('KGB Mendatang:', kgbData);
        setKgbMendatang(kgbData);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Gagal memuat data dashboard:', err.message);
        } else {
          console.error('Gagal memuat data dashboard (unknown error):', err);
        }
      }
    };

    fetchAllData();
  }, []);

  const waktuRelatif = (iso: string) => {
    const now = new Date();
    const waktu = new Date(iso);
    const selisihMenit = Math.floor((now.getTime() - waktu.getTime()) / 60000);
    if (selisihMenit < 1) return 'Baru saja';
    if (selisihMenit < 60) return `${selisihMenit} menit yang lalu`;
    const jam = Math.floor(selisihMenit / 60);
    return `${jam} jam yang lalu`;
  };

  return (
    <div className="flex-1 p-4 md:p-8 transition-all overflow-hidden bg-gray-100">
      <Sidebar active="Beranda" />
      <main className="flex-1 ml-14 overflow-y-auto p-6">
        <Navbar title="Beranda" />

        {/* Dashboard cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <DashboardCard
            icon="mdi:account-group"
            title="Total Pegawai"
            value={totalPegawai}
            onClick={() => router.push('/pegawai')}
          />
          <DashboardCard
            icon="mdi:sitemap-outline"
            title="Total yang Menjabat"
            value={totalStruktur}
            onClick={() => router.push('/struktur')}
          />
        </div>

        {/* Aktivitas Terakhir */}
        <section className="bg-gray-50 rounded-xl p-5 mb-6">
          <h2 className="text-lg font-semibold mb-4">Aktivitas Terakhir</h2>
          <div className="flex flex-wrap gap-4">
            {aktivitas.length === 0 ? (
              <p className="text-gray-500 text-sm">Belum ada aktivitas</p>
            ) : (
              aktivitas.slice(0, 3).map((item, idx) => (
                <ActivityCard
                  key={idx}
                  text={item.keterangan}
                  time={waktuRelatif(item.waktu)}
                />
              ))
            )}
          </div>
        </section>

        {/* Quick Akses */}
        <section className="bg-gray-50 rounded-xl p-5 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Quick Akses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickAccessCard
              icon="mdi:account-plus"
              title="Tambah Pegawai"
              subtitle="Buat entri pegawai baru"
              bgColor="bg-green-100"
              iconColor="text-green-600"
              onClick={() => router.push('/pegawai')}
            />
            <QuickAccessCard
              icon="mdi:sitemap-outline"
              title="Tambah Struktur"
              subtitle="Atur struktur organisasi"
              bgColor="bg-orange-100"
              iconColor="text-orange-600"
              onClick={() => router.push('/struktur')}
            />
          </div>
        </section>

        {/* Peringatan KGB */}
        <section className="bg-gray-50 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-red-700 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Peringatan KGB
          </h2>
          {kgbMendatang.length === 0 ? (
            <p className="text-sm text-gray-500">Tidak ada KGB dalam waktu dekat</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {kgbMendatang
                .sort(
                  (a, b) =>
                    new Date(a.kgb_berikutnya).getTime() -
                    new Date(b.kgb_berikutnya).getTime()
                )
                .slice(0, 2)
                .map((item, index) => (
                  <KGBWarningCard
                    key={index}
                    nama={item.nama}
                    tanggal={new Date(item.kgb_berikutnya).toLocaleDateString('id-ID')}
                  />
                ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
