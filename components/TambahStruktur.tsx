'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';

import InputField from './Input';
import Button from './Button';
import ModalWrapper from './ModalWrapper';
import { tambahStrukturOrganisasi } from '@/lib/api/struktur/post-struktur/router';
import { getAllPetugas } from '@/lib/api/petugas/get-petugas/router';

interface TambahStrukturProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  userId: string;
}

interface Petugas {
  nip: string;
  nama_lengkap: string;
}

export const TambahStruktur: React.FC<TambahStrukturProps> = ({
  isOpen,
  onClose,
  onSuccess,
  userId,
}) => {
  const [formData, setFormData] = useState({ petugas: '', jabatan: '', tmt: '' });
  const [listPetugas, setListPetugas] = useState<Petugas[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ petugas: '', jabatan: '', tmt: '' });
      getAllPetugas()
        .then(setListPetugas)
        .catch(() => toast.error('Gagal memuat daftar petugas'));
    }
  }, [isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.petugas || !formData.jabatan || !formData.tmt) {
      toast.error('Semua kolom wajib diisi');
      return;
    }

    setLoading(true);
    try {
      await tambahStrukturOrganisasi({ ...formData, userId });
      toast.success('Struktur berhasil ditambahkan');
      await onSuccess();
      handleClose();
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Terjadi kesalahan saat menyimpan struktur';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ petugas: '', jabatan: '', tmt: '' });
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      <h2 className="text-lg font-semibold mb-4">Tambah Struktur Organisasi</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4" autoComplete="off">
        <div className="flex flex-col gap-1">
          <label htmlFor="petugas" className="text-sm font-medium text-gray-700">Petugas</label>
          <select
            name="petugas"
            value={formData.petugas}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 text-sm"
            required
          >
            <option value="">Pilih Petugas</option>
            {listPetugas.map((p) => (
              <option key={p.nip} value={p.nip}>{p.nama_lengkap}</option>
            ))}
          </select>
        </div>

        <InputField name="jabatan" label="Jabatan" value={formData.jabatan} onChange={handleChange} placeholder="Contoh: Kepala Seksi" />
        <InputField name="tmt" type="date" label="TMT" value={formData.tmt} onChange={handleChange} />

        <div className="flex justify-end gap-2 mt-4">
          <Button label="BATAL" onClick={handleClose} type="button" styleButton="bg-gray-600 text-white" />
          <Button label={loading ? 'Menyimpan...' : 'SIMPAN'} type="submit" disabled={loading} styleButton="bg-blue-800 text-white" />
        </div>
      </form>
    </ModalWrapper>
  );
};
