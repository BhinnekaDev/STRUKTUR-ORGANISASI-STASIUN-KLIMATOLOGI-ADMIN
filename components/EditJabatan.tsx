'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Button from './Button';
import InputField from './Input';

interface EditJabatanProps {
  isOpen: boolean;
  onClose: () => void;
  jabatan: { id: string; nama: string } | null;
  onSubmit: (data: { id: string; nama: string }) => void
}


export const EditJabatan: React.FC<EditJabatanProps> = ({
  isOpen,
  onClose,
  jabatan,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({ id: '', nama: '' });

  useEffect(() => {
    if (jabatan) {
      setFormData({ id: jabatan.id, nama: jabatan.nama });
    }
  }, [jabatan]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ id: formData.id, nama: formData.nama });
  };

  if (!isOpen || !jabatan) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Jabatan</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4" autoComplete="off">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">ID Jabatan</label>
            <InputField
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Nama Jabatan</label>
            <InputField
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button label="BATAL" type="button" onClick={onClose} styleButton="bg-gray-700 text-white hover:bg-gray-500" />
            <Button label="SIMPAN" type="submit" styleButton="bg-blue-800 text-white hover:bg-blue-900" />
          </div>
        </form>
      </div>
    </div>
  );
};
