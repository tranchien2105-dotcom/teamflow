const features = [
    {
        title: "Shared workflows",
        description: "Create repeatable processes for approvals, handoffs, and follow-ups without extra overhead.",
    },
    {
        title: "Clear ownership",
        description: "Every item has a clear owner, status, and next action so nothing falls through the cracks.",
    },
    {
        title: "Reliable reporting",
        description: "Stay aligned with simple summaries for progress, risk, and delivery across the team.",
    },
];

export default function Features() {
    return (
        <section id="features" className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Why teams use it</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                        Built for real execution, not just demos.
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-slate-600">
                        TeamFlow helps growing teams run projects with fewer meetings, clearer ownership, and better visibility.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
                                ✓
                            </div>
                            <h3 className="mt-5 text-lg font-semibold text-slate-900">{feature.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}