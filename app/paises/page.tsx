"use client";

import React, { useState, useEffect } from 'react';
import { Country } from '@/models/interfaces';
import PaisCard from '@/components/MagiaDoJSX/Pais';

export default function PaisesPage() {
    // Estados
    const [paises, setPaises] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Estados dos Filtros
    const [busca, setBusca] = useState("");
    const [ordem, setOrdem] = useState("desc");

    // Fetch dos dados ao carregar a página
    useEffect(() => {
        const fetchPaises = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/independent?status=true&fields=name,area,population");
                const dados = await res.json();
                setPaises(dados);
            } catch (error) {
                console.error("Erro ao achar os países", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaises();
    }, []);

    // Primeiro filtra-se
    let paisesFiltrados = paises.filter((pais) => 
        pais.name.common.toLowerCase().includes(busca.toLowerCase())
    );

    // Depois ordena-se a lista já filtrada
    paisesFiltrados.sort((a, b) => {
        if (ordem === "desc") {
            return b.population - a.population; // Do maior para o menor
        } else {
            return a.population - b.population; // Do menor para o maior
        }
    });

    return (
        <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            
            <h1 className="text-4xl font-bold text-center mb-8">
                Explorador de Países
            </h1>

            {/* Área de Controlos (Input e Select) */}
            <div className="flex flex-col md:flex-row gap-4 justify-center max-w-4xl mx-auto mb-10 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                
                {/* Input de Pesquisa */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold mb-1">Filtrar por nome:</label>
                    <input 
                        type="text"
                        placeholder="Ex: Portugal Siuuuu"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Seletor de Ordenação */}
                <div className="flex flex-col w-full md:w-64">
                    <label className="text-sm font-semibold mb-1">Ordenar por População:</label>
                    <select 
                        value={ordem} 
                        onChange={(e) => setOrdem(e.target.value)}
                        className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="desc">Mais Populosos </option>
                        <option value="asc">Menos Populosos </option>
                    </select>
                </div>
            </div>

            {/* Lista de Resultados */}
            {loading ? (
                <p className="text-center text-xl animate-pulse">A carregar os dados...</p>
            ) : (
                <>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {paisesFiltrados.map((pais, index) => (
                            <PaisCard key={index} dados={pais} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}