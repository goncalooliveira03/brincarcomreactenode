import tecnologias from '@/app/data/tecnologias.json';
import TecnologiaCard from '@/components/MagiaDoJSX/TecnologiaCard';

export default function TecnologiasPage() {
  return (
    <div className="min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-300 text-center">
        Tecnologias Aprendidas
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {tecnologias.map((tec, i) => (
            // Passamos todas as propriedades do objeto 'tec' para o componente
            <TecnologiaCard 
                key={i} 
                title={tec.title}
                image={tec.image}
                description={tec.description}
                rating={tec.rating}
            />
        ))}
      </div>
    </div>
  );
}