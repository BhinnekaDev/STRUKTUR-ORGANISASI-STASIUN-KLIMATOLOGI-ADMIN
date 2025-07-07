import React from 'react';
<<<<<<< HEAD
import { ButtonProps } from '@/interface/buttonProps';

export default function Button({ label, styleButton = '', disabled = false, onClick }: ButtonProps) {
=======
import { ButtonProps } from '@/interface/ButtonProps';

export default function Button({ label, styleButton, disabled, onClick }: ButtonProps) {
>>>>>>> bhinnekadev24/bhi-314-frontend-daftar-admin
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-[#0B48A8] hover:bg-blue-900 shadow-md text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${styleButton}`}
    >
      {label}
    </button>
  );
}


