export interface Product {
    id: number;
    name: string;
    price: number;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Laptop",
        price: 25000000,
    },
    {
        id: 2,
        name: "Mouse",
        price: 500000,
    },
    {
        id: 3,
        name: "Keyboard",
        price: 1200000,
    },
    {
        id: 4,
        name: "Monitor",
        price: 8000000,
    },
];