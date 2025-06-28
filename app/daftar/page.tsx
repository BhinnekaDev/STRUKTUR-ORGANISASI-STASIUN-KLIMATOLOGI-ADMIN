'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/Input';
import Button from '@/components/Button';
import AuthLeftPanel from '@/components/AuthLeftPanel';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accessLevel, setAccessLevel] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !accessLevel) {
      setError('Semua field harus diisi!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak sesuai!');
      return;
    }

    // Simulasi register
    console.log('Register sukses:', {
      firstName, lastName, email, phone, password, accessLevel
    });

    setError('');
    router.push('/');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <AuthLeftPanel />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center items-center w-full md:w-1/2 p-8"
      >
        <h1 className="text-2xl font-bold mb-2 text-gray-800 tracking-wide">Daftar Admin</h1>
        <p className="text-gray-500 mb-6 text-sm">Silakan isi data berikut untuk membuat akun</p>

        <div className="w-full max-w-sm flex flex-col gap-4">
          <div className="flex gap-2">
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
          </div>
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
          <InputField
            name="password"
            type="password"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            name="confirmPassword"
            type="password"
            placeholder="Konfirmasi Kata Sandi"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Level Akses</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>

          {error && (
            <div className="bg-red-100 text-red-700 text-sm p-2 rounded">
              {error}
            </div>
          )}

          <Button label="Daftar" onClick={handleRegister} />

          <div className="text-sm text-center text-gray-600">
            Sudah punya akun?{' '}
            <Link href="/" className="text-blue-700 font-medium hover:underline">
              Masuk
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
