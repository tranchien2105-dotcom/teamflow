"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
    createCertificate,
    updateCertificate,
    type Certificate,
    type CreateCertificateData,
} from "@/services/certificate-service";

interface CertificateFormProps {
    open: boolean;
    certificate: Certificate | null;
    onClose: () => void;
    onSuccess: () => void | Promise<void>;
}

interface CertificateFormData {
    name: string;
    organization: string;
    credential_id: string;
    issue_date: string;
    credential_url: string;
    description: string;
}

const initialForm: CertificateFormData = {
    name: "",
    organization: "",
    credential_id: "",
    issue_date: "",
    credential_url: "",
    description: "",
};

export default function CertificateForm({
    open,
    certificate,
    onClose,
    onSuccess,
}: CertificateFormProps) {
    const [form, setForm] =
        useState<CertificateFormData>(
            initialForm
        );

    const [saving, setSaving] =
        useState(false);

    const isEditing = Boolean(certificate);

    /*
     * Load data when editing
     */
    useEffect(() => {
        if (!open) {
            return;
        }

        if (certificate) {
            setForm({
                name: certificate.name ?? "",
                organization:
                    certificate.organization ?? "",
                credential_id:
                    certificate.credential_id ?? "",
                issue_date:
                    certificate.issue_date
                        ? certificate.issue_date.slice(
                              0,
                              10
                          )
                        : "",
                credential_url:
                    certificate.credential_url ?? "",
                description:
                    certificate.description ?? "",
            });
        } else {
            setForm(initialForm);
        }
    }, [open, certificate]);

    /*
     * Close with reset
     */
    const handleClose = () => {
        if (saving) {
            return;
        }

        setForm(initialForm);

        onClose();
    };

    /*
     * Change field
     */
    const handleChange = (
        field: keyof CertificateFormData,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    /*
     * Submit
     */
    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!form.name.trim()) {
            toast.error(
                "Certificate name is required."
            );

            return;
        }

        try {
            setSaving(true);

            const body: CreateCertificateData = {
                name: form.name.trim(),

                organization:
                    form.organization.trim() ||
                    undefined,

                credential_id:
                    form.credential_id.trim() ||
                    undefined,

                issue_date:
                    form.issue_date || null,

                credential_url:
                    form.credential_url.trim() ||
                    undefined,

                description:
                    form.description.trim() ||
                    undefined,
            };

            if (
                isEditing &&
                certificate
            ) {
                await updateCertificate(
                    certificate.id,
                    body
                );

                toast.success(
                    "Certificate updated successfully."
                );
            } else {
                await createCertificate(body);

                toast.success(
                    "Certificate created successfully."
                );
            }

            await onSuccess();

            handleClose();
        } catch (error) {
            console.error(
                "Failed to save certificate:",
                error
            );

            toast.error(
                isEditing
                    ? "Failed to update certificate. Please try again."
                    : "Failed to create certificate. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    if (!open) {
        return null;
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                px-4
                py-6
            "
            onMouseDown={(event) => {
                if (
                    event.target ===
                        event.currentTarget &&
                    !saving
                ) {
                    handleClose();
                }
            }}
        >
            <div
                className="
                    flex
                    max-h-[90vh]
                    w-full
                    max-w-2xl
                    flex-col
                    overflow-hidden
                    rounded-xl
                    bg-white
                    shadow-xl
                "
            >
                {/* Header */}
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-gray-100
                        px-6
                        py-4
                    "
                >
                    <div>
                        <h2
                            className="
                                text-lg
                                font-semibold
                                text-gray-900
                            "
                        >
                            {isEditing
                                ? "Edit Certificate"
                                : "Add Certificate"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {isEditing
                                ? "Update your certificate."
                                : "Add a new certificate to your profile."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={saving}
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-md
                            text-lg
                            text-gray-400
                            transition-colors
                            hover:bg-gray-100
                            hover:text-gray-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="
                        overflow-y-auto
                        px-6
                        py-5
                    "
                >
                    <div className="space-y-5">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="certificate-name"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Certificate Name
                            </label>

                            <input
                                id="certificate-name"
                                type="text"
                                value={form.name}
                                onChange={(event) =>
                                    handleChange(
                                        "name",
                                        event.target.value
                                    )
                                }
                                placeholder="e.g. AWS Certified Developer"
                                disabled={saving}
                                className="
                                    mt-1.5
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2.5
                                    text-sm
                                    text-gray-900
                                    outline-none
                                    transition
                                    placeholder:text-gray-400
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-50
                                "
                            />
                        </div>

                        {/* Organization */}
                        <div>
                            <label
                                htmlFor="certificate-organization"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Organization
                            </label>

                            <input
                                id="certificate-organization"
                                type="text"
                                value={
                                    form.organization
                                }
                                onChange={(event) =>
                                    handleChange(
                                        "organization",
                                        event.target.value
                                    )
                                }
                                placeholder="e.g. Amazon Web Services"
                                disabled={saving}
                                className="
                                    mt-1.5
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2.5
                                    text-sm
                                    text-gray-900
                                    outline-none
                                    transition
                                    placeholder:text-gray-400
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-50
                                "
                            />
                        </div>

                        {/* Credential ID */}
                        <div>
                            <label
                                htmlFor="certificate-credential-id"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Credential ID
                            </label>

                            <input
                                id="certificate-credential-id"
                                type="text"
                                value={
                                    form.credential_id
                                }
                                onChange={(event) =>
                                    handleChange(
                                        "credential_id",
                                        event.target.value
                                    )
                                }
                                placeholder="e.g. ABC123XYZ"
                                disabled={saving}
                                className="
                                    mt-1.5
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2.5
                                    text-sm
                                    text-gray-900
                                    outline-none
                                    transition
                                    placeholder:text-gray-400
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-50
                                "
                            />
                        </div>

                        {/* Issue Date */}
                        <div>
                            <label
                                htmlFor="certificate-issue-date"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Issue Date
                            </label>

                            <input
                                id="certificate-issue-date"
                                type="date"
                                value={
                                    form.issue_date
                                }
                                onChange={(event) =>
                                    handleChange(
                                        "issue_date",
                                        event.target.value
                                    )
                                }
                                disabled={saving}
                                className="
                                    mt-1.5
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2.5
                                    text-sm
                                    text-gray-900
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-50
                                "
                            />
                        </div>

                        {/* Credential URL */}
                        <div>
                            <label
                                htmlFor="certificate-credential-url"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Credential URL
                            </label>

                            <input
                                id="certificate-credential-url"
                                type="url"
                                value={
                                    form.credential_url
                                }
                                onChange={(event) =>
                                    handleChange(
                                        "credential_url",
                                        event.target.value
                                    )
                                }
                                placeholder="https://..."
                                disabled={saving}
                                className="
                                    mt-1.5
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2.5
                                    text-sm
                                    text-gray-900
                                    outline-none
                                    transition
                                    placeholder:text-gray-400
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-50
                                "
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="certificate-description"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Description
                            </label>

                            <textarea
                                id="certificate-description"
                                value={
                                    form.description
                                }
                                onChange={(event) =>
                                    handleChange(
                                        "description",
                                        event.target.value
                                    )
                                }
                                placeholder="Describe what you learned or achieved..."
                                rows={5}
                                disabled={saving}
                                className="
                                    mt-1.5
                                    block
                                    w-full
                                    resize-y
                                    rounded-lg
                                    border
                                    border-gray-200
                                    px-3
                                    py-2.5
                                    text-sm
                                    leading-6
                                    text-gray-900
                                    outline-none
                                    transition
                                    placeholder:text-gray-400
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-50
                                "
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div
                        className="
                            mt-6
                            flex
                            justify-end
                            gap-3
                            border-t
                            border-gray-100
                            pt-5
                        "
                    >
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={saving}
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
                                transition-colors
                                hover:bg-gray-50
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="
                                inline-flex
                                min-w-28
                                items-center
                                justify-center
                                rounded-lg
                                bg-primary
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-primary-foreground
                                shadow-sm
                                transition-all
                                hover:bg-primary/90
                                hover:shadow
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {saving
                                ? "Saving..."
                                : isEditing
                                  ? "Update"
                                  : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}