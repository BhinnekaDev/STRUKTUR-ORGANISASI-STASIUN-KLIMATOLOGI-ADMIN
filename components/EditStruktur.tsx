'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';

import Button from './Button';
import InputField from './Input';
import ModalWrapper from './ModalWrapper';
import { getAllPetugas } from '@/lib/api/petugas/get-petugas/router';
import { editStrukturOrganisasi } from '@/lib/api/struktur/put-struktur/router';

interface StrukturForm {
  id: string;
  petugas: string;
  jabatan: string;
  tmt: string;
}

interface Petugas {
  nip: string;
  nama_lengkap: string;
}

interface EditStrukturProps {
  isOpen: boolean;
  onClose: () => void;
  struktur: StrukturForm | null;
  onSuccess: () => Promise<void>;
  userId: string;
}

export const EditStruktur: React.FC<EditStrukturProps> = ({
  isOpen,
  onClose,
  struktur,
  onSuccess,
  userId,
}) => {
  const [formData, setFormData] = useState<StrukturForm>({
    id: '',
    petugas: '',
    jabatan: '',
    tmt: '',
  });

  const [listPetugas, setListPetugas] = useState<Petugas[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (struktur) {
      setFormData(struktur);
    }

    if (isOpen) {
      getAllPetugas()
        .then(setListPetugas)
        .catch(() => toast.error('Gagal memuat daftar petugas'));
    }
  }, [isOpen, struktur]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { id, petugas, jabatan, tmt } = formData;
    if (!id || !petugas || !jabatan || !tmt) {
      toast.error('Semua kolom wajib diisi');
      return;
    }

    setLoading(true);
    try {
      await editStrukturOrganisasi({ id, petugas, jabatan, tmt, userId });
      toast.success('Struktur berhasil diperbarui');
      await onSuccess();
      handleClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Terjadi kesalahan saat mengedit struktur';
      toast.error(message);
      console.error('Edit struktur error:', message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ id: '', petugas: '', jabatan: '', tmt: '' });
    onClose();
  };

  if (!struktur) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose} title="Edit Struktur Organisasi">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4" autoComplete="off">
        {/* Pilih Petugas */}
        <div className="flex flex-col gap-1">
          <label htmlFor="petugas" className="text-sm font-medium text-gray-700">Petugas</label>
          <select
            name="petugas"
            value={formData.petugas}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 text-sm w-full"
            required
          >
            <option value="">Pilih Petugas</option>
            {listPetugas.map((p) => (
              <option key={p.nip} value={p.nip}>
                {p.nama_lengkap}
              </option>
            ))}
          </select>
        </div>

        {/* Jabatan */}
        <InputField
          label="Jabatan"
          name="jabatan"
          value={formData.jabatan}
          onChange={handleChange}
          placeholder="Contoh: Kepala Seksi Data dan Informasi"
        />

        {/* TMT */}
        <InputField
          label="TMT"
          name="tmt"
          type="date"
          value={formData.tmt}
          onChange={handleChange}
          placeholder="Tanggal mulai tugas"
        />

        {/* Tombol */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
          <Button
            label="BATAL"
            onClick={handleClose}
            type="button"
            styleButton="bg-gray-600 text-white w-full sm:w-auto"
          />
          <Button
            label={loading ? 'Menyimpan...' : 'SIMPAN'}
            type="submit"
            disabled={loading}
            styleButton="bg-blue-800 text-white w-full sm:w-auto"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};
