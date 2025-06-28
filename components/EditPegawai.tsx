'use client';

import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import InputField from './Input';
import Button from './Button';

export interface Pegawai {
  nip: string;
  jabatan: string;
  namaDepan: string;
  namaBelakang: string;
  noTelepon: string;
  foto: string;
  masaBakti: string;
}

interface EditPegawaiProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pegawai: Pegawai) => void;
  initialData: Pegawai | null;
}

export const EditPegawai: React.FC<EditPegawaiProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Pegawai>({
    nip: '',
    jabatan: '',
    namaDepan: '',
    namaBelakang: '',
    noTelepon: '',
    foto: '',
    masaBakti: '',
  });

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      const parts = initialData.foto?.split('/');
      setSelectedFileName(parts?.[parts.length - 1] || null);
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, foto: fileUrl }));
      setSelectedFileName(file.name);
    }
  };

  const handleHapusFoto = () => {
    setFormData((prev) => ({ ...prev, foto: '' }));
    setSelectedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen || !initialData) return null;

  const fields = [
    { name: 'nip', label: 'NIP', placeholder: 'Masukkan NIP', disabled: true },
    { name: 'jabatan', label: 'Jabatan', placeholder: 'Masukkan jabatan' },
    { name: 'namaDepan', label: 'Nama Depan', placeholder: 'Masukkan nama depan' },
    { name: 'namaBelakang', label: 'Nama Belakang', placeholder: 'Masukkan nama belakang' },
    { name: 'noTelepon', label: 'No Telepon', placeholder: 'Masukkan nomor telepon' },
    { name: 'masaBakti', label: 'Masa Bakti', placeholder: 'Contoh: 2025-2029' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Pegawai</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4" autoComplete="off">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <InputField
                type="text"
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                disabled={field.disabled}
              />
            </div>
          ))}

          {/* Input Foto */}
          {!formData.foto ? (
          <label
            htmlFor="foto"
            className="block w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            Pilih File
            <input
              type="file"
              accept="image/*"
              id="foto"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
          </label>
        ) : (
          <div className="flex items-center justify-between bg-gray-100 border rounded px-3 py-2">
            <span className="text-sm text-gray-700 truncate max-w-[200px]">
              {selectedFileName}
            </span>
            <button
              type="button"
              onClick={handleHapusFoto}
              className="text-red-500 hover:text-red-700 font-bold text-sm"
              title="Hapus Foto"
            >
              ×
            </button>
          </div>
        )}


          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              label="BATAL"
              type="button"
              onClick={onClose}
              styleButton="bg-gray-700 text-white hover:bg-gray-500"
            />
            <Button
              label="SIMPAN"
              type="submit"
              styleButton="bg-blue-800 text-white hover:bg-blue-900"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
