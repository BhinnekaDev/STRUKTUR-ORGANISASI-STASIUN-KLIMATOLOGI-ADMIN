'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from './Button';
import InputField from './Input';

interface TambahPegawaiProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  nip: string;
  jabatan: string;
  namaDepan: string;
  namaBelakang: string;
  noTelepon: string;
  foto: File | null;
  masaBakti: string;
}

const initialFormState: FormData = {
  nip: '',
  jabatan: '',
  namaDepan: '',
  namaBelakang: '',
  noTelepon: '',
  foto: null,
  masaBakti: '',
};

export const TambahPegawai: React.FC<TambahPegawaiProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>(initialFormState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'foto' && files?.[0]) {
      setFormData((prev) => ({ ...prev, foto: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Pegawai ditambahkan:', formData);
    setFormData(initialFormState);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
      <div className="relative z-50 w-full max-w-lg pointer-events-auto">
        <div className="bg-white p-6 rounded-xl shadow-xl w-full">
          <h2 className="text-lg font-semibold mb-4">Tambah Data Pegawai</h2>

          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-4" autoComplete="off">
            {[
              { name: 'nip', label: 'NIP' },
              { name: 'jabatan', label: 'Jabatan' },
              { name: 'namaDepan', label: 'Nama Depan' },
              { name: 'namaBelakang', label: 'Nama Belakang' },
              { name: 'noTelepon', label: 'No Telepon' },
              { name: 'masaBakti', label: 'Masa Bakti (e.g. 2025-2029)' },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <InputField
                  type="text"
                  name={field.name}
                  value={(formData as any)[field.name]}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            {/* Input Foto */}
            <div className="flex flex-col gap-1">
              <label htmlFor="foto" className="text-sm font-medium text-gray-700">
                Foto
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={formData.foto?.name || ''}
                  placeholder="Pilih file foto"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-32 bg-white text-gray-700"
                />
                <input
                  type="file"
                  name="foto"
                  id="foto"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="absolute right-0 top-0 h-full opacity-0 cursor-pointer w-32"
                />
                <div className="absolute right-0 top-0 h-full w-32 flex items-center justify-center bg-gray-200 border-l border-gray-300 rounded-r-md text-sm font-medium text-gray-700 pointer-events-none">
                  Pilih File
                </div>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                label="BATAL"
                onClick={onClose}
                styleButton="bg-gray-700 text-white hover:bg-gray-500"
              />
              <Button
                label="SIMPAN"
                type="submit"
                styleButton="bg-blue-700 text-white hover:bg-blue-800"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
