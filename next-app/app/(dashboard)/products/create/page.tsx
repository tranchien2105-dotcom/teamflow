"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/product";
import { Category, getCategories } from "@/lib/category";

export default function CreateProductPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [status, setStatus] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await getCategories();

                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        }

        loadCategories();
    }, []);

    async function handleSubmit() {
        if (!categoryId) {
            alert("Please select category");
            return;
        }

        if (!name.trim()) {
            alert("Product name is required");
            return;
        }

        if (!price || Number(price) <= 0) {
            alert("Price must be greater than 0");
            return;
        }

        setLoading(true);
        try {
            await createProduct({
                name,
                price: parseFloat(price),
                stock: parseInt(stock),
                description,
                category_id: parseInt(categoryId),
                status,
            });

            router.push("/products");
        } catch (err: any) {
            console.log(err.response.data);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

                <h1 className="mb-8 text-3xl font-bold">
                    Create Product
                </h1>

                <div className="space-y-6">

                    {/* Category */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Category
                        </label>

                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                        >

                            <option value="">
                                -- Select Category --
                            </option>

                            {categories.map((item) => (

                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </option>

                            ))}

                        </select>
                    </div>

                    {/* Name */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Product Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter product name"
                        />
                    </div>

                    {/* Price */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Price
                        </label>

                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                            placeholder="0"
                        />
                    </div>

                    {/* Stock */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Stock
                        </label>

                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                            placeholder="0"
                        />
                    </div>

                    {/* Description */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Status */}

                    <div>
                        <label className="mb-2 block font-medium">
                            Status
                        </label>

                        <select
                            value={status ? "1" : "0"}
                            onChange={(e) => setStatus(e.target.value === "1")}
                            className="w-full rounded-lg border px-4 py-3"
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    {/* Button */}

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-lg border px-6 py-3 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Product"}
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}