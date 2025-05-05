'use client';

import React from 'react';
import Image from 'next/image';
import Logo from '@/public/logo.png';

export default function AuthLeftPanel() {
  return (
    <div className="bg-[#004AAD] text-white flex flex-col justify-center items-center w-full md:w-1/2 p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
        STRUKTUR ORGANISASI
      </h1>
      <h2 className="text-lg sm:text-xl font-bold text-center mb-6">
        STASIUN KLIMATOLOGI
      </h2>
      <Image
        src={Logo}
        alt="Logo BMKG"
        width={150}
        height={150}
        priority
      />
      <h2 className="text-md sm:text-lg font-bold text-center mt-6">
        PROVINSI BENGKULU
      </h2>
    </div>
  );
}
