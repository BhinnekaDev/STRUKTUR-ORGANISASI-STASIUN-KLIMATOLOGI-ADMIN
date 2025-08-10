'use client';

import React, { ReactNode } from 'react';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  widthClass?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  children,
  title,
  widthClass = 'max-w-md',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className={`bg-white rounded-xl shadow-xl w-full ${widthClass} max-h-[90vh] overflow-y-auto p-6`}>
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
