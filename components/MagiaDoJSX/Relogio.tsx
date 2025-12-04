"use client";

import React, { useState, useEffect } from "react";

export default function Relogio() {
  // Estado para guardar a hora atual
  const [hora, setHora] = useState<string>("");

  useEffect(() => {
    
    const atualizarTempo = () => {
      const agora = new Date();
      // Formata a hora como HH:MM:SS
      setHora(agora.toLocaleTimeString("pt-PT"));
    };

    atualizarTempo();

  }, []);

  return (
    <div className="mt-2 font-mono text-sm bg-gray-900 text-green-400 p-2 rounded border border-gray-700 shadow-sm inline-block">
      {hora}
    </div>
  );
}