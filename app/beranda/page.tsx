'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from  '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import DashboardCard from '@/components/DashboardCard';
import ActivityCard from '@/components/ActivityCard';
import VisitorChart from '@/components/VisitorChart';

export default function BerandaPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="Beranda" />
      <main className="flex-1 p-6">
        <Navbar title="Beranda" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <DashboardCard
            icon="mdi:account-group"
            title="Total Pegawai"
            value={15}
            onClick={() => router.push('/pegawai')}
          />
          <DashboardCard
            icon="mdi:account-tie"
            title="Total Jabatan"
            value={15}
            onClick={() => router.push('/jabatan')}
          />
          <DashboardCard
            icon="mdi:sitemap-outline"
            title="Lihat Struktur Organisasi"
            onClick={() => router.push('/struktur')}
          />
        </div>

        <h2 className="text-lg font-semibold mb-2">Aktivitas Terakhir</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <ActivityCard
            text="Data Pegawai Diperbarui"
            time="2 jam yang lalu"
            onClick={() => router.push('/pegawai')}
          />
          <ActivityCard 
            text="Data Jabatan Diperbarui" 
            time="2 jam yang lalu" 
            onClick={() => router.push('/jabatan')}/>
          <ActivityCard 
            text="Kunjungan Pengguna" 
            time="8 jam yang lalu" />
        </div>

        <VisitorChart />
      </main>
    </div>
  );
}
