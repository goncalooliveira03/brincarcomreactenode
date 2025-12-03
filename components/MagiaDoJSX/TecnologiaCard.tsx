import React from 'react';
import Image from 'next/image';
import ContadorLikes from './ContadorLikes';

interface TecnologiaCardProps {
    title: string;
    image: string;
    description: string;
    rating: number;
}

export default function TecnologiaCard(props: TecnologiaCardProps) {
    return (
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition-shadow">
            <Image
                src={`/tecnologias/${props.image}`}
                alt={`Logotipo de ${props.title}`}
                width={100}
                height={100}
                className="mb-4"
            />

            <h3 className="text-xl font-bold text-gray-800 mb-2">
                {props.title}
            </h3>

            <p className="text-sm text-gray-600 mb-4 text-center">
                {props.description}
            </p>

            <div className="flex flex-col items-center gap-2 w-full border-t pt-4 mt-auto">
                <p className="font-semibold text-yellow-500 text-lg tracking-widest">
                    {'⭐'.repeat(props.rating)}
                </p>
                
                {}
                <ContadorLikes title={props.title} />
            </div>
        </div>
    );
}