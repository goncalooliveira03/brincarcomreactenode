import React from "react";

interface ProjetoProps {
  nome: string;
  url: string;
}

export default function Projeto({ nome, url }: ProjetoProps) {
  return (
    <p>
      Projeto:{" "}
      <a
        href={url}
        target="_blank"
      >
        {nome}
      </a>
    </p>
  );
}

