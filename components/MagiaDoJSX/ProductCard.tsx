import React from 'react';
import Image from 'next/image';
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
    onAddToCart?: (product: Product) => void;      // Função para adicionar
    onRemoveFromCart?: (product: Product) => void; // Função para remover
}

export default function ProductCard({ 
    product, 
    isOnCart = false, 
    onAddToCart, 
    onRemoveFromCart 
}: ProductCardProps) {
  
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4">
        <CardTitle className="text-lg line-clamp-1" title={product.title}>
            {product.title}
        </CardTitle>
        <CardDescription className="capitalize text-blue-600 font-semibold">
            {product.category}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow p-4 pt-0 flex items-center justify-center bg-white rounded-md mx-4 mb-2">
        <div className="relative w-full h-48">
            <Image 
                src={product.image} 
                alt={product.title} 
                fill 
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center border-t bg-gray-50 rounded-b-xl">
        <span className="text-xl font-bold text-gray-900">
            {product.price.toFixed(2)} €
        </span>
        
        {/* Renderização Condicional dos Botões */}
        {isOnCart ? (
            <Button 
                variant="destructive" 
                onClick={() => onRemoveFromCart && onRemoveFromCart(product)}
            >
                Remover
            </Button>
        ) : (
            <Button 
                variant="default"
                onClick={() => onAddToCart && onAddToCart(product)}
            >
                Comprar
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}