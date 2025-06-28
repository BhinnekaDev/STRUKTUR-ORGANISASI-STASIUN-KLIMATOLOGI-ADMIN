'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
  title: string;
}

const Navbar = ({ title }: NavbarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {``
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full flex justify-between items-center mb-6 relative">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center space-x-2 hover:opacity-80"
        >
          <span className="text-sm text-gray-700 font-semibold">ADMIN1</span>
          <Image
            src="/profil.png"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
            <Link href="/profil" className="block px-4 py-2 hover:bg-gray-100 text-sm">
              Profil
            </Link>
            <button
              onClick={() => {
                const confirmLogout = confirm('Apakah Anda yakin ingin logout?');
                if (confirmLogout) {
                  localStorage.clear();
                  window.location.href = '/';
                }
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar; 
