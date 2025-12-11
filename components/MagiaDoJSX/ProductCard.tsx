import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/models/interfaces';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    product: Product;
    isOnCart?: boolean;
    onAddToCart?: (product: Product) => void;
    onRemoveFromCart?: (product: Product) => void;
}

export default function ProductCard({ 
    product, 
    isOnCart = false, 
    onAddToCart, 
    onRemoveFromCart 
}: ProductCardProps) {
  
  // O Cartão principal agora tem o fundo branco e sombra
  return (
    <div className="flex flex-col h-full group"> {/* Container principal flex */}
      <Card className="flex-grow flex flex-col hover:shadow-2xl transition-shadow duration-300 bg-white overflow-hidden border-0 rounded-2xl">
        
        {/* LINK PARA DETALHES */}
        <Link href={`/produtos/${product.id}`} className="cursor-pointer flex flex-col flex-grow">
          <CardHeader className="p-6 pb-2">
            <CardDescription className="text-blue-600 font-bold uppercase text-sm tracking-wider mb-1">
                {product.category}
            </CardDescription>
            <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors" title={product.title}>
                {product.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 pt-2 flex items-center justify-center flex-grow">
            <div className="relative w-full h-56"> {/* Aumentei a altura da imagem para h-56 */}
                <Image 
                    src={`https://deisishop.pythonanywhere.com${product.image}`} 
                    alt={product.title} 
                    fill 
                    className="object-contain hover:scale-105 transition-transform duration-500 p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
          </CardContent>
          
          {/* Preço dentro do cartão */}
          <div className="p-6 pt-0 mt-auto">
             <span className="text-2xl font-black text-gray-900">
                {Number(product.price).toFixed(2)} €
            </span>
          </div>
        </Link>
      </Card>

      {/* RODAPÉ (Footer) - FORA DO CARD PRINCIPAL */}
      <div className="mt-4 px-2"> {/* Margem superior e padding lateral */}
        {isOnCart ? (
            <Button 
                variant="destructive"
                className="w-full py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => onRemoveFromCart && onRemoveFromCart(product)}
            >
                Remover
            </Button>
        ) : (
            <Button 
                className="w-full py-6 text-lg font-bold bg-black text-white hover:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                onClick={() => onAddToCart && onAddToCart(product)}
            >
                Comprar Agora
            </Button>
        )}
      </div>
    </div>
  );
}