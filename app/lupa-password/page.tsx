'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/Input';
import Button from '@/components/Button';
import AuthLeftPanel from '@/components/AuthLeftPanel';
import Image from 'next/image';
import EmailSentIcon from '@/public/mail-sent.svg'; 
import EmailIcon from '@/public/email.svg'; 

export default function LupaPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendReset = () => {
    if (!email) {
      setError('Email harus diisi!');
      return;
    }

    setError('');
    console.log(`Simulasi: mengirim link reset ke ${email}`);
    setSent(true);
  };

  return (
    <div className="flex min-h-screen">
      <AuthLeftPanel />

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-sm flex flex-col gap-4 text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Lupa Kata Sandi</h1>

          {sent ? (
            <>
              <div className="flex justify-center">
                <Image src={EmailSentIcon} alt="Email sent" width={150} height={150} />
              </div>
              <br />
              <p className="text-gray-700">
                Link reset telah dikirim ke <strong>{email}</strong>. Silakan cek email Anda.
              </p>
            </>
          ) : (
            <>
                <div className="flex justify-center">
                    <Image src={EmailIcon} alt="Email" width={150} height={150} />
                </div>
                <br />
              <InputField
                name="email"
                type="email"
                placeholder="Masukkan email terdaftar"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

              <Button label="Kirim Link Reset" onClick={handleSendReset} />

              <p className="text-sm mt-4 text-gray-600">
                Ingat kata sandi?{' '}
                <span
                  className="underline cursor-pointer text-blue-700 hover:text-blue-900"
                  onClick={() => router.push('/')}
                >
                  Masuk di sini
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
