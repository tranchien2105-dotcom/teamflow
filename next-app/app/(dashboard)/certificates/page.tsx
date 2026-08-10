"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    deleteCertificate,
    getCertificates,
    type Certificate,
} from "@/services/certificate-service";
import CertificateForm from "@/components/certificate/CertificateForm";

export default function CertificatePage() {
    const [certificates, setCertificates] =
        useState<Certificate[]>([]);

    const [loading, setLoading] = useState(true);

    // Certificate ID từ Laravel $table->id() là number
    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    const [isFormOpen, setIsFormOpen] =
        useState(false);

    const [editingCertificate, setEditingCertificate] =
        useState<Certificate | null>(null);

    const [deleteTarget, setDeleteTarget] =
        useState<Certificate | null>(null);

    /*
     * Load certificates
     */
    async function loadCertificates() {
        try {
            setLoading(true);

            const data = await getCertificates();

            setCertificates(data);
        } catch (error) {
            console.error(
                "Failed to load certificates:",
                error
            );

            toast.error(
                "Failed to load certificates."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCertificates();
    }, []);

    /*
     * Add
     */
    const handleAdd = () => {
        setEditingCertificate(null);
        setIsFormOpen(true);
    };

    /*
     * Edit
     */
    const handleEdit = (
        certificate: Certificate
    ) => {
        setEditingCertificate(certificate);
        setIsFormOpen(true);
    };

    /*
     * Close form
     */
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingCertificate(null);
    };

    /*
     * Open delete confirmation
     */
    const handleDeleteClick = (
        certificate: Certificate
    ) => {
        setDeleteTarget(certificate);
    };

    /*
     * Close delete confirmation
     */
    const handleCloseDelete = () => {
        if (deletingId !== null) {
            return;
        }

        setDeleteTarget(null);
    };

    /*
     * Delete
     */
    const handleDelete = async () => {
        if (!deleteTarget) {
            return;
        }

        try {
            setDeletingId(deleteTarget.id);

            await deleteCertificate(
                deleteTarget.id
            );

            setCertificates((prev) =>
                prev.filter(
                    (certificate) =>
                        certificate.id !==
                        deleteTarget.id
                )
            );

            toast.success(
                "Certificate deleted successfully."
            );

            setDeleteTarget(null);
        } catch (error) {
            console.error(
                "Failed to delete certificate:",
                error
            );

            toast.error(
                "Failed to delete certificate. Please try again."
            );
        } finally {
            setDeletingId(null);
        }
    };

    /*
     * Loading
     */
    if (loading) {
        return (
            <div className="mx-auto w-full max-w-5xl space-y-8">
                <div>
                    <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />

                    <div className="mt-2 h-4 w-72 animate-pulse rounded-md bg-muted" />
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="
                                h-48
                                animate-pulse
                                rounded-xl
                                border
                                bg-white
                            "
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-5xl space-y-8">
            {/* Header */}
            <div
                className="
                    mt-5
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >
                <div>
                    <h1
                        className="
                            text-2xl
                            font-semibold
                            tracking-tight
                            text-gray-900
                        "
                    >
                        Certificates
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your certificates and professional credentials.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleAdd}
                    className="
                        inline-flex
                        h-10
                        items-center
                        justify-center
                        rounded-lg
                        bg-primary
                        px-4
                        text-sm
                        font-medium
                        text-primary-foreground
                        shadow-sm
                        transition-all
                        hover:bg-primary/90
                        hover:shadow
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary
                        focus:ring-offset-2
                    "
                >
                    + Add Certificate
                </button>
            </div>

            {/* Empty State */}
            {certificates.length === 0 ? (
                <div
                    className="
                        flex
                        min-h-[320px]
                        flex-col
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-dashed
                        bg-white
                        px-6
                        text-center
                    "
                >
                    <div
                        className="
                            mb-4
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-gray-100
                            text-xl
                        "
                    >
                        🏆
                    </div>

                    <h2 className="text-base font-semibold text-gray-900">
                        No certificates yet
                    </h2>

                    <p className="mt-1 max-w-sm text-sm text-gray-500">
                        Add your certificates and professional
                        credentials to showcase your experience.
                    </p>

                    <button
                        type="button"
                        onClick={handleAdd}
                        className="
                            mt-5
                            inline-flex
                            h-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            px-4
                            text-sm
                            font-medium
                            text-gray-700
                            shadow-sm
                            transition-all
                            hover:bg-gray-50
                            hover:text-gray-900
                            hover:shadow
                        "
                    >
                        Add Certificate
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {certificates.map(
                        (certificate) => (
                            <article
                                key={certificate.id}
                                className="
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-gray-200
                                    bg-white
                                    shadow-sm
                                    transition-all
                                    hover:border-gray-300
                                    hover:shadow-md
                                "
                            >
                                <div className="p-5">
                                    {/* Header */}
                                    <div
                                        className="
                                            flex
                                            flex-col
                                            gap-4
                                            sm:flex-row
                                            sm:items-start
                                            sm:justify-between
                                        "
                                    >
                                        <div className="min-w-0">
                                            <h2
                                                className="
                                                    text-lg
                                                    font-semibold
                                                    leading-6
                                                    text-gray-900
                                                "
                                            >
                                                {
                                                    certificate.name
                                                }
                                            </h2>

                                            <p
                                                className="
                                                    mt-1
                                                    text-sm
                                                    text-gray-500
                                                "
                                            >
                                                {
                                                    certificate.organization ||
                                                    "No organization provided"
                                                }
                                            </p>
                                        </div>

                                        {certificate.credential_id && (
                                            <span
                                                className="
                                                    inline-flex
                                                    shrink-0
                                                    rounded-full
                                                    border
                                                    border-gray-200
                                                    bg-gray-50
                                                    px-2.5
                                                    py-1
                                                    text-xs
                                                    font-medium
                                                    text-gray-600
                                                "
                                            >
                                                Credential
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    {certificate.description && (
                                        <p
                                            className="
                                                mt-4
                                                line-clamp-2
                                                text-sm
                                                leading-6
                                                text-gray-600
                                            "
                                        >
                                            {
                                                certificate.description
                                            }
                                        </p>
                                    )}

                                    {/* Meta */}
                                    <div
                                        className="
                                            mt-5
                                            flex
                                            flex-wrap
                                            items-center
                                            gap-x-5
                                            gap-y-2
                                            border-t
                                            border-gray-100
                                            pt-4
                                        "
                                    >
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <span>📅</span>

                                            <span>
                                                {certificate.issue_date
                                                    ? `Issued ${new Date(
                                                          certificate.issue_date
                                                      ).toLocaleDateString()}`
                                                    : "Issue date not provided"}
                                            </span>
                                        </div>

                                        {certificate.credential_id && (
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <span>🔑</span>

                                                <span>
                                                    {
                                                        certificate.credential_id
                                                    }
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Credential URL */}
                                    {certificate.credential_url && (
                                        <div
                                            className="
                                                mt-4
                                                border-t
                                                border-gray-100
                                                pt-4
                                            "
                                        >
                                            <a
                                                href={
                                                    certificate.credential_url
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
                                                    text-sm
                                                    font-medium
                                                    text-primary
                                                    hover:underline
                                                "
                                            >
                                                View Credential →
                                            </a>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div
                                        className="
                                            mt-5
                                            flex
                                            items-center
                                            justify-end
                                            gap-2
                                            border-t
                                            border-gray-100
                                            pt-4
                                        "
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(
                                                    certificate
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                certificate.id
                                            }
                                            className="
                                                rounded-md
                                                border
                                                border-gray-200
                                                bg-white
                                                px-3
                                                py-1.5
                                                text-sm
                                                font-medium
                                                text-gray-700
                                                shadow-sm
                                                transition-all
                                                hover:bg-gray-50
                                                hover:text-gray-900
                                                hover:shadow
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteClick(
                                                    certificate
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                certificate.id
                                            }
                                            className="
                                                rounded-md
                                                border
                                                border-red-200
                                                bg-white
                                                px-3
                                                py-1.5
                                                text-sm
                                                font-medium
                                                text-red-600
                                                shadow-sm
                                                transition-all
                                                hover:bg-red-50
                                                hover:text-red-700
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >
                                            {deletingId ===
                                            certificate.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        )
                    )}
                </div>
            )}

            {/* Add / Edit Form */}
            <CertificateForm
                open={isFormOpen}
                certificate={editingCertificate}
                onClose={handleCloseForm}
                onSuccess={loadCertificates}
            />

            {/* Delete Confirmation */}
            {deleteTarget && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[60]
                        flex
                        items-center
                        justify-center
                        bg-black/40
                        px-4
                    "
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                                event.currentTarget &&
                            deletingId === null
                        ) {
                            handleCloseDelete();
                        }
                    }}
                >
                    <div
                        className="
                            w-full
                            max-w-md
                            rounded-xl
                            bg-white
                            p-6
                            shadow-xl
                        "
                    >
                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                bg-red-50
                                text-lg
                            "
                        >
                            ⚠️
                        </div>

                        <h2
                            className="
                                mt-4
                                text-lg
                                font-semibold
                                text-gray-900
                            "
                        >
                            Delete certificate?
                        </h2>

                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-gray-500
                            "
                        >
                            Are you sure you want to
                            delete{" "}
                            <span className="font-medium text-gray-700">
                                {deleteTarget.name}
                            </span>
                            ? This action cannot be undone.
                        </p>

                        <div
                            className="
                                mt-6
                                flex
                                justify-end
                                gap-3
                            "
                        >
                            <button
                                type="button"
                                onClick={handleCloseDelete}
                                disabled={
                                    deletingId !== null
                                }
                                className="
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    hover:bg-gray-50
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={
                                    deletingId !== null
                                }
                                className="
                                    rounded-lg
                                    bg-red-600
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    text-white
                                    shadow-sm
                                    hover:bg-red-700
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                {deletingId !== null
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
