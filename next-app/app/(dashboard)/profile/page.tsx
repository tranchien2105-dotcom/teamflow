"use client";

import { useEffect, useState } from "react";

import EditProfileForm from "@/components/profile/edit-profile-form";
import { authService } from "@/services/auth.service";
import type { Profile } from "@/types/profile";

export default function ProfilePage() {
    const [profile, setProfile] =
        useState<Profile | null>(null);

    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await authService.me();

                setProfile(
                    data.user.profile ?? null
                );
            } catch (error) {
                console.error(
                    "Failed to load profile:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    /*
     * Loading
     */
    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
                <div className="text-sm text-gray-500">
                    Loading profile...
                </div>
            </div>
        );
    }

    /*
     * Create / Edit mode
     *
     * profile can be null when creating a new profile.
     */
    if (editing) {
        return (
            <EditProfileForm
                profile={profile}
                onCancel={() => setEditing(false)}
                onSuccess={(updatedProfile: Profile) => {
                    setProfile(updatedProfile);
                    setEditing(false);
                }}
            />
        );
    }

    /*
     * No profile
     */
    if (!profile) {
        return (
            <div className="mx-auto w-full max-w-4xl p-6 lg:p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        My Profile
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your personal information
                        and professional details.
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                        <span className="text-2xl text-blue-600">
                            +
                        </span>
                    </div>

                    <h2 className="mt-5 text-lg font-semibold text-gray-900">
                        Complete your profile
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                        Add your professional information
                        so your teammates can learn more
                        about you.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            setEditing(true)
                        }
                        className="
                            mt-6
                            rounded-lg
                            bg-blue-600
                            px-5 py-2.5
                            text-sm font-medium
                            text-white
                            transition
                            hover:bg-blue-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:ring-offset-2
                        "
                    >
                        Create Profile
                    </button>
                </div>
            </div>
        );
    }

    /*
     * Profile view
     */
    return (
        <div className="mx-auto w-full max-w-4xl p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        My Profile
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your personal information
                        and professional details.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        setEditing(true)
                    }
                    className="
                        rounded-lg
                        border border-gray-300
                        bg-white
                        px-4 py-2
                        text-sm font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-50
                    "
                >
                    Edit Profile
                </button>
            </div>

            {/* Profile Header */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-5">
                    {profile.avatar_url ? (
                        <img
                            src={
                                profile.avatar_url
                            }
                            alt={
                                profile.full_name ??
                                "Profile"
                            }
                            className="
                                h-20 w-20
                                rounded-full
                                object-cover
                            "
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-20 w-20
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-blue-100
                                text-2xl
                                font-semibold
                                text-blue-700
                            "
                        >
                            {profile.full_name
                                ?.charAt(0)
                                .toUpperCase() ?? "U"}
                        </div>
                    )}

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {profile.full_name ||
                                "Your Name"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {profile.title ||
                                "No title added"}
                        </p>
                    </div>
                </div>
            </div>

            {/* About */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-6 py-4">
                    <h3 className="font-semibold text-gray-900">
                        About
                    </h3>
                </div>

                <div className="px-6 py-5">
                    <p className="text-sm leading-6 text-gray-600">
                        {profile.bio ||
                            "No bio added yet."}
                    </p>
                </div>
            </div>

            {/* Contact */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-6 py-4">
                    <h3 className="font-semibold text-gray-900">
                        Contact Information
                    </h3>
                </div>

                <div className="grid gap-6 px-6 py-5 sm:grid-cols-2">
                    {/* Phone */}
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Phone
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                            {profile.phone ||
                                "Not provided"}
                        </p>
                    </div>

                    {/* Address */}
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Address
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                            {profile.address ||
                                "Not provided"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-6 py-4">
                    <h3 className="font-semibold text-gray-900">
                        Social Links
                    </h3>
                </div>

                <div className="grid gap-6 px-6 py-5 sm:grid-cols-3">
                    {/* GitHub */}
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            GitHub
                        </p>

                        {profile.github_url ? (
                            <a
                                href={
                                    profile.github_url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    mt-1
                                    block
                                    truncate
                                    text-sm
                                    text-blue-600
                                    hover:underline
                                "
                            >
                                {
                                    profile.github_url
                                }
                            </a>
                        ) : (
                            <p className="mt-1 text-sm text-gray-500">
                                Not provided
                            </p>
                        )}
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            LinkedIn
                        </p>

                        {profile.linkedin_url ? (
                            <a
                                href={
                                    profile.linkedin_url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    mt-1
                                    block
                                    truncate
                                    text-sm
                                    text-blue-600
                                    hover:underline
                                "
                            >
                                {
                                    profile.linkedin_url
                                }
                            </a>
                        ) : (
                            <p className="mt-1 text-sm text-gray-500">
                                Not provided
                            </p>
                        )}
                    </div>

                    {/* Website */}
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Website
                        </p>

                        {profile.website_url ? (
                            <a
                                href={
                                    profile.website_url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    mt-1
                                    block
                                    truncate
                                    text-sm
                                    text-blue-600
                                    hover:underline
                                "
                            >
                                {
                                    profile.website_url
                                }
                            </a>
                        ) : (
                            <p className="mt-1 text-sm text-gray-500">
                                Not provided
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* CV */}
            {profile.cv_url && (
                <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 px-6 py-4">
                        <h3 className="font-semibold text-gray-900">
                            CV
                        </h3>
                    </div>

                    <div className="px-6 py-5">
                        <a
                            href={profile.cv_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex
                                items-center
                                rounded-lg
                                bg-blue-600
                                px-4 py-2
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:bg-blue-700
                            "
                        >
                            View CV
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
