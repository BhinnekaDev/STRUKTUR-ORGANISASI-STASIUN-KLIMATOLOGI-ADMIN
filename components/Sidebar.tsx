'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUsers, FaSitemap } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import Image from 'next/image';

type SidebarProps = {
  active?: string;
};

const Sidebar = ({ active }: SidebarProps) => {
  const menu = [
    { name: 'Beranda', href: '/beranda', icon: <FaHome /> },
    { name: 'Jabatan', href: '/jabatan', icon: <MdWork /> },
    { name: 'Pegawai', href: '/pegawai', icon: <FaUsers /> },
    { name: 'Struktur Organisasi', href: '/struktur', icon: <FaSitemap /> },
  ];

  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-blue-800 text-white flex flex-col justify-between rounded-tr-2xl rounded-br-2xl">
      <div>
        <div className="flex flex-col items-center py-6">
          <Image src="/Logo.png" alt="BMKG" width={60} height={60} />
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {menu.map((item) => {
            const isActive =
              active?.toLowerCase() === item.name.toLowerCase() ||
              pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  ${isActive ? 'bg-white text-black' : 'hover:bg-blue-800'}
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <footer className="text-xs text-center text-white p-4 opacity-70">
        Copyrights © 2025 - BhinnekaDev.
      </footer>
    </aside>
  );
};

export default Sidebar;
