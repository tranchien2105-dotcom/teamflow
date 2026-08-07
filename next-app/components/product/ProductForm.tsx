"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Category, getCategories } from "@/lib/category";
import { createProduct, getProduct, updateProduct } from "@/services/product.service";

type ProductFormProps = {
    mode: "create" | "edit";
};

export default function ProductForm({ mode }: ProductFormProps) {
    const router = useRouter();
    const params = useParams() as { id?: string };
    const id = params.id;
    const productId = useMemo(() => {
        if (!id || Array.isArray(id)) return undefined;
        const parsed = Number(id);
        return Number.isNaN(parsed) ? undefined : parsed;
    }, [id]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [status, setStatus] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [productLoading, setProductLoading] = useState(false);

    useEffect(() => {
        async function loadCategories() {
            setCategoryLoading(true);
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories:", error);
            } finally {
                setCategoryLoading(false);
            }
        }

        loadCategories();
    }, []);

    useEffect(() => {
        if (mode !== "edit" || productId === undefined) return;
        const productIdNumber = productId;

        async function loadProduct() {
            setProductLoading(true);
            try {
                const data = await getProduct(productIdNumber);
                setName(data.name || "");
                setPrice(data.price?.toString() ?? "");
                setStock(data.stock?.toString() ?? "");
                setDescription(data.description || "");
                setCategoryId(data.category_id?.toString() ?? "");
                setStatus(Boolean(data.status));
            } catch (error) {
                console.error("Failed to load product:", error);
            } finally {
                setProductLoading(false);
            }
        }

        loadProduct();
    }, [mode, productId]);

    async function handleSubmit() {
        if (!categoryId) {
            alert("Please select a category.");
            return;
        }

        if (!name.trim()) {
            alert("Product name is required.");
            return;
        }

        const parsedPrice = Number(price);
        if (!price || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
            alert("Price must be a valid number greater than 0.");
            return;
        }

        const parsedStock = stock ? Number(stock) : 0;
        if (stock && (Number.isNaN(parsedStock) || parsedStock < 0)) {
            alert("Stock must be a valid number.");
            return;
        }

        if (mode === "edit" && productId === undefined) {
            alert("Invalid product ID.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: name.trim(),
                price: parsedPrice,
                stock: parsedStock,
                description: description.trim(),
                category_id: Number(categoryId),
                status,
            };

            if (mode === "create") {
                await createProduct(payload);
            } else if (productId !== undefined) {
                await updateProduct(productId, payload);
            } else {
                throw new Error("Invalid product ID for update.");
            }

            router.push("/products");
        } catch (error: any) {
            console.error("Product save failed:", error?.response?.data || error);
            alert("Could not save product. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
                <h1 className="mb-8 text-3xl font-bold">
                    {mode === "create" ? "Create Product" : "Edit Product"}
                </h1>

                <div className="space-y-6">
                    <div>
                        <label className="mb-2 block font-medium">Category</label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                            disabled={categoryLoading}
                        >
                            <option value="">-- Select Category --</option>
                            {categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {categoryLoading && (
                            <p className="mt-2 text-sm text-slate-500">Loading categories...</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">Product Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter product name"
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block font-medium">Price</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block font-medium">Stock</label>
                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">Description</label>
                        <textarea
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">Status</label>
                        <select
                            value={status ? "1" : "0"}
                            onChange={(e) => setStatus(e.target.value === "1")}
                            className="w-full rounded-lg border px-4 py-3"
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-lg border px-6 py-3 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading || productLoading}
                            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading
                                ? "Saving..."
                                : mode === "create"
                                ? "Create Product"
                                : "Update Product"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
