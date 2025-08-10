'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import InputField from './Input';
import Button from './Button';
import ModalWrapper from './ModalWrapper';
import { tambahPetugas } from '@/lib/api/petugas/post-petugas/router';

interface TambahPegawaiProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

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
}

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
};

const pangkatOptions = ['Ia','Ib','Ic','Id','IIa','IIb','IIc','IId','IIIa','IIIb','IIIc','IIId','IVa','IVb','IVc','IVd','IVe'];

export const TambahPegawai: React.FC<TambahPegawaiProps> = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
      setSelectedFile(null);
    }
  }, [isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'foto_pegawai' && e.target instanceof HTMLInputElement && e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return toast.error('Foto wajib diunggah');
    if (!form.nama_lengkap || !form.tmt) return toast.error('Nama lengkap dan TMT wajib diisi');

    setLoading(true);
    try {
      const fotoBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Gagal membaca file'));
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const payload = {
        ...form,
        kgb_terakhir: form.kgb_terakhir || undefined,
        kgb_berikutnya: form.kgb_berikutnya || undefined,
        foto_pegawai: fotoBase64,
      };

      await tambahPetugas(payload);
      toast.success('Pegawai berhasil ditambahkan');
      await onSuccess();
      setForm(initialForm);
      setSelectedFile(null);
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat menambahkan data';
      toast.error(message.includes('nip') ? 'NIP sudah digunakan' : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Tambah Pegawai</h2>
      <form className="space-y-4" autoComplete="off">
        <InputField name="nip" type="number" label="NIP" value={form.nip} onChange={handleChange} />
        <InputField name="nama_lengkap" label="Nama Lengkap" value={form.nama_lengkap} onChange={handleChange} />
        <InputField name="tempat_tanggal_lahir" label="Tempat & Tanggal Lahir" value={form.tempat_tanggal_lahir} onChange={handleChange} />
        <InputField name="pendidikan_terakhir" label="Pendidikan Terakhir" value={form.pendidikan_terakhir} onChange={handleChange} />

        <div>
          <label className="text-sm font-medium text-gray-700">Pangkat/Golongan</label>
          <select
            name="pangkat_golongan"
            value={form.pangkat_golongan}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="">-- Pilih Pangkat/Golongan --</option>
            {pangkatOptions.map((gol) => (
              <option key={gol} value={gol}>{gol}</option>
            ))}
          </select>
        </div>

        <InputField name="kgb_terakhir" type="date" label="KGB Terakhir" value={form.kgb_terakhir} onChange={handleChange} />
        <InputField name="kgb_berikutnya" type="date" label="KGB Berikutnya" value={form.kgb_berikutnya} onChange={handleChange} />
        <InputField name="tmt" type="date" label="TMT" value={form.tmt} onChange={handleChange} />
        <InputField name="no_telepon" type="number" label="No Telepon" value={form.no_telepon} onChange={handleChange} />

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Foto Pegawai</label>
          <div className="relative">
            <input
              type="file"
              name="foto_pegawai"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex items-center justify-between px-4 py-2 text-sm bg-white border border-gray-300 rounded-md">
              <span>{selectedFile ? selectedFile.name : 'Pilih file...'}</span>
              <span className="px-3 py-1 bg-gray-100 rounded-md">Browse</span>
            </div>
          </div>
          {selectedFile && (
            <div className="mt-2 flex items-center gap-2">
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded border"
                unoptimized
              />
              <button type="button" onClick={() => setSelectedFile(null)} className="text-red-500 hover:text-red-700">
                Hapus
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button label="Batal" onClick={onClose} type="button" styleButton="bg-gray-500" />
          <Button label={loading ? 'Menyimpan...' : 'Simpan'} onClick={handleSubmit} disabled={loading} styleButton="bg-blue-800 text-white" />
        </div>
      </form>
    </ModalWrapper>
  );
};
