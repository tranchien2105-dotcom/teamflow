"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/product";

export default function DashboardPage() {

    return (
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
            <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
            <div className="space-y-6">
                <p>Welcome to the dashboard!</p>
            </div>
        </div>
    );
}