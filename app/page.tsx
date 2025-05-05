'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import InputField from '@/components/Input';
import Button from '@/components/Button';
import AuthLeftPanel from '@/components/AuthLeftPanel';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    // tambahkan logika autentikasi di sini
  };

  return (
    <div className="flex min-h-screen">
      <AuthLeftPanel />

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <h1 className="text-2xl font-bold mb-6">Login Admin</h1><br />
        <div className="w-full max-w-sm flex flex-col gap-4">
          <InputField
            name="email"
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            name="password"
            type="password"
            placeholder="Masukkan Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-right text-sm text-blue-700 hover:underline cursor-pointer">
            Lupa Kata Sandi?
          </div>

          <Button
            label="Masuk"
            onClick={handleLogin}
          />

          <div className="text-sm text-center">
            Belum punya akun?{' '}
            <Link
              href="/daftar"
              className="text-blue-700 font-medium hover:underline"
            >
              Buat akun
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
