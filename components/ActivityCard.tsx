'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface ActivityCardProps {
  text: string;
  time: string;
}

export default function ActivityCard({ text, time }: ActivityCardProps) {
  return (
    <div className="flex items-start gap-3 p-3 border rounded-md shadow-sm w-full md:w-64 transition-all duration-200 ease-in-out bg-white hover:shadow-md hover:scale-[1.01] ">
      <Icon
        icon="mdi:clock-outline"
        width={24}
        height={24}
        className="text-blue-600 mt-[2px] shrink-0 min-w-[24px]"
      />
      <div className="flex-1">
        <p className="font-medium text-sm text-black">{text}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}
