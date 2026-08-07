const technologies = ["Operations", "Product", "Finance", "Support", "Delivery"];

export default function TrustedBy() {
    return (
        <section className="border-y border-slate-200 bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Used by teams that need clarity
                </p>
                <p className="mx-auto mt-3 max-w-2xl text-center text-base text-slate-600">
                    From daily execution to reporting, TeamFlow is built to work the way modern teams operate.
                </p>

                <div className="mt-10 grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-5">
                    {technologies.map((tech) => (
                        <div key={tech} className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-base font-semibold text-slate-700">
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
