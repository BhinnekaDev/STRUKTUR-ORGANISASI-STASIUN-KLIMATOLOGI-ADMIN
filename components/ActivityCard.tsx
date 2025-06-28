'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface ActivityCardProps {
  text: string;
  time: string;
  onClick?: () => void; 
}

export default function ActivityCard({ text, time, onClick }: ActivityCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3 p-3 border rounded-md shadow-sm w-full md:w-64 transition 
        ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
    >
      <Icon icon="mdi:plus-circle-outline" width={24} height={24} className="text-blue-600" />
      <div>
        <p className="font-medium text-sm">{text}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}
