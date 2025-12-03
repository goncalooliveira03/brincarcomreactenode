import React from 'react';
import Contador from '@/components/MagiaDoJSX/Contador';

export default function ContadorPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-white">Contador</h1>
      <p className="text-gray-300 mb-6 text-center">
        Este exemplo demonstra o uso de useState, useEffect e LocalStorage.
      </p>
      
      {}
      <Contador />
    </div>
  );
}