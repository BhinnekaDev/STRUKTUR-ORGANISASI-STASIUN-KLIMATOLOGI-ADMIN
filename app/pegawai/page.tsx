'use client';

import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { MdOutlineSearch } from 'react-icons/md';
import Sidebar from '@/components/Sidebar'; 
import Navbar from '@/components/Navbar';
import { TambahPegawai} from '@/components/TambahPegawai';
import { EditPegawai, Pegawai } from '@/components/EditPegawai';

export default function PegawaiPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPegawai, setSelectedPegawai] = useState<Pegawai | null>(null);
  const [dummyData, setDummyData] = useState<Pegawai[]>([
    {
      nip: '19840326',
      jabatan: 'Kepala Stasiun',
      namaDepan: 'Nama Depan',
      namaBelakang: 'Nama Belakang',
      noTelepon: '089822691001',
      foto: 'Petugas1.jpg',
      masaBakti: '2025-2029',
    },
  ]);

  const handleEditClick = (pegawai: Pegawai) => {
    setSelectedPegawai(pegawai);
    setIsEditOpen(true);
  };

  const handleEditSubmit = (updatedPegawai: Pegawai) => {
    setDummyData(prev =>
      prev.map(p => (p.nip === updatedPegawai.nip ? updatedPegawai : p))
    );
  };

  const handleDelete = (nip: string) => {
    const confirm = window.confirm('Yakin ingin menghapus data ini?');
    if (confirm) {
      setDummyData(prev => prev.filter(p => p.nip !== nip));
    }
  };

  return (
    <>
      <TambahPegawai isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditPegawai
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={selectedPegawai}
      />

      <div className="flex min-h-screen bg-gray-100 relative z-0">
        <Sidebar active="Pegawai" />
        <main className="flex-1 p-8 relative z-10">
          <Navbar title="Pegawai" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-800 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-900 text-sm flex items-center gap-2"
            >
              <FaPlus /> Tambah
            </button>

            <div className="flex flex-col gap-2 mt-4 md:mt-0 w-full md:w-64">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Cari"
                  className="w-full border border-blue-800 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-800 text-sm"
                />
                <MdOutlineSearch className="absolute top-2.5 left-3 text-blue-800 text-lg" />
              </div>

              <div className="text-sm text-gray-700 flex items-center">
                Urutkan Menurut:{' '}
                <select className="ml-2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-800 text-sm">
                  <option value="jabatan">Jabatan</option>
                  <option value="nama">Nama</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-x-auto shadow-md p-2">
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-800 text-white">
                <tr className="rounded-xl">
                  <th className="px-4 py-3 rounded-tl-xl rounded-bl-xl">NIP</th>
                  <th className="px-4 py-3">Jabatan</th>
                  <th className="px-4 py-3">Nama Depan</th>
                  <th className="px-4 py-3">Nama Belakang</th>
                  <th className="px-4 py-3">No Telepon</th>
                  <th className="px-4 py-3">Foto</th>
                  <th className="px-4 py-3">Masa Bakti</th>
                  <th className="px-4 py-3 text-center rounded-tr-xl rounded-br-xl">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {dummyData.map((pegawai, index) => (
                  <tr key={index} className="border-b border-white">
                    <td className="px-4 py-3">{pegawai.nip}</td>
                    <td className="px-4 py-3">{pegawai.jabatan}</td>
                    <td className="px-4 py-3">{pegawai.namaDepan}</td>
                    <td className="px-4 py-3">{pegawai.namaBelakang}</td>
                    <td className="px-4 py-3">{pegawai.noTelepon}</td>
                    <td className="px-4 py-3">{pegawai.foto}</td>
                    <td className="px-4 py-3">{pegawai.masaBakti}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
