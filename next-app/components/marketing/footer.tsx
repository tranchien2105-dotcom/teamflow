import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 py-10">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row lg:px-8">
                <div>
                    <h3 className="text-xl font-semibold text-slate-900">TeamFlow</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        © {new Date().getFullYear()} TeamFlow. Built for practical, everyday teamwork.
                    </p>
                </div>

                <div className="flex gap-6 text-sm text-slate-600">
                    <Link href="#" className="transition hover:text-slate-900">
                        Privacy
                    </Link>
                    <Link href="#" className="transition hover:text-slate-900">
                        Terms
                    </Link>
                    <Link href="#" className="transition hover:text-slate-900">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}