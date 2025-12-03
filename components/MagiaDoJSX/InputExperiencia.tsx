"use client";

import React, { useState } from "react";

export default function InputExperiencia() {
  // Input de Texto
  const [texto, setTexto] = useState("");

  // Seletor
  const [curso, setCurso] = useState("React");
  const opcoes = ["HTML", "CSS", "JavaScript", "React", "Next.js"];

  // Lista de Tarefas
  const [tarefas, setTarefas] = useState<{ id: number; text: string }[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  
  // Estados para controlar a edição
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [textoEditado, setTextoEditado] = useState("");

  // Função para ADICIONAR
  const adicionarTarefa = () => {
    if (novaTarefa.trim() === "") return; // Não adiciona se estiver vazio
    
    const nova = { id: Date.now(), text: novaTarefa };
    setTarefas([...tarefas, nova]);
    setNovaTarefa(""); // Limpar o input
  };

  // Função para APAGAR
  const apagarTarefa = (id: number) => {
    // Mantém apenas as tarefas cujo ID é diferente do que queremos apagar
    const listaAtualizada = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(listaAtualizada);
  };

  // Função para COMEÇAR A EDITAR
  const iniciarEdicao = (id: number, textoAtual: string) => {
    setEditandoId(id);
    setTextoEditado(textoAtual);
  };

  // Função para SALVAR A EDIÇÃO
  const salvarEdicao = (id: number) => {
    const listaAtualizada = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, text: textoEditado };
      }
      return tarefa;
    });
    setTarefas(listaAtualizada);
    setEditandoId(null);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-md text-gray-800">
      
      {/* 1. Input de Texto Espelho */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">1. Input Espelho</h3>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escreve algo aqui..."
          className="border p-2 rounded w-full mb-2 bg-gray-50"
        />
        <p className="text-blue-600 font-semibold">Digitaste: {texto}</p>
      </div>

      {/* 2. Seletor de Tecnologias */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">2. Escolhe a Tecnologia</h3>
        <select
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          className="border p-2 rounded w-full bg-gray-50"
        >
          {opcoes.map((opcao, index) => (
            <option key={index} value={opcao}>
              {opcao}
            </option>
          ))}
        </select>
        <p className="mt-2">
          Selecionaste: <span className="font-bold text-green-600">{curso}</span>
        </p>
      </div>

      {/* 3. Lista de Tarefas */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">3. Lista de Tarefas</h3>
        
        {/* Input para nova tarefa */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Nova tarefa..."
            className="border p-2 rounded w-full bg-gray-50"
          />
          <button
            onClick={adicionarTarefa}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Adicionar
          </button>
        </div>

        {/* Lista */}
        <ul className="space-y-2">
          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id}
              className="flex items-center justify-between bg-gray-100 p-2 rounded border"
            >
              {editandoId === tarefa.id ? (

                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={textoEditado}
                    onChange={(e) => setTextoEditado(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                  <button onClick={() => salvarEdicao(tarefa.id)} className="text-green-600 font-bold">✔</button>
                </div>
              ) : (
                // MODO VISUALIZAÇÃO
                <>
                  <span>{tarefa.text}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => iniciarEdicao(tarefa.id, tarefa.text)}
                      className="text-yellow-600 hover:text-yellow-700 text-sm font-semibold"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => apagarTarefa(tarefa.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      X
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        {tarefas.length === 0 && <p className="text-gray-400 text-sm mt-2 text-center">Nenhuma tarefa na lista.</p>}
      </div>
    </div>
  );
}