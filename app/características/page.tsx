import React from 'react'

export default function page() {
    
    const caracteristicas = [
        'JSX, sintaxe que mistura HTML e JS.',
        'Componentes, funções que retornam JSX.',
        'Componentes Reutilizáveis e Modulares.',
        'Roteamento Automático e APIs.',
        'Hooks: useState, useEffect e useSWR.',
        'Renderização Rápida e SEO Friendly.',
        'TypeScript Seguro e Escalável.',
        'Comunidade Ativa e Popularidade.'
    ]

    function clickar (){
        alert("Aprender React e Next.js é top!")
    }

  return (
    <div>
    <h2>Características do React e Next.js</h2>
    <ul>
        {caracteristicas.map((caracteristicas, i) => {
            return <li key={i}>{caracteristicas}</li>
        })}
    </ul>

    <button onClick={clickar}>Carrega aqui</button>
    </div>
  )
}
