import React from 'react';
import Image from 'next/image';
import ContadorLikes from './ContadorLikes';

interface TecnologiaDetailsProps {
    title: string;
    image: string;
    description: string;
    rating: number;
}

export default function TecnologiaDetailsCard(props: TecnologiaDetailsProps) {
    return (
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-100">
            <div className="bg-gray-50 p-8 flex items-center justify-center md:w-1/3">
                <Image
                    src={`/tecnologias/${props.image}`}
                    alt={props.title}
                    width={150}
                    height={150}
                    className="drop-shadow-md"
                />
            </div>
            
            <div className="p-8 md:w-2/3 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">{props.title}</h1>
                    <span className="text-yellow-400 text-2xl" title={`${props.rating} estrelas`}>
                        {'⭐'.repeat(props.rating)}
                    </span>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {props.description}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                        Avaliação:
                    </span>
                    <ContadorLikes title={props.title} />
                </div>
            </div>
        </div>
    )
}