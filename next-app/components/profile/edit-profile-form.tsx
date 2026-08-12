"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { profileService } from "@/services/profile.service";
import type { Profile } from "@/types/profile";

interface EditProfileFormProps {
    profile: Profile | null;
    onCancel: () => void;
    onSuccess: (updatedProfile: Profile) => void;
}

type FormData = {
    full_name: string;
    title: string;
    bio: string;
    phone: string;
    address: string;
    github_url: string;
    linkedin_url: string;
    website_url: string;
};

const emptyForm: FormData = {
    full_name: "",
    title: "",
    bio: "",
    phone: "",
    address: "",
    github_url: "",
    linkedin_url: "",
    website_url: "",
};

export default function EditProfileForm({
    profile,
    onCancel,
    onSuccess,
}: EditProfileFormProps) {
    const [form, setForm] = useState<FormData>(emptyForm);

    const [avatarFile, setAvatarFile] = useState<File | null>(
        null
    );

    const [cvFile, setCvFile] = useState<File | null>(null);

    const [avatarPreview, setAvatarPreview] = useState<
        string | null
    >(null);

    const [cvName, setCvName] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isEdit = Boolean(profile);

    useEffect(() => {
        if (profile) {
            setForm({
                full_name: profile.full_name ?? "",
                title: profile.title ?? "",
                bio: profile.bio ?? "",
                phone: profile.phone ?? "",
                address: profile.address ?? "",
                github_url: profile.github_url ?? "",
                linkedin_url: profile.linkedin_url ?? "",
                website_url: profile.website_url ?? "",
            });

            setAvatarFile(null);
            setCvFile(null);

            setAvatarPreview(profile.avatar_url ?? null);

            setCvName(
                profile.cv_url
                    ? profile.cv_url.split("/").pop() ??
                    "Current CV"
                    : null
            );
        } else {
            setForm(emptyForm);

            setAvatarFile(null);
            setCvFile(null);
            setAvatarPreview(null);
            setCvName(null);
        }

        setError("");
    }, [profile]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAvatarChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setAvatarFile(file);

        const previewUrl = URL.createObjectURL(file);

        setAvatarPreview(previewUrl);
    };

    const handleCvChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setCvFile(file);
        setCvName(file.name);
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const formData = new FormData();

            if (form.full_name) {
                formData.append(
                    "full_name",
                    form.full_name
                );
            }

            if (form.title) {
                formData.append("title", form.title);
            }

            if (form.bio) {
                formData.append("bio", form.bio);
            }

            if (form.phone) {
                formData.append("phone", form.phone);
            }

            if (form.address) {
                formData.append(
                    "address",
                    form.address
                );
            }

            if (form.github_url) {
                formData.append(
                    "github_url",
                    form.github_url
                );
            }

            if (form.linkedin_url) {
                formData.append(
                    "linkedin_url",
                    form.linkedin_url
                );
            }

            if (form.website_url) {
                formData.append(
                    "website_url",
                    form.website_url
                );
            }

            if (avatarFile) {
                formData.append(
                    "avatar",
                    avatarFile
                );
            }

            if (cvFile) {
                formData.append("cv", cvFile);
            }

            if (isEdit) {
                formData.append("_method", "PUT");
            }

            const response = isEdit
                ? await profileService.update(formData)
                : await profileService.create(formData);

            const updatedProfile = response.profile;

            toast.success(
                isEdit
                    ? "Profile updated successfully."
                    : "Profile created successfully."
            );

            onSuccess(updatedProfile);
        } catch (err) {
            console.error(
                "Failed to save profile:",
                err
            );

            const message =
                "Failed to save profile. Please try again.";

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        {isEdit
                            ? "Edit Profile"
                            : "Create Profile"}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        {isEdit
                            ? "Update your personal and professional information."
                            : "Add your personal and professional information."}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="
                        rounded-lg
                        border border-gray-300
                        bg-white
                        px-4 py-2
                        text-sm font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-50
                        disabled:opacity-50
                    "
                >
                    Cancel
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Basic Information */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 px-6 py-4">
                        <h2 className="font-semibold text-gray-900">
                            Basic Information
                        </h2>
                    </div>

                    <div className="grid gap-5 px-6 py-5 sm:grid-cols-2">
                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="full_name"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Full Name
                            </label>

                            <input
                                id="full_name"
                                name="full_name"
                                value={form.full_name}
                                onChange={handleChange}
                                placeholder="e.g. Tran Minh Chien"
                                className="
                                    h-10 w-full
                                    rounded-lg
                                    border border-gray-200
                                    px-3 text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Professional Title
                            </label>

                            <input
                                id="title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. Software Engineer"
                                className="
                                    h-10 w-full
                                    rounded-lg
                                    border border-gray-200
                                    px-3 text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Phone
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="e.g. 0349521656"
                                className="
                                    h-10 w-full
                                    rounded-lg
                                    border border-gray-200
                                    px-3 text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label
                                htmlFor="address"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Address
                            </label>

                            <input
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="e.g. Q3, Ho Chi Minh City"
                                className="
                                    h-10 w-full
                                    rounded-lg
                                    border border-gray-200
                                    px-3 text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                            />
                        </div>
                    </div>
                </div>

                {/* About */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 px-6 py-4">
                        <h2 className="font-semibold text-gray-900">
                            About
                        </h2>
                    </div>

                    <div className="px-6 py-5">
                        <label
                            htmlFor="bio"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Bio
                        </label>

                        <textarea
                            id="bio"
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Tell us about yourself..."
                            className="
                                w-full resize-none
                                rounded-lg
                                border border-gray-200
                                px-3 py-2.5
                                text-sm
                                outline-none
                                transition
                                focus:border-primary
                                focus:ring-2
                                focus:ring-primary/20
                            "
                        />
                    </div>
                </div>

                {/* Social Links */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 px-6 py-4">
                        <h2 className="font-semibold text-gray-900">
                            Social Links
                        </h2>
                    </div>

                    <div className="space-y-5 px-6 py-5">
                        {/* GitHub */}
                        <div>
                            <label
                                htmlFor="github_url"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                GitHub
                            </label>

                            <input
                                id="github_url"
                                name="github_url"
                                type="url"
                                value={form.github_url}
                                onChange={handleChange}
                                placeholder="https://github.com/username"
                                className="
                                    h-10 w-full
                                    rounded-lg
                                    border border-gray-200
                                    px-3 text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                            />
                        </div>

                        {/* LinkedIn */}
                        <div>
                            <label
                                htmlFor="linkedin_url"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                LinkedIn
                            </label>

                            <input
                                id="linkedin_url"
                                name="linkedin_url"
                                type="url"
                                value={form.linkedin_url}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/username"
                                className="
                                    h-10 w-full
                                    rounded-lg
                                    border border-gray-200
                                    px-3 text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label
                                htmlFor="website_url"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Website
                            </label>

                            <input
                                id="website_url"
                                name="website_url"
                                type="url"
                                value={form.website_url}
                                onChange={handleChange}
                                placeholder="https://example.com"
                                className="
                                    h-10 w-full
                                    rounded-lg
                                    border border-gray-200
                                    px-3 text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                            />
                        </div>
                    </div>
                </div>

                {/* Profile Files */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 px-6 py-4">
                        <h2 className="font-semibold text-gray-900">
                            Profile Files
                        </h2>
                    </div>

                    <div className="grid gap-5 px-6 py-5 sm:grid-cols-2">
                        {/* Avatar */}
                        <div>
                            <label
                                htmlFor="avatar"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Avatar
                            </label>

                            <div className="flex items-center gap-4">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar preview"
                                        className="h-20 w-20 shrink-0 rounded-full border border-gray-200 object-cover"
                                    />
                                ) : (
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400">
                                        No avatar
                                    </div>
                                )}

                                <div className="min-w-0 flex-1">
                                    <input
                                        id="avatar"
                                        name="avatar"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={
                                            handleAvatarChange
                                        }
                                        className="
                                            block w-full
                                            text-sm text-gray-500
                                            file:mr-4
                                            file:rounded-lg
                                            file:border-0
                                            file:bg-gray-100
                                            file:px-4
                                            file:py-2
                                            file:text-sm
                                            file:font-medium
                                            file:text-gray-700
                                            hover:file:bg-gray-200
                                        "
                                    />

                                    <p className="mt-1 text-xs text-gray-400">
                                        JPG, PNG or WebP.
                                        Maximum 5MB.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CV */}
                        <div>
                            <label
                                htmlFor="cv"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                CV
                            </label>

                            {cvName && (
                                <div className="mb-3 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-gray-700">
                                            {cvName}
                                        </p>

                                        {profile?.cv_url &&
                                            !cvFile && (
                                                <a
                                                    href={
                                                        profile.cv_url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-primary hover:underline"
                                                >
                                                    View current CV
                                                </a>
                                            )}
                                    </div>
                                </div>
                            )}

                            <input
                                id="cv"
                                name="cv"
                                type="file"
                                accept="application/pdf"
                                onChange={handleCvChange}
                                className="
                                    block w-full
                                    text-sm text-gray-500
                                    file:mr-4
                                    file:rounded-lg
                                    file:border-0
                                    file:bg-gray-100
                                    file:px-4
                                    file:py-2
                                    file:text-sm
                                    file:font-medium
                                    file:text-gray-700
                                    hover:file:bg-gray-200
                                "
                            />

                            <p className="mt-1 text-xs text-gray-400">
                                PDF only. Maximum 10MB.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="
                            rounded-lg
                            border border-gray-200
                            bg-white
                            px-5 py-2.5
                            text-sm font-medium
                            text-gray-700
                            hover:bg-gray-50
                            disabled:opacity-50
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            rounded-lg
                            bg-primary
                            px-5 py-2.5
                            text-sm font-medium
                            text-primary-foreground
                            shadow-sm
                            hover:bg-primary/90
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {loading
                            ? "Saving..."
                            : isEdit
                                ? "Update Profile"
                                : "Create Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
}