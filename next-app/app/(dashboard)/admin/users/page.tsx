"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import apiClient from "@/lib/api-client";

interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
    created_at: string;
    updated_at: string;
}

interface UsersResponse {
    data: AdminUser[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

type RoleFilter = "all" | "admin" | "user";

export default function AdminUsersPage() {
    const router = useRouter();

    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] =
        useState<RoleFilter>("all");

    const [editingUserId, setEditingUserId] =
        useState<number | null>(null);

    const [updatingUserId, setUpdatingUserId] =
        useState<number | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                const response =
                    await apiClient.get<UsersResponse>(
                        `/admin/users?page=${currentPage}&per_page=10`
                    );

                setUsers(response.data.data);

                setCurrentPage(
                    response.data.meta.current_page
                );

                setLastPage(
                    response.data.meta.last_page
                );

                setTotal(
                    response.data.meta.total
                );
            } catch (error: any) {
                console.error(error);

                setError(
                    error?.response?.data?.message ||
                        "Failed to load users."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [currentPage]);

    const handleViewUser = (userId: number) => {
        router.push(`/admin/users/${userId}`);
    };

    /**
     * Start promoting a normal user to admin.
     */
    const handleStartChangeRole = (
        user: AdminUser
    ) => {
        /*
         * Admin role cannot be changed.
         */
        if (user.role === "admin") {
            return;
        }

        setEditingUserId(user.id);
        setError(null);
    };

    const handleCancelChangeRole = () => {
        setEditingUserId(null);
    };

    /**
     * Promote user -> admin.
     */
    const handleChangeRole = async (
        userId: number
    ) => {
        try {
            setUpdatingUserId(userId);
            setError(null);

            const response =
                await apiClient.patch<{
                    data: AdminUser;
                    message: string;
                }>(
                    `/admin/users/${userId}`,
                    {
                        role: "admin",
                    }
                );

            const updatedUser =
                response.data.data;

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.id === userId
                        ? {
                              ...user,
                              role: updatedUser.role,
                          }
                        : user
                )
            );

            setEditingUserId(null);
        } catch (error: any) {
            console.error(error);

            setError(
                error?.response?.data?.message ||
                    "Failed to update user role."
            );
        } finally {
            setUpdatingUserId(null);
        }
    };

    const filteredUsers = useMemo(() => {
        const keyword =
            search.trim().toLowerCase();

        return users.filter((user) => {
            const matchesSearch =
                keyword === "" ||
                user.name
                    .toLowerCase()
                    .includes(keyword) ||
                user.email
                    .toLowerCase()
                    .includes(keyword);

            const matchesRole =
                roleFilter === "all" ||
                user.role === roleFilter;

            return (
                matchesSearch &&
                matchesRole
            );
        });
    }, [
        users,
        search,
        roleFilter,
    ]);

    const adminCount = users.filter(
        (user) => user.role === "admin"
    ).length;

    const userCount = users.filter(
        (user) => user.role === "user"
    ).length;

    const joinedThisMonthCount =
        users.filter((user) => {
            const createdAt =
                new Date(user.created_at);

            const now = new Date();

            return (
                createdAt.getMonth() ===
                    now.getMonth() &&
                createdAt.getFullYear() ===
                    now.getFullYear()
            );
        }).length;

    const getInitials = (
        name: string
    ) => {
        return name
            .trim()
            .split(/\s+/)
            .map((part) =>
                part.charAt(0)
            )
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    const formatDate = (
        date: string
    ) => {
        return new Date(
            date
        ).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    };

    return (
        <div className="px-6 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Users
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage your TeamFlow
                            members and
                            permissions.
                        </p>
                    </div>

                    <div className="text-sm text-gray-500">
                        {total} registered users
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-100">
                        <span>
                            {error}
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                setError(
                                    null
                                )
                            }
                            className="font-medium hover:text-red-800"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {/* Total */}
                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Users
                                </p>

                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {total}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Registered
                                    accounts
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                                U
                            </div>
                        </div>
                    </div>

                    {/* Admins */}
                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Administrators
                                </p>

                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {adminCount}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Admin accounts
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-sm font-bold text-purple-600">
                                A
                            </div>
                        </div>
                    </div>

                    {/* Members */}
                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Members
                                </p>

                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {userCount}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Regular users
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-600">
                                M
                            </div>
                        </div>
                    </div>

                    {/* This month */}
                    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    This Month
                                </p>

                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {
                                        joinedThisMonthCount
                                    }
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    New users
                                    on this
                                    page
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-sm font-bold text-green-600">
                                +
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
                    {/* Toolbar */}
                    <div className="border-b border-gray-100 px-5 py-4">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            {/* Search */}
                            <div className="relative w-full lg:max-w-md">
                                <svg
                                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="8"
                                    />

                                    <path d="m21 21-4.3-4.3" />
                                </svg>

                                <input
                                    type="text"
                                    value={
                                        search
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setSearch(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Search by name or email..."
                                    className="w-full rounded-lg bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none ring-1 ring-gray-200 transition placeholder:text-gray-400 focus:bg-white focus:ring-gray-300"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex items-center gap-3">
                                <select
                                    value={
                                        roleFilter
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setRoleFilter(
                                            event
                                                .target
                                                .value as RoleFilter
                                        )
                                    }
                                    className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400"
                                >
                                    <option value="all">
                                        All roles
                                    </option>

                                    <option value="admin">
                                        Admins
                                    </option>

                                    <option value="user">
                                        Users
                                    </option>
                                </select>

                                <span className="hidden text-sm text-gray-400 sm:block">
                                    {
                                        filteredUsers.length
                                    }{" "}
                                    shown
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Loading */}
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800" />

                            <p className="text-sm text-gray-500">
                                Loading users...
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[900px]">
                                    <thead className="bg-gray-50/70">
                                        <tr>
                                            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                User
                                            </th>

                                            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Role
                                            </th>

                                            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Joined
                                            </th>

                                            <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {filteredUsers.map(
                                            (user) => {
                                                const isEditing =
                                                    editingUserId ===
                                                    user.id;

                                                const isUpdating =
                                                    updatingUserId ===
                                                    user.id;

                                                const isAdmin =
                                                    user.role ===
                                                    "admin";

                                                return (
                                                    <tr
                                                        key={
                                                            user.id
                                                        }
                                                        className="transition-colors hover:bg-gray-50/60"
                                                    >
                                                        {/* User */}
                                                        <td className="px-5 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                                                        isAdmin
                                                                            ? "bg-purple-100 text-purple-700"
                                                                            : "bg-blue-100 text-blue-700"
                                                                    }`}
                                                                >
                                                                    {getInitials(
                                                                        user.name
                                                                    )}
                                                                </div>

                                                                <div className="min-w-0">
                                                                    <p className="truncate text-sm font-semibold text-gray-900">
                                                                        {
                                                                            user.name
                                                                        }
                                                                    </p>

                                                                    <p className="truncate text-sm text-gray-500">
                                                                        {
                                                                            user.email
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Role */}
                                                        <td className="px-5 py-4">
                                                            {isEditing ? (
                                                                <div className="flex items-center gap-2">
                                                                    <span className="inline-flex rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
                                                                        Admin
                                                                    </span>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleChangeRole(
                                                                                user.id
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            isUpdating
                                                                        }
                                                                        className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    >
                                                                        {isUpdating
                                                                            ? "Saving..."
                                                                            : "Confirm"}
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={
                                                                            handleCancelChangeRole
                                                                        }
                                                                        disabled={
                                                                            isUpdating
                                                                        }
                                                                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <span
                                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                                        isAdmin
                                                                            ? "bg-purple-50 text-purple-700"
                                                                            : "bg-gray-100 text-gray-600"
                                                                    }`}
                                                                >
                                                                    {isAdmin
                                                                        ? "Admin"
                                                                        : "User"}
                                                                </span>
                                                            )}
                                                        </td>

                                                        {/* Joined */}
                                                        <td className="px-5 py-4 text-sm text-gray-500">
                                                            {formatDate(
                                                                user.created_at
                                                            )}
                                                        </td>

                                                        {/* Action */}
                                                        <td className="px-5 py-4">
                                                            <div className="flex justify-end gap-1">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleViewUser(
                                                                            user.id
                                                                        )
                                                                    }
                                                                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                                                >
                                                                    View
                                                                </button>

                                                                {!isAdmin &&
                                                                    !isEditing && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleStartChangeRole(
                                                                                    user
                                                                                )
                                                                            }
                                                                            className="rounded-lg px-3 py-1.5 text-sm font-medium text-purple-600 transition hover:bg-purple-50"
                                                                        >
                                                                            Change
                                                                            Role
                                                                        </button>
                                                                    )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}

                                        {filteredUsers.length ===
                                            0 && (
                                            <tr>
                                                <td
                                                    colSpan={
                                                        4
                                                    }
                                                    className="px-5 py-16 text-center"
                                                >
                                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                                        <svg
                                                            className="h-5 w-5"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                        >
                                                            <circle
                                                                cx="11"
                                                                cy="11"
                                                                r="8"
                                                            />

                                                            <path d="m21 21-4.3-4.3" />
                                                        </svg>
                                                    </div>

                                                    <p className="mt-3 text-sm font-medium text-gray-900">
                                                        No
                                                        users
                                                        found
                                                    </p>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Try
                                                        changing
                                                        your
                                                        search
                                                        or
                                                        filter.
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-gray-500">
                                    Showing{" "}
                                    <span className="font-medium text-gray-700">
                                        {
                                            filteredUsers.length
                                        }
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-medium text-gray-700">
                                        {total}
                                    </span>{" "}
                                    users
                                </p>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        disabled={
                                            currentPage <=
                                            1
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                (
                                                    page
                                                ) =>
                                                    page -
                                                    1
                                            )
                                        }
                                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Previous
                                    </button>

                                    <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-gray-900 px-2 text-sm font-medium text-white">
                                        {
                                            currentPage
                                        }
                                    </div>

                                    <button
                                        type="button"
                                        disabled={
                                            currentPage >=
                                            lastPage
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                (
                                                    page
                                                ) =>
                                                    page +
                                                    1
                                            )
                                        }
                                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
