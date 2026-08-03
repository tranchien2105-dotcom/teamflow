"use client" // Client Component

import { useState, useEffect } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
}

export default function DashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                const result = await response.json();
                console.log("Fetched products:", result.data);
                setProducts(result.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price.toLocaleString()} VND
                    </li>
                ))}
            </ul>
        </div>
    );

}