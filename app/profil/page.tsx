'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/Input';
import Button from '@/components/Button';

export default function EditProfilPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('Admin');
  const [lastName, setLastName] = useState('Satu');
  const [email, setEmail] = useState('admin@example.com');
  const [phone, setPhone] = useState('08123456789');
  const [password, setPassword] = useState('');
  const [accessLevel, setAccessLevel] = useState('superadmin');
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !phone || !accessLevel) {
      alert('Semua field harus diisi!');
      return;
    }

    console.log('Data profil diperbarui:', {
      firstName,
      lastName,
      email,
      phone,
      password,
      accessLevel,
      foto,
    });

    setSuccessMsg('Profil berhasil diperbarui!');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profil</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Foto Profil */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto Profil</label>
            {fotoPreview ? (
              <div className="flex items-center gap-4">
                <img src={fotoPreview} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                <button
                  onClick={() => {
                    setFoto(null);
                    setFotoPreview(null);
                  }}
                  className="text-red-600 text-sm hover:underline"
                >
                  Hapus Foto
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="block w-full text-sm text-gray-700 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded file:border-0 file:cursor-pointer file:font-medium file:hover:bg-blue-700"
              />
            )}
          </div>

          {/* Nama */}
          <InputField
            name="firstName"
            type="text"
            placeholder="Nama Depan"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            name="lastName"
            type="text"
            placeholder="Nama Belakang"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {/* Kontak */}
          <InputField
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            name="phone"
            type="text"
            placeholder="No Telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Password & akses */}
          <InputField
            name="password"
            type="password"
            placeholder="Kata Sandi Baru"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            name="accessLevel"
            type="text"
            placeholder="Level Akses"
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
          />
        </div>

        {/* Notifikasi */}
        {successMsg && (
          <div className="bg-green-100 text-green-700 text-sm mt-4 p-2 rounded">
            {successMsg}
          </div>
        )}

        {/* Tombol */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded font-medium"
          >
            Batal
          </button>
          <Button
            label="Simpan Perubahan"
            onClick={handleSubmit}
            styleButton="bg-blue-700 hover:bg-blue-800 text-white"
          />
        </div>
      </div>
    </div>
  );
}
