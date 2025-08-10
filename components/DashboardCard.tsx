'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface BarData {
  label: string;
  value: number;
}

interface DashboardCardProps {
  icon: string;
  title: string;
  value?: number;
  barData?: BarData[]; 
  onClick?: () => void;
}

export default function DashboardCard({
  icon,
  title,
  value,
  barData,
  onClick,
}: DashboardCardProps) {
  // Hitung bar maksimal jika barData tersedia
  const maxValue = barData ? Math.max(...barData.map((d) => d.value), 1) : 1;

  return (
    <div
      onClick={onClick}
      className={`p-4 bg-white rounded-xl shadow hover:shadow-md transition w-full cursor-pointer ${
        onClick ? 'hover:bg-gray-50' : ''
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-100 text-blue-800 p-3 rounded-full">
          <Icon icon={icon} width={28} height={28} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          {value !== undefined && (
            <h3 className="text-xl font-semibold">{value}</h3>
          )}
        </div>
      </div>

      {barData && barData.length > 0 && (
        <div className="space-y-3">
          {barData.map((item, idx) => {
            const percent = (item.value / maxValue) * 100;
            let color = 'bg-blue-500';
            if (percent > 75) color = 'bg-green-500';
            else if (percent > 40) color = 'bg-yellow-500';
            else if (percent > 0) color = 'bg-red-500';

            return (
              <div key={idx}>
                <div className="flex justify-between text-sm text-gray-700 mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${color}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
