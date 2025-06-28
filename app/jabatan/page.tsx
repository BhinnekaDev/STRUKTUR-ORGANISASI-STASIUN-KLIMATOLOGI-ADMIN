'use client';

import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { MdOutlineSearch } from 'react-icons/md';
import Sidebar from '@/components/Sidebar'; 
import Navbar from '@/components/Navbar';
import { TambahJabatan } from '@/components/TambahJabatan';
import { EditJabatan } from '@/components/EditJabatan';

interface Jabatan {
  id: string;
  nama: string;
}

export default function JabatanPage() {
  const [isTambahModalOpen, setIsTambahModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJabatan, setSelectedJabatan] = useState<Jabatan | null>(null);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([
    { id: 'J01', nama: 'Kepala Seksi' },
    { id: 'J02', nama: 'Staf' },
    { id: 'J03', nama: 'Sekretaris' },
  ]);

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus jabatan ini?')) {
      setJabatanList(jabatanList.filter(j => j.id !== id));
    }
  };

  const handleEditClick = (jabatan: Jabatan) => {
    setSelectedJabatan(jabatan);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (updatedJabatan: Jabatan) => {
    setJabatanList(prev =>
      prev.map(j => (j.id === updatedJabatan.id ? updatedJabatan : j))
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="Jabatan" />
      <main className="flex-1 p-8">
        <Navbar title="Jabatan" />

        {/* Header Action */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          {/* Tombol Tambah */}
          <button
            onClick={() => setIsTambahModalOpen(true)}
            className="bg-blue-800 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-900 text-sm flex items-center gap-2"
          >
            <FaPlus /> Tambah
          </button>
          <TambahJabatan
            isOpen={isTambahModalOpen}
            onClose={() => setIsTambahModalOpen(false)}
          />

          <EditJabatan
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            jabatan={selectedJabatan}
            onSubmit={handleEditSubmit}
          />

          {/* Search */}
          <div className="relative w-full md:w-64 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Cari"
              className="w-full border border-blue-800 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-800 text-sm"
            />
            <MdOutlineSearch className="absolute top-2.5 left-3 text-blue-800 text-lg" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl overflow-x-auto shadow-md p-2">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-4 py-3 rounded-tl-xl rounded-bl-xl">ID Jabatan</th>
                <th className="px-4 py-3">Nama Jabatan</th>
                <th className="px-4 py-3 text-center rounded-tr-xl rounded-br-xl">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {jabatanList.map((jabatan, index) => (
                <tr key={index} className="border-b border-white">
                  <td className="px-4 py-3">{jabatan.id}</td>
                  <td className="px-4 py-3">{jabatan.nama}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <FaEdit
                        className="text-blue-800 hover:text-gray-600 cursor-pointer"
                        onClick={() => handleEditClick(jabatan)}
                      />
                      <FaTrash
                        className="text-blue-800 hover:text-gray-600 cursor-pointer"
                        onClick={() => handleDelete(jabatan.id)}
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
  );
}
