"use client";

import React, { useState, useEffect } from "react";

export default function Contador() {
  // 1. Estados para o valor e para o histórico
  const [valor, setValor] = useState(0);
  const [historico, setHistorico] = useState<number[]>([]);

  // 2. Carregar dados do localStorage ao iniciar a página
  useEffect(() => {
    // Verificar se existe algo guardado
    const valorGuardado = localStorage.getItem("contadorValor");
    const historicoGuardado = localStorage.getItem("contadorHistorico");

    // Se existir, atualizar o estado
    if (valorGuardado) {
      setValor(Number(valorGuardado));
    }
    if (historicoGuardado) {
      setHistorico(JSON.parse(historicoGuardado));
    }
  }, []);

  // 3. Função para mudar o valor (respeitando os limites e guardando tudo)
  const alterarValor = (novoValor: number) => {
    // Limite: não deixa passar de 10 nem ser menor que 0
    if (novoValor < 0 || novoValor > 10) return;

    setValor(novoValor);

    // Atualiza o histórico
    const novoHistorico = [...historico, novoValor];
    setHistorico(novoHistorico);

    // Guarda no localStorage para não perderes os dados se fechares a aba
    localStorage.setItem("contadorValor", String(novoValor));
    localStorage.setItem("contadorHistorico", JSON.stringify(novoHistorico));
  };

  // 4. Lógica das Cores
  let corDoTexto = "text-white"; // cor padrão
  if (valor >= 0 && valor <= 3) corDoTexto = "text-red-500";     // Vermelho
  else if (valor >= 4 && valor <= 7) corDoTexto = "text-yellow-400"; // Amarelo
  else if (valor >= 8 && valor <= 10) corDoTexto = "text-green-500"; // Verde

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-700 rounded-xl shadow-lg w-full max-w-md">
      
      {/* Mostra o número grande */}
      <h2 className={`text-6xl font-bold transition-colors ${corDoTexto}`}>
        {valor}
      </h2>

      {/* Botões */}
      <div className="flex gap-4">
        <button 
          onClick={() => alterarValor(valor - 1)} 
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
        >
          - Decrementar
        </button>
        
        <button 
          onClick={() => alterarValor(0)} 
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Reset
        </button>
        
        <button 
          onClick={() => alterarValor(valor + 1)} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
        >
          + Incrementar
        </button>
      </div>

      {/* Lista de Histórico */}
      <div className="w-full mt-4">
        <h3 className="text-xl font-semibold text-white mb-2">Histórico:</h3>
        <ul className="bg-gray-800 p-4 rounded-lg h-32 overflow-y-auto text-gray-300 space-y-1">
          {historico.length === 0 ? (
            <li>Ainda não há histórico.</li>
          ) : (
            historico.map((num, index) => (
              <li key={index} className="border-b border-gray-600 pb-1 last:border-0">
                O contador passou por: <span className="font-bold text-white">{num}</span>
              </li>
            ))
          )}
        </ul>
      </div>

    </div>
  );
}