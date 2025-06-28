'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface DashboardCardProps {
  icon: string;
  title: string;
  value?: number; // value optional
  onClick?: () => void;
}

export default function DashboardCard({ icon, title, value, onClick }: DashboardCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition w-full cursor-pointer ${
        onClick ? 'hover:bg-gray-50' : ''
      }`}
    >
      <div className="bg-blue-100 text-blue-800 p-3 rounded-full">
        <Icon icon={icon} width={28} height={28} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        {value !== undefined && <h3 className="text-xl font-semibold">{value}</h3>}
      </div>
    </div>
  );
}
