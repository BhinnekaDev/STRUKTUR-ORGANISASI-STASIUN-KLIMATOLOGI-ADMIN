import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { inputProps } from '@/interface/InputProps';

export default function InputField({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
}: inputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="relative w-full">
      {label && <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>}
      
      <input
        id={name}
        name={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}

