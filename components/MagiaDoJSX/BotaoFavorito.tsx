"use client";

import React, { useState, useEffect } from "react";

interface BotaoFavoritoProps {
  id: number;
}

export default function BotaoFavorito({ id }: BotaoFavoritoProps) {
  const [favorito, setFavorito] = useState(false);

  // Ao carregar a página verifica no localStorage se este ID já é favorito
  useEffect(() => {
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos") || "[]");
    if (favoritosGuardados.includes(id)) {
      setFavorito(true);
    }
  }, [id]);

  // Função para alternar entre favorito e não favorito
  const toggleFavorito = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede que o clique abra o link do produto 
    e.stopPropagation(); 

    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos") || "[]");
    let novosFavoritos;

    if (favorito) {
      // Remover
      novosFavoritos = favoritosGuardados.filter((favId: number) => favId !== id);
    } else {
      // Adicionar
      novosFavoritos = [...favoritosGuardados, id];
    }

    localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    setFavorito(!favorito);
  };

  return (
    <button 
      onClick={toggleFavorito} 
      className="text-3xl hover:scale-125 transition-transform p-2 z-10"
      title={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      {favorito ? "❤️" : "🤍"}
    </button>
  );
}