'use client';

import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { MdOutlineSearch } from 'react-icons/md';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { TambahStruktur } from '@/components/TambahStruktur';
import { EditStruktur } from '@/components/EditStruktur';

interface Struktur {
  id: string;
  petugas: string; // bisa NIP
  periode: string;
}

export default function StrukturPage() {
  const [strukturList, setStrukturList] = useState<Struktur[]>([
    { id: 'S01', petugas: '1987654321', periode: '2024–2026' },
    { id: 'S02', petugas: '1976543210', periode: '2023–2025' },
  ]);

  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStruktur, setSelectedStruktur] = useState<Struktur | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus data struktur ini?')) {
      setStrukturList(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleEditClick = (struktur: Struktur) => {
    setSelectedStruktur(struktur);
    setIsEditOpen(true);
  };

  const handleEditSubmit = (updated: Struktur) => {
    setStrukturList(prev =>
      prev.map(s => (s.id === updated.id ? updated : s))
    );
    setIsEditOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active="Struktur Organisasi" />
      <main className="flex-1 p-8">
        <Navbar title="Struktur Organisasi" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <button
            onClick={() => setIsTambahOpen(true)}
            className="bg-blue-800 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-900 text-sm flex items-center gap-2"
          >
            <FaPlus /> Tambah
          </button>

          <TambahStruktur isOpen={isTambahOpen} onClose={() => setIsTambahOpen(false)} />

          <EditStruktur
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            struktur={selectedStruktur}
            onSubmit={handleEditSubmit}
          />

          <div className="relative w-full md:w-64 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Cari"
              className="w-full border border-blue-800 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-800 text-sm"
            />
            <MdOutlineSearch className="absolute top-2.5 left-3 text-blue-800 text-lg" />
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-x-auto shadow-md p-2">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-4 py-3 rounded-tl-xl rounded-bl-xl">ID Struktur</th>
                <th className="px-4 py-3">Petugas (NIP)</th>
                <th className="px-4 py-3">Periode</th>
                <th className="px-4 py-3 text-center rounded-tr-xl rounded-br-xl">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {strukturList.map((struktur, index) => (
                <tr key={index} className="border-b border-white">
                  <td className="px-4 py-3">{struktur.id}</td>
                  <td className="px-4 py-3">{struktur.petugas}</td>
                  <td className="px-4 py-3">{struktur.periode}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <FaEdit
                        className="text-blue-800 cursor-pointer"
                        onClick={() => handleEditClick(struktur)}
                      />
                      <FaTrash
                        className="text-blue-800 cursor-pointer"
                        onClick={() => handleDelete(struktur.id)}
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
