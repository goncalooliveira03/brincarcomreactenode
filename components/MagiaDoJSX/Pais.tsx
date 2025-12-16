import React from 'react';
import { Country } from '@/models/interfaces';

interface PaisCard {
    dados: Country;
}

export default function PaisCard({ dados }: PaisCard) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 flex flex-col gap-2">
            
            {/* Nome do País */}
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {dados.name.common}
            </h2>

            {/* Detalhes do País */}
            <div className="space-y-1 text-gray-700 dark:text-gray-300">
                <p className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-semibold">Área:</span>
                    <span>{dados.area.toLocaleString()} km²</span>
                </p>
                <p className="flex justify-between pt-1">
                    <span className="font-semibold">População:</span>
                    <span>{dados.population.toLocaleString()} hab.</span>
                </p>
            </div>
        </div>
    );
}