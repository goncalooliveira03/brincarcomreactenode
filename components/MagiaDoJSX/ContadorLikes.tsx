"use client"; // Necessário porque usa interatividade (useState, useEffect)

import React, { useState, useEffect } from 'react';

interface ContadorLikesProps {
    title: string;
}

export default function ContadorLikes({ title }: ContadorLikesProps) {
    const [likes, setLikes] = useState(0);

    // Carregar os likes guardados quando o componente inicia
    useEffect(() => {

        const valorGuardado = localStorage.getItem(`likes-${title}`);
        if (valorGuardado) {
            setLikes(parseInt(valorGuardado));
        }

    }, [title]);

    const incrementarLike = () => {
        const novoValor = likes + 1;
        setLikes(novoValor);
        // Guardar no localStorage para não se perder ao atualizar a página
        localStorage.setItem(`likes-${title}`, novoValor.toString());
    }

    return (
        <button
            onClick={incrementarLike}
            className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full transition-colors font-medium text-sm border border-blue-200"
        >
            <span>👍</span>
            <span>{likes} Likes</span>
        </button>
    )
}