"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/models/interfaces';
import BotaoFavorito from '@/components/MagiaDoJSX/BotaoFavorito';

export default function ProdutoDetalhePage() {
  const params = useParams();
  const id = Number(params.id); // Converter para número

  const [produto, setProduto] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Na DeisiShop, às vezes é mais seguro buscar tudo e filtrar pelo ID
    // para garantir que temos os dados no formato certo
    fetch('https://deisishop.pythonanywhere.com/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        const encontrado = data.find((p) => p.id === id);
        setProduto(encontrado || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar produto:", err);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    // Aqui podes ligar à tua lógica de carrinho
    alert(`Adicionado ao carrinho: ${produto?.title}`);
  };

  if (loading) return <div className="p-10 text-center text-gray-500 animate-pulse">A carregar detalhes...</div>;
  if (!produto) return <div className="p-10 text-center text-red-500">Produto não encontrado.</div>;

  return (
    <div className="container mx-auto p-6 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col md:flex-row max-w-5xl w-full gap-10 animate-fade-in">

        {/* Lado Esquerdo: Imagem */}
        <div className="w-full md:w-1/2 relative h-96 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-6 group">
          
          {/* Botão de Favorito */}
          <div className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md">
            <BotaoFavorito id={produto.id} />
          </div>

          <Image
            src={`https://deisishop.pythonanywhere.com${produto.image}`}
            alt={produto.title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Lado Direito: Informações */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
              {produto.category}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {produto.title}
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed text-lg border-l-4 border-gray-200 pl-4">
              {produto.description}
            </p>

            {/* Avaliação */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex text-yellow-400 text-xl">
                {'★'.repeat(Math.round(produto.rating.rate))}
                <span className="text-gray-300">{'★'.repeat(5 - Math.round(produto.rating.rate))}</span>
              </div>
              <span className="text-gray-500 font-medium">
                ({produto.rating.count} avaliações)
              </span>
            </div>
          </div>

          {/* Preço e Botões */}
          <div className="flex flex-col gap-4 mt-auto">
            <div className="flex items-end gap-2 mb-4">
               <span className="text-4xl font-bold text-gray-900">
                {Number(produto.price).toFixed(2)}€
              </span>
              <span className="text-sm text-green-600 font-medium mb-1 ml-2">
                Em stock
              </span>
            </div>

            <button 
                onClick={addToCart}
                className="w-full bg-black text-white hover:bg-gray-800 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Adicionar ao Carrinho
            </button>

            <Link href="/produtos" className="w-full">
                <button className="w-full border-2 border-gray-200 hover:border-gray-900 text-gray-700 hover:text-gray-900 py-3 rounded-xl font-semibold transition-colors">
                    Voltar à Loja
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}