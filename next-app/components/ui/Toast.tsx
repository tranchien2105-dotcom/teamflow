"use client";

import { Toaster } from "sonner";

export default function Toast() {
    return (
        <Toaster
            position="top-right"
            richColors
            closeButton
        />
    );
}