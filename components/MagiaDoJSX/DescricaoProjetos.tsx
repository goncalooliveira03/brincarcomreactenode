// components/DescricaoProjetos.tsx
import React from "react";
import Projeto from "./Projeto";

export default function DescricaoProjetos() {
  return (
    <section>
      <h2>Os meus projetos</h2>

      <p>
        Ao longo da disciplina desenvolvi vários projetos utilizando HTML, CSS,
        JavaScript, React e Next.js. Aqui estão alguns exemplos:
      </p>

      <Projeto
        nome="Loja DEISI Shop"
        url="https://goncalooliveira03.github.io/lab7/index.html"
      />

      <Projeto
        nome="Site Interativo com JavaScript"
        url="https://goncalooliveira03.github.io/lab4/index.html"
      />

      <p style={{ marginTop: "1rem" }}>
        Podes ver todos os meus projetos na minha página de GitHub:{" "}
        <a
          href="https://github.com/goncalooliveira03"
          target="_blank"
        >
          Visitar GitHub
        </a>
      </p>
    </section>
  );
}

