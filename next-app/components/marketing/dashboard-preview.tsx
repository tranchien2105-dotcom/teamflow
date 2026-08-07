const items = [
    { name: "Quarterly planning", status: "In review", owner: "Ava" },
    { name: "Client handoff", status: "Scheduled", owner: "Noah" },
    { name: "Invoice approval", status: "Approved", owner: "Mina" },
];

export default function DashboardPreview() {
    return (
        <section id="dashboard-preview" className="bg-slate-900 py-24 text-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Workflow view</p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Clear enough for daily use, structured enough for scale.
                        </h2>
                        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
                            Replace scattered updates with a single place for work, decisions, and follow-through.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                <div>
                                    <p className="text-sm font-semibold text-white">Current work</p>
                                    <p className="text-sm text-slate-400">3 items • 1 pending review</p>
                                </div>
                                <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300">
                                    Filters
                                </button>
                            </div>

                            <div className="mt-4 space-y-2">
                                {items.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-white">{item.name}</p>
                                            <p className="text-sm text-slate-400">{item.owner}</p>
                                        </div>
                                        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
