'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InputField from '@/components/Input';
import Button from '@/components/Button';
import AuthLeftPanel from '@/components/AuthLeftPanel';
import { motion } from 'framer-motion'; // 💡 Transisi halus (install framer-motion)

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }

    setError('');
    console.log('Email:', email);
    console.log('Password:', password);

    // Simulasi login & redirect
    setTimeout(() => {
      router.push('/beranda');
    }, 500);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 transition-all">
      <AuthLeftPanel />

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col justify-center items-center w-full md:w-1/2 p-8"
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-800 tracking-wide">Login Admin</h1>
        <p className="text-gray-500 mb-6 text-sm">Silakan masuk untuk mengelola sistem</p>

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

          {error && (
            <p className="text-sm text-red-500 -mt-2">{error}</p>
          )}

          <div className="text-right text-sm text-blue-700 hover:underline cursor-pointer">
            <Link href="/lupa-password">Lupa Kata Sandi?</Link>
          </div>

          <Button label="Masuk" onClick={handleLogin} />

          <div className="text-sm text-center text-gray-600">
            Belum punya akun?{' '}
            <Link
              href="/daftar"
              className="text-blue-700 font-medium hover:underline"
            >
              Buat akun
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
