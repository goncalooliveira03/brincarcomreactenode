"use client";

import React, { useState, useEffect } from 'react';
import { Product } from '@/models/interfaces';
import ProductCard from '@/components/MagiaDoJSX/ProductCard'; // Importamos o nosso componente

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [loading, setLoading] = useState(true);

  // Carregar dados
  useEffect(() => {
    Promise.all([
      fetch('https://deisishop.pythonanywhere.com/products').then(res => res.json()),
      fetch('https://deisishop.pythonanywhere.com/categories').then(res => res.json())
    ])
    .then(([dadosProdutos, dadosCategorias]) => {
      setProducts(dadosProdutos);
      
      // Limpeza das categorias (caso venham como objetos)
      const categoriasLimpas = dadosCategorias.map((cat: any) => {
          if (typeof cat === 'string') return cat;
          return cat.name || String(cat);
      });
      
      setCategories(categoriasLimpas);
      setLoading(false);
    })
    .catch(erro => {
      console.error("Erro ao carregar a loja:", erro);
      setLoading(false);
    });
  }, []);

  // Função de Comprar
  const addToCart = (produto: Product) => {
    // Aqui vai a tua lógica de carrinho (localStorage, etc)
    alert(`Compraste: ${produto.title}`);
  };

  // Filtragemm
  const produtosFiltrados = products.filter(produto => {
    const categoriaCorreta = selectedCategory === "Todas" || produto.category === selectedCategory;
    const pesquisaCorreta = produto.title.toLowerCase().includes(search.toLowerCase());
    return categoriaCorreta && pesquisaCorreta;
  });

  if (loading) return <div className="text-center p-10 text-white animate-pulse">A carregar...</div>;

  return (
    <div className="w-full p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-md">
        Loja DEISI Shop
      </h1>

      {/* Filtros */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-700">
        <div className="mb-6">
          <input 
            type="text"
            placeholder="Pesquisar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory("Todas")}
            className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === "Todas" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200"}`}
          >
            Todas
          </button>
          
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all capitalize ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Produtos usando o ProductCard */}
      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {produtosFiltrados.map((produto) => (
          <ProductCard 
            key={produto.id} 
            product={produto} 
            onAddToCart={addToCart} // Passamos a função de comprar
          />
        ))}
      </div>
    </div>
  );
}