"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/models/interfaces';

export default function ProdutosPage() {
  const [data, setData] = useState<Product[]>([]); // Guarda os produtos
  const [loading, setLoading] = useState(true);    // Controla o estado de carregamento

  useEffect(() => {
    // Buscar os dados à API da DEISI Shop
    fetch('https://deisishop.pythonanywhere.com/products')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
        setLoading(false);
      });
  }, []);

  // Simulação de compra (apenas visual)
  const comprar = (produto: Product) => {
    alert(`Comprou: ${produto.title} por ${produto.price}€`);
  }

  if (loading) {
    return <div className="text-center p-10 text-white">A carregar a Loja...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Loja DEISI Shop
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((produto) => (
          <div 
            key={produto.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col p-4 hover:scale-105 transition-transform duration-300"
          >
            {/* Imagem do Produto */}
            <div className="relative w-full h-48 flex items-center justify-center mb-4 bg-gray-50 rounded-lg">
                <Image 
                    src={produto.image} 
                    alt={produto.title} 
                    width={150} 
                    height={150}
                    className="object-contain h-full w-auto"
                />
            </div>
            
            {/* Informações */}
            <div className="flex flex-col ">
              <h3 className="font-bold text-gray-800 text-sm line-clamp-1" title={produto.title}>
                {produto.title}
              </h3>
              
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                {produto.category}
              </p>
              
              <div className="flex items-center mb-3">
                <span className="text-yellow-500 text-sm mr-1">★</span>
                <span className="text-xs text-gray-600">
                    {produto.rating.rate} ({produto.rating.count})
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4 ">
                {produto.description}
              </p>

              {/* Preço e Botão */}
              <div className="mt-auto flex justify-between items-center border-t pt-3">
                <span className="text-lg font-bold text-green-600">
                    {produto.price.toFixed(2)} €
                </span>
                <button 
                    onClick={() => comprar(produto)}
                    className="bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}