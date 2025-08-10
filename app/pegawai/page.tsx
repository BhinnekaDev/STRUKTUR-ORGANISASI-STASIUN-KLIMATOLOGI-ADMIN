'use client';

import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { MdOutlineSearch } from 'react-icons/md';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { TambahPegawai } from '@/components/TambahPegawai';
import { EditPegawai } from '@/components/EditPegawai';
import { getAllPetugas } from '@/lib/api/petugas/get-petugas/router';
import { deletePetugas } from '@/lib/api/petugas/delete-petugas/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

export interface Petugas {
  nip: string;
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

// Format tanggal ke DD-MM-YYYY
const formatDate = (tanggal: string) => {
  if (!tanggal) return '-';
  const date = new Date(tanggal);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function PegawaiPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPegawai, setSelectedPegawai] = useState<Petugas | null>(null);
  const [pegawaiList, setPegawaiList] = useState<Petugas[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'golongan' | 'kgb'>('default');

  const fetchData = async () => {
    try {
      const data = await getAllPetugas();
      setPegawaiList(data);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Gagal memuat data pegawai');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (pegawai: Petugas) => {
    setSelectedPegawai(pegawai);
    setIsEditOpen(true);
  };

  const handleDelete = async (nip: string) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    try {
      await deletePetugas(nip);
      toast.success('Data berhasil dihapus');
      fetchData();
    } catch {
      toast.error('Gagal menghapus data');
    }
  };

  const filteredList = pegawaiList
    .filter((p) => p.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'golongan') {
        return b.pangkat_golongan.localeCompare(a.pangkat_golongan);
      }
      if (sortBy === 'kgb') {
        const dateA = new Date(a.kgb_berikutnya || '2100-01-01');
        const dateB = new Date(b.kgb_berikutnya || '2100-01-01');
        return dateA.getTime() - dateB.getTime();
      }
      return 0;
    });

  return (
    <>
      <ToastContainer />
      <TambahPegawai isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchData} />
      <EditPegawai
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={fetchData}
        initialData={selectedPegawai}
      />

      <div className="flex-1 p-4 md:p-8 transition-all flex-col md:flex-row min-h-screen bg-gray-100">
        <Sidebar active="Pegawai" />
        <main className="flex-1 ml-14 p-4 md:p-8">
          <Navbar title="Pegawai" />

          {/* Header Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-800 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-900 text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <FaPlus /> Tambah
            </button>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Cari nama lengkap"
                  className="w-full border border-blue-800 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-800 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MdOutlineSearch className="absolute top-2.5 left-3 text-blue-800 text-lg" />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'default' | 'golongan' | 'kgb')}
                className="border border-blue-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800 text-sm"
              >
                <option value="default">Urutkan berdasarkan</option>
                <option value="golongan">Pangkat/Golongan</option>
                <option value="kgb">KGB Mendatang</option>
              </select>
            </div>
          </div>

          {/* Tabel Pegawai */}
          <div className="bg-white rounded-xl shadow-md overflow-auto">
            <table className="min-w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-blue-800 text-white text-xs md:text-sm">
                <tr>
                  <th className="px-4 py-3 rounded-tl-xl">NIP</th>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Tempat Tanggal Lahir</th>
                  <th className="px-4 py-3">Pendidikan Terakhir</th>
                  <th className="px-4 py-3">Pangkat</th>
                  <th className="px-4 py-3">KGB Terakhir</th>
                  <th className="px-4 py-3">KGB Berikutnya</th>
                  <th className="px-4 py-3">TMT</th>
                  <th className="px-4 py-3">No Telepon</th>
                  <th className="px-4 py-3">Foto</th>
                  <th className="px-4 py-3 text-center rounded-tr-xl">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length > 0 ? (
                  filteredList.map((pegawai) => (
                    <tr key={pegawai.nip} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="px-4 py-3">{pegawai.nip}</td>
                      <td className="px-4 py-3">{pegawai.nama_lengkap}</td>
                      <td className="px-4 py-3">{pegawai.tempat_tanggal_lahir}</td>
                      <td className="px-4 py-3">{pegawai.pendidikan_terakhir}</td>
                      <td className="px-4 py-3">{pegawai.pangkat_golongan}</td>
                      <td className="px-4 py-3">{formatDate(pegawai.kgb_terakhir)}</td>
                      <td className="px-4 py-3">{formatDate(pegawai.kgb_berikutnya)}</td>
                      <td className="px-4 py-3">{formatDate(pegawai.tmt)}</td>
                      <td className="px-4 py-3">{pegawai.no_telepon}</td>
                      <td className="px-4 py-3">
                        <Image
                          src={pegawai.foto_pegawai || '/default-profile.png'}
                          alt="Foto Petugas"
                          width={36}
                          height={36}
                          className="rounded-full ring-1 ring-blue-300 object-cover"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-3">
                          <FaEdit
                            className="text-blue-800 hover:text-gray-600 cursor-pointer"
                            onClick={() => handleEditClick(pegawai)}
                          />
                          <FaTrash
                            className="text-blue-800 hover:text-gray-600 cursor-pointer"
                            onClick={() => handleDelete(pegawai.nip)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center py-6 text-gray-500">
                      Tidak ada pegawai ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
