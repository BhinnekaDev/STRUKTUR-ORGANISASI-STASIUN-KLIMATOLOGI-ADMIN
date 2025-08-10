'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaHome, FaUsers, FaSitemap, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useState } from 'react';

type SidebarProps = {
  active?: string;
};

const Sidebar = ({ active }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const menu = [
    { name: 'Beranda', href: '/beranda', icon: <FaHome /> },
    { name: 'Pegawai', href: '/pegawai', icon: <FaUsers /> },
    { name: 'Struktur Organisasi', href: '/struktur', icon: <FaSitemap /> },
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/');
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen z-50 bg-blue-800 bg-opacity-95 text-white transition-all duration-300 ease-in-out
      ${isExpanded ? 'w-64' : 'w-16'} rounded-tr-3xl rounded-br-3xl shadow-lg backdrop-blur-sm flex flex-col`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Kontainer Utama */}
      <div className="flex flex-col flex-grow">
        {/* Logo */}
        <div className="flex items-center justify-center py-6">
          <Image src="/Logo.png" alt="BMKG" width={40} height={40} />
          {isExpanded && (
            <span className="ml-3 text-lg font-semibold text-white tracking-wide"></span>
          )}
        </div>

        {/* Menu Navigasi */}
        <nav className="flex flex-col px-2 space-y-1">
          {menu.map((item) => {
            const isActive =
              active?.toLowerCase() === item.name.toLowerCase() ||
              pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-blue-800 shadow-md'
                    : 'hover:bg-blue-700 text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {isExpanded && <span className="ml-4">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout dan Copyright */}
      <div className="flex flex-col items-center px-2 pb-4">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 text-white w-full transition"
        >
          <FaSignOutAlt className="text-lg" />
          {isExpanded && <span className="ml-4">Keluar</span>}
        </button>

        {/* Copyright */}
        {isExpanded && (
          <div className="text-center text-[11px] text-white mt-4 px-2 leading-tight">
            © 2025 Bhinneka Dev. All rights reserved.
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
