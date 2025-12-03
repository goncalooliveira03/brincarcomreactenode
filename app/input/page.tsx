import React from 'react';
import InputExperiencia from '@/components/MagiaDoJSX/InputExperiencia';

export default function InputPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Inputs</h1>
      <p className="text-gray-300 mb-6 text-center">
        Testando interatividade com formulários e listas em React.
      </p>
      
      {}
      <InputExperiencia />
    </div>
  );
}