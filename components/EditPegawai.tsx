// EditPegawai.tsx
'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import InputField from './Input';
import Button from './Button';
import Image from 'next/image';
import { updatePetugas } from '@/lib/api/petugas/put-petugas/router';
import type { UpdatePetugasPayload } from '@/lib/api/petugas/put-petugas/router';
import ModalWrapper from './ModalWrapper';

interface FormData {
  nip: string;
  nama_lengkap: string;
  tempat_tanggal_lahir: string;
  pendidikan_terakhir: string;
  pangkat_golongan: string;
  kgb_terakhir: string;
  kgb_berikutnya: string;
  tmt: string;
  no_telepon: string;
  foto_pegawai: string;
}

interface EditPegawaiProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  initialData: FormData | null;
}

const pangkatOptions = [
  'Ia', 'Ib', 'Ic', 'Id',
  'IIa', 'IIb', 'IIc', 'IId',
  'IIIa', 'IIIb', 'IIIc', 'IIId',
  'IVa', 'IVb', 'IVc', 'IVd', 'IVe',
];

const initialForm: FormData = {
  nip: '',
  nama_lengkap: '',
  tempat_tanggal_lahir: '',
  pendidikan_terakhir: '',
  pangkat_golongan: '',
  kgb_terakhir: '',
  kgb_berikutnya: '',
  tmt: '',
  no_telepon: '',
  foto_pegawai: '',
};

export const EditPegawai: React.FC<EditPegawaiProps> = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setForm({ ...initialForm, ...initialData });
    } else if (!isOpen) {
      setForm(initialForm);
      setSelectedFile(null);
    }
  }, [isOpen, initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'foto_pegawai' && e.target instanceof HTMLInputElement && e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) return toast.error('Ukuran file maksimal 2MB');
      if (!file.type.startsWith('image/')) return toast.error('File harus berupa gambar');
      setSelectedFile(file);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const requiredFields: Array<keyof FormData> = ['nama_lengkap', 'pangkat_golongan', 'no_telepon'];

    for (const field of requiredFields) {
      if (!form[field]?.trim()) {
        return toast.error(`Field ${field.replace('_', ' ')} harus diisi`);
      }
    }

    setLoading(true);

    try {
      let fotoBase64 = form.foto_pegawai;
      if (selectedFile) {
        fotoBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('Gagal membaca file'));
          reader.readAsDataURL(selectedFile);
        });
      }

      const payload: UpdatePetugasPayload = {
        ...form,
        foto_pegawai: fotoBase64,
      };

      await updatePetugas(form.nip, payload);
      toast.success('Data pegawai berhasil diperbarui');
      await onSuccess();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan saat memperbarui data');
    } finally {
      setLoading(false);
    }
  };

  const imagePreview = selectedFile
    ? URL.createObjectURL(selectedFile)
    : form.foto_pegawai || '';

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Edit Pegawai">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <InputField label="NIP" name="nip" value={form.nip} onChange={handleChange} disabled />
        <InputField label="Nama Lengkap" name="nama_lengkap" value={form.nama_lengkap} onChange={handleChange} disabled={loading} />
        <InputField label="Tempat & Tanggal Lahir" name="tempat_tanggal_lahir" value={form.tempat_tanggal_lahir} onChange={handleChange} disabled={loading} />
        <InputField label="Pendidikan Terakhir" name="pendidikan_terakhir" value={form.pendidikan_terakhir} onChange={handleChange} disabled={loading} />

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Pangkat/Golongan</label>
          <select name="pangkat_golongan" value={form.pangkat_golongan} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" disabled={loading} required>
            <option value="">-- Pilih Pangkat/Golongan --</option>
            {pangkatOptions.map((gol) => <option key={gol} value={gol}>{gol}</option>)}
          </select>
        </div>

        <InputField label="TMT" name="tmt" type="date" value={form.tmt} onChange={handleChange} disabled={loading} />
        <InputField label="KGB Terakhir" name="kgb_terakhir" type="date" value={form.kgb_terakhir} onChange={handleChange} disabled={loading} />
        <InputField label="KGB Berikutnya" name="kgb_berikutnya" type="date" value={form.kgb_berikutnya} onChange={handleChange} disabled={loading} />
        <InputField label="No Telepon" name="no_telepon" type="number" value={form.no_telepon} onChange={handleChange} disabled={loading} />

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Foto Pegawai</label>
          <div className="relative">
            <input type="file" name="foto_pegawai" accept="image/*" onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={loading} />
            <div className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <span>{selectedFile ? selectedFile.name : 'Pilih file...'}</span>
              <span className="px-3 py-1 bg-gray-100 rounded-md">Browse</span>
            </div>
          </div>
          {imagePreview && (
            <div className="mt-2 flex items-center gap-2">
              <Image src={imagePreview} alt="Foto Pegawai" width={80} height={80} className="w-20 h-20 object-cover rounded border" unoptimized />
              {selectedFile && (
                <button type="button" onClick={() => setSelectedFile(null)} className="text-red-500 hover:text-red-700 text-sm" disabled={loading}>
                  Hapus
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
          <Button label="Batal" onClick={onClose} type="button" styleButton="bg-gray-500 hover:bg-gray-600 text-white w-full sm:w-auto" disabled={loading} />
          <Button label={loading ? 'Menyimpan...' : 'Simpan Perubahan'} type="button" onClick={handleSubmit} disabled={loading} styleButton="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto" />
        </div>
      </form>
    </ModalWrapper>
  );
};
