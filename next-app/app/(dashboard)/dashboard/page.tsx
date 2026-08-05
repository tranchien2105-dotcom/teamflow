"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/product";

export default function DashboardPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        async function load() {
            const data = await getProducts();

            setProducts(data);
        }

        load();

    }, []);

    return (
        <>
            {products.map((item: any) => (
                <p key={item.id}>
                    {item.name}
                </p>
            ))}
        </>
    );
}