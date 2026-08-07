import Link from "next/link";

export default function Cta() {
    return (
        <section id="cta" className="bg-white py-24">
            <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 px-8 py-16 text-center sm:px-12">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Ready to see it in action?</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    See how TeamFlow fits into your day-to-day workflow.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                    Book a short walkthrough and get a clear view of how the product works in a real team setup.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href="/register" className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                        Book a demo
                    </Link>
                    <Link href="/login" className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                        Sign in
                    </Link>
                </div>
            </div>
        </section>
    );
}
