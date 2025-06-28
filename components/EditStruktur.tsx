'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Button from './Button';
import InputField from './Input';

interface Struktur {
  id: string;
  petugas: string;
  periode: string;
}

interface EditStrukturProps {
  isOpen: boolean;
  onClose: () => void;
  struktur: Struktur | null;
  onSubmit: (updated: Struktur) => void;
}

export const EditStruktur: React.FC<EditStrukturProps> = ({
  isOpen,
  onClose,
  struktur,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Struktur>({
    id: '',
    petugas: '',
    periode: '',
  });

  useEffect(() => {
    if (struktur) {
      setFormData(struktur);
    }
  }, [struktur]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen || !struktur) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Struktur Organisasi</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4" autoComplete="off">
          <InputField
            label="ID Struktur"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled // ID tidak dapat diubah
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="petugas" className="text-sm font-medium text-gray-700">Petugas (NIP)</label>
            <select
              name="petugas"
              value={formData.petugas}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm focus:outline-none"
            >
              <option value="">Pilih Petugas</option>
              <option value="1987654321">1987654321 - Andi</option>
              <option value="1976543210">1976543210 - Budi</option>
            </select>
          </div>

          <InputField
            label="Periode"
            name="periode"
            value={formData.periode}
            onChange={handleChange}
            placeholder="Contoh: 2024–2026"
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button label="BATAL" onClick={onClose} type="button" styleButton="bg-gray-600 text-white" />
            <Button label="SIMPAN" type="submit" styleButton="bg-blue-800 text-white" />
          </div>
        </form>
      </div>
    </div>
  );
};
