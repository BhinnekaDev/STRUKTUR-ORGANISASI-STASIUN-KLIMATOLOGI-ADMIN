'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from './Button';
import InputField from './Input';

interface TambahJabatanProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  id: string;
  namaJabatan: string;
}

const initialFormState: FormData = {
  id: '',
  namaJabatan: '',
};

export const TambahJabatan: React.FC<TambahJabatanProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>(initialFormState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Jabatan ditambahkan:', formData);
    setFormData(initialFormState);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Tambah Jabatan</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4" autoComplete="off">
          {[ 
            { name: 'id', label: 'ID Jabatan', placeholder: 'Masukkan ID' },
            { name: 'namaJabatan', label: 'Nama Jabatan', placeholder: 'Masukkan nama jabatan' },
          ].map((field) => (
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
              />
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              label="BATAL"
              onClick={onClose}
              styleButton="bg-gray-700 text-white hover:bg-gray-500"
              type="button"
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
