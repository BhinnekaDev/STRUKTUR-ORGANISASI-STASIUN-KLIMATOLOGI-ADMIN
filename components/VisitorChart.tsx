// components/VisitorChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sen', pengguna: 1 },
  { name: 'Sel', pengguna: 2 },
  { name: 'Rab', pengguna: 3 },
  { name: 'Kam', pengguna: 4 },
  { name: 'Jum', pengguna: 5 },
  { name: 'Sab', pengguna: 6 },
  { name: 'Min', pengguna: 6 },
];

export default function VisitorChart() {
  return (
    <div className="bg-white p-4 rounded-md shadow mt-6 w-full">
      <h3 className="font-semibold text-lg mb-4">Pengunjung</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pengguna" stroke="#1D4ED8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
