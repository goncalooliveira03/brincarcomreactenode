"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/models/interfaces';

export default function ProdutosPage() {
  // --- Estados: A "memória" da nossa página ---
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  // Filtros
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  
  // Controlo de carregamento
  const [loading, setLoading] = useState(true);

  //Carregar dados da API
  useEffect(() => {
    // Usamos Promise.all para buscar produtos e categorias ao mesmo tempo (mais rápido)
    Promise.all([
      fetch('https://deisishop.pythonanywhere.com/products').then(res => res.json()),
      fetch('https://deisishop.pythonanywhere.com/categories').then(res => res.json())
    ])
    .then(([dadosProdutos, dadosCategorias]) => {
      setProducts(dadosProdutos);
      setCategories(dadosCategorias);
      setLoading(false);
    })
    .catch(erro => {
      console.error("Erro ao carregar a loja:", erro);
      setLoading(false);
    });
  }, []);

  // --- 2. Lógica de Compra (Simulação) ---
  const comprarProduto = (produto: Product) => {
    // Futuramente, aqui adicionas a lógica do Carrinho/LocalStorage
    alert(`Adicionaste ao carrinho: ${produto.title}`);
  };

  // --- 3. Filtragem Inteligente ---
  // Filtramos a lista original sempre que a pesquisa ou a categoria mudam
  const produtosFiltrados = products.filter(produto => {
    const categoriaCorreta = selectedCategory === "Todas" || produto.category === selectedCategory;
    const pesquisaCorreta = produto.title.toLowerCase().includes(search.toLowerCase());
    
    return categoriaCorreta && pesquisaCorreta;
  });

  // Mostra mensagem enquanto carrega
  if (loading) {
    return <div className="text-center p-10 text-white animate-pulse">A carregar produtos...</div>;
  }

  return (
    <div className="w-full p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-md">
        Loja DEISI Shop
      </h1>

      {/* --- Área de Filtros --- */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-700">
        
        {/* Barra de Pesquisa */}
        <div className="mb-6">
          <input 
            type="text"
            placeholder="Pesquisar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botões das Categorias */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory("Todas")}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedCategory === "Todas" 
                ? "bg-blue-600 text-white shadow-lg scale-105" 
                : "bg-gray-600 text-gray-200 hover:bg-gray-500"
            }`}
          >
            Todas
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all capitalize ${
                selectedCategory === category 
                  ? "bg-blue-600 text-white shadow-lg scale-105" 
                  : "bg-gray-600 text-gray-200 hover:bg-gray-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* --- Lista de Produtos --- */}
      {produtosFiltrados.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          <p className="text-xl">Nenhum produto encontrado com esses filtros.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => (
            <article 
              key={produto.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 h-full"
            >
              {/* Imagem do Produto */}
              <div className="relative w-full h-48 p-4 bg-gray-50 flex items-center justify-center border-b border-gray-100">
                  <Image 
                      src={produto.image} 
                      alt={produto.title} 
                      width={150} 
                      height={150}
                      className="object-contain h-full w-auto drop-shadow-sm"
                  />
              </div>
              
              {/* Detalhes do Produto */}
              <div className="p-4 flex flex-col flex-grow">
                <span className="text-xs font-bold text-blue-500 uppercase mb-1 tracking-wider">
                  {produto.category}
                </span>
                
                <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2 line-clamp-2" title={produto.title}>
                  {produto.title}
                </h3>
                
                <div className="flex items-center gap-1 mb-3">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="text-sm font-medium text-gray-600">{produto.rating.rate}</span>
                    <span className="text-xs text-gray-400">({produto.rating.count} avaliações)</span>
                </div>

                <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
                  {produto.description}
                </p>

                {/* Preço e Botão */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <span className="text-xl font-bold text-gray-900">
                    {produto.price.toFixed(2)} €
                  </span>
                  <button 
                    onClick={() => comprarProduto(produto)}
                    className="bg-black text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition active:scale-95"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}