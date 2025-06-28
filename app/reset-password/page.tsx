'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import InputField from '@/components/Input';
import Button from '@/components/Button';
import AuthLeftPanel from '@/components/AuthLeftPanel';
import Image from 'next/image';
import SuccessImage from '@/public//password-success.png';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const params = useSearchParams();
  const token = params.get('token');
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      alert('Token tidak ditemukan.');
      router.push('/');
    }
  }, [token]);

  const handleReset = () => {
    if (!password || !confirm) {
      setError('Semua field wajib diisi.');
      return;
    }

    if (password.length < 8) {
      setError('Password minimal 8 karakter.');
      return;
    }

    if (password !== confirm) {
      setError('Kata sandi tidak cocok!');
      return;
    }

    setError('');
    console.log(`Reset password dengan token: ${token}, password baru: ${password}`);
    setTimeout(() => setSuccess(true), 1000);
  };

  return (
    <div className="flex min-h-screen">
      <AuthLeftPanel />

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-sm flex flex-col gap-4 text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Atur Ulang Kata Sandi</h1>

          {success ? (
            <>
              <Image src={SuccessImage} alt="Success" width={150} height={150} />
              <p className="text-gray-700">
                Kata sandi berhasil diubah.
              </p>
              <Button label="Login sekarang" onClick={() => router.push('/')} />
            </>
          ) : (
            <>
              <InputField
                name="new-password"
                type="password"
                placeholder="Password baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
                name="confirm-password"
                type="password"
                placeholder="Konfirmasi password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

              <Button
                label="Simpan Password Baru"
                onClick={handleReset}
              />
              <p className="text-xs text-gray-400 mt-2">
                Kembali ke{' '}
                <span
                  className="text-blue-700 underline cursor-pointer hover:text-blue-900"
                  onClick={() => router.push('/')}
                >
                  halaman login
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
