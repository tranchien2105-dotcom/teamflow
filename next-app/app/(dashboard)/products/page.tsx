"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/product";

interface Product {
    id: number;
    name: string;
    price?: number;
}

interface PaginationResponse {
    data: Product[];
    current_page: number;
    last_page: number;
    total: number;
}

export default function ProductPage() {
    const [pagination, setPagination] = useState<PaginationResponse | null>(null);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [loading, setLoading] = useState(false);

    async function loadProducts() {
        setLoading(true);

        try {
            const data = await getProducts({
                page,
                per_page: 10,
                search,
                sort_by: sortBy,
            });

            setPagination(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProducts();
    }, [page, sortBy]);

    const handleSearch = () => {
        setPage(1);
        loadProducts();
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Delete this product?")) return;

        console.log("Delete:", id);

        // await deleteProduct(id);
        // await loadProducts();
    };

    return (
        <div className="min-h-screen bg-slate-100 p-8">

            <div className="mx-auto max-w-7xl">

                {/* Header */}

                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Product Management
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Total Products : {pagination?.total ?? 0}
                        </p>

                    </div>

                    <Link
                        href="/products/create"
                        className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                    >
                        + Add Product
                    </Link>

                </div>

                {/* Search */}

                <div className="mb-6 flex gap-3">

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search product..."
                        className="flex-1 rounded-lg border px-4 py-2"
                    />

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border px-4 py-2"
                    >
                        <option value="">Newest</option>
                        <option value="name_asc">Name ASC</option>
                        <option value="name_desc">Name DESC</option>
                        <option value="price_asc">Price ASC</option>
                        <option value="price_desc">Price DESC</option>
                    </select>

                    <button
                        onClick={handleSearch}
                        className="rounded-lg bg-green-600 px-5 text-white hover:bg-green-700"
                    >
                        Search
                    </button>

                </div>

                {/* Table */}

                <div className="overflow-hidden rounded-xl bg-white shadow">

                    <table className="w-full">

                        <thead className="bg-slate-800 text-white">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    ID
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Product
                                </th>

                                <th className="px-6 py-4 text-right">
                                    Price
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading && (

                                <tr>

                                    <td
                                        colSpan={4}
                                        className="py-10 text-center"
                                    >
                                        Loading...
                                    </td>

                                </tr>

                            )}

                            {!loading &&
                                pagination?.data.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="border-b hover:bg-slate-50"
                                    >

                                        <td className="px-6 py-4">
                                            #{item.id}
                                        </td>

                                        <td className="px-6 py-4 font-medium">
                                            {item.name}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            {item.price
                                                ? item.price.toLocaleString("vi-VN") + " ₫"
                                                : "-"}
                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex justify-center gap-2">

                                                <Link
                                                    href={`/products/${item.id}/edit`}
                                                    className="rounded bg-yellow-500 px-4 py-2 text-sm text-white hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                        </tbody>

                    </table>

                </div>

                {/* Pagination */}

                <div className="mt-6 flex items-center justify-between">

                    <div>

                        Page {pagination?.current_page ?? 1} / {pagination?.last_page ?? 1}

                    </div>

                    <div className="flex gap-2">

                        <button
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                            className="rounded border px-4 py-2 disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <button
                            disabled={page === pagination?.last_page}
                            onClick={() => setPage((prev) => prev + 1)}
                            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}