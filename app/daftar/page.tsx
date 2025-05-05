'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/Input';
import Button from '@/components/Button';
import AuthLeftPanel from '@/components/AuthLeftPanel';
import Link from 'next/link';

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
    // Validasi sederhana
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !accessLevel) {
      setError('Semua field harus diisi!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak sesuai!');
      return;
    }

    // Simulasi sukses
    console.log('Register sukses:', {
      firstName,
      lastName,
      email,
      phone,
      password,
      accessLevel,
    });

    setError('');
    router.push('/');
  };

  return (
    <div className="flex min-h-screen">
      <AuthLeftPanel />

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <h1 className="text-2xl font-bold mb-6">Daftar Admin</h1>
        <div className="w-full max-w-sm flex flex-col gap-4">
          {/* Nama depan & belakang di satu baris */}
          <div className="flex gap-2">
            <InputField
              name="firstName"
              type="text"
              placeholder="Masukkan Nama Depan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              name="lastName"
              type="text"
              placeholder="Masukkan Nama Belakang"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <InputField
            name="email"
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            name="phone"
            type="text"
            placeholder="Masukkan No Telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <InputField
            name="password"
            type="password"
            placeholder="Masukkan Kata Sandi"
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
          <InputField
            name="accessLevel"
            type="text"
            placeholder="Masukkan level akses"
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
          />

          {error && (
            <div className="bg-red-100 text-red-700 text-sm p-2 rounded">
              {error}
            </div>
          )}

          <Button
            label="Daftar"
            onClick={handleRegister}
          />

          <div className="text-sm text-center">
            Sudah punya akun?{' '}
            <Link href="/" className="text-blue-700 font-medium hover:underline">
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
