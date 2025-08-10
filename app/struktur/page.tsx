'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { MdOutlineSearch } from 'react-icons/md';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { TambahStruktur } from '@/components/TambahStruktur';
import { EditStruktur } from '@/components/EditStruktur';
import { getAllStruktur } from '@/lib/api/struktur/get-struktur/router';
import { deleteStrukturOrganisasi } from '@/lib/api/struktur/delete-struktur/router';
import { toast } from 'react-toastify';

interface Struktur {
  id_struktur: string;
  nip: string;
  nama_petugas: string;
  foto_pegawai: string;
  no_telepon: string;
  jabatan: string;
  tmt: string;
}

export default function StrukturPage() {
  const [strukturList, setStrukturList] = useState<Struktur[]>([]);
  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStruktur, setSelectedStruktur] = useState<Struktur | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userId = 'admin001'; // Simulasi ID user

  const fetchStruktur = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllStruktur();
      setStrukturList(data);
    } catch (error) {
      toast.error((error as Error).message || 'Gagal memuat data struktur organisasi');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStruktur();
  }, [fetchStruktur]);

  const handleDelete = async (struktur: Struktur) => {
    const confirmDelete = confirm(`Yakin ingin menghapus struktur milik ${struktur.nama_petugas}?`);
    if (!confirmDelete) return;

    try {
      setDeletingId(struktur.id_struktur);
      await deleteStrukturOrganisasi(struktur.id_struktur);
      toast.success('Struktur berhasil dihapus');
      await fetchStruktur();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal menghapus struktur');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditClick = (struktur: Struktur) => {
    setSelectedStruktur(struktur);
    setIsEditOpen(true);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (!dateStr || isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const filteredStruktur = strukturList.filter((s) =>
    s.nama_petugas?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar active="Struktur Organisasi" />
      <main className="flex-1 ml-14 p-4 md:p-8">
        <Navbar title="Struktur Organisasi" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <button
            onClick={() => !isTambahOpen && setIsTambahOpen(true)}
            className="bg-blue-800 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-900 text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <FaPlus /> Tambah
          </button>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Cari nama pegawai"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-blue-800 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-800 text-sm"
            />
            <MdOutlineSearch className="absolute top-2.5 left-3 text-blue-800 text-lg" />
          </div>
        </div>

        {/* Modal Tambah */}
        <TambahStruktur
          isOpen={isTambahOpen}
          onClose={() => setIsTambahOpen(false)}
          onSuccess={fetchStruktur}
          userId={userId}
        />

        {/* Modal Edit */}
        <EditStruktur
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          struktur={
            selectedStruktur
              ? {
                  id: selectedStruktur.id_struktur,
                  petugas: selectedStruktur.nip,
                  jabatan: selectedStruktur.jabatan,
                  tmt: selectedStruktur.tmt,
                }
              : null
          }
          onSuccess={fetchStruktur}
          userId={userId}
        />

        {/* Tabel Data */}
        <div className="bg-white rounded-xl shadow-md overflow-auto">
          <table className="min-w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-blue-800 text-white text-xs md:text-sm">
              <tr>
                <th className="px-4 py-3 min-w-[180px]">Nama Pegawai</th>
                <th className="px-4 py-3 min-w-[160px]">Jabatan</th>
                <th className="px-4 py-3 min-w-[120px]">TMT</th>
                <th className="px-4 py-3 text-center rounded-tr-xl min-w-[100px]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    Memuat data struktur...
                  </td>
                </tr>
              ) : filteredStruktur.length > 0 ? (
                filteredStruktur.map((struktur) => (
                  <tr
                    key={struktur.id_struktur}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                  >
                    <td className="px-4 py-3">{struktur.nama_petugas}</td>
                    <td className="px-4 py-3">{struktur.jabatan || '-'}</td>
                    <td className="px-4 py-3">{formatDate(struktur.tmt)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-3">
                        <FaEdit
                          className="text-blue-800 cursor-pointer"
                          onClick={() => handleEditClick(struktur)}
                        />
                        <FaTrash
                          className={`cursor-pointer ${
                            deletingId === struktur.id_struktur
                              ? 'opacity-50 cursor-not-allowed'
                              : 'text-blue-800 hover:text-gray-600'
                          }`}
                          onClick={() =>
                            deletingId === struktur.id_struktur ? null : handleDelete(struktur)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    Tidak ada data struktur ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
