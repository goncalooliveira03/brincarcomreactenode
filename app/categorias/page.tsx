"use client";

import React, { useState, useEffect } from 'react';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://deisishop.pythonanywhere.com/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro categorias:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-10 text-white">A carregar categorias...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Categorias Disponíveis
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categorias.map((cat, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:bg-blue-50 transition cursor-pointer h-40"
          >
            <div className="text-4xl mb-2">
                {/* Ícones simples baseados no nome, já que a API não dá imagens */}
                {cat === "T-shirts" && "👕"}
                {cat === "Canecas" && "☕"}
                {cat === "Meias" && "🧦"}
                {!["T-shirts", "Canecas", "Meias"].includes(cat) && "📦"}
            </div>
            <h3 className="text-xl font-bold text-gray-700 capitalize">
                {cat}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}