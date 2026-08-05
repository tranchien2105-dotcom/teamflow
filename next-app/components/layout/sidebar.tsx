"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import { authService } from "@/services/auth.service";

export default function Sidebar() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.replace("/login");
    router.refresh();
  }

  return (
    <nav>
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link href="/products">Products</Link>
        </li>

        <li>
          <Link href="/dashboard/profile">Profile</Link>
        </li>

        <li>
          <Button onClick={logout}>
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
}