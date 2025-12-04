export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface CompraRequest {
    products: number[];
    student: boolean;
    coupon: string;
    name: string;    
}

export interface CompraResponse {
    totalCost: string;
    reference: string;
    message: string;
}

export interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}