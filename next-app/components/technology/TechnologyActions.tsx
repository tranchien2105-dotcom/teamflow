"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface TechnologyActionsProps {
    technologyId: string;
}

export default function TechnologyActions({
    technologyId,
}: TechnologyActionsProps) {
    const router = useRouter();

    const [isDeleting, setIsDeleting] =
        useState(false);

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this technology?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            const response = await fetch(
                `/api/technologies/${technologyId}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ??
                    "Failed to delete technology."
                );
            }

            toast.success(
                "Technology deleted successfully."
            );

            router.refresh();
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong.";

            toast.error(message);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {isDeleting ? "Deleting..." : "Delete"}
        </button>
    );
}