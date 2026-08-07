import Link from "next/link";

const links = [
    { href: "#features", label: "Product" },
    { href: "#dashboard-preview", label: "Workflow" },
    { href: "#cta", label: "Contact" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
                        TF
                    </div>
                    <div>
                        <p className="text-sm font-semibold tracking-tight text-slate-900">TeamFlow</p>
                        <p className="text-xs text-slate-500">Operations workspace</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="transition hover:text-slate-900">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <Link href="/login" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-lg border border-slate-300 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Request demo
                    </Link>
                </div>
            </div>
        </header>
    );
}