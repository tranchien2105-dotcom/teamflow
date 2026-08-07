import Link from "next/link";

const stats = [
    { value: "120+", label: "Teams onboarded" },
    { value: "98%", label: "Weekly adoption" },
    { value: "24/7", label: "Visibility" },
];

export default function Hero() {
    return (
        <section className="border-b border-slate-200 bg-slate-50">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
                        Built for daily operations and cross-team execution
                    </div>

                    <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                        A practical workspace for getting work done.
                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                        Keep tasks, approvals, and priorities in one place so teams can move with less friction.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/register" className="rounded-lg bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800">
                            Request demo
                        </Link>
                        <Link href="/login" className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                            View product
                        </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        {stats.map((stat) => (
                            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                                <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
                                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.35)]">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Operations overview</p>
                                    <p className="text-sm text-slate-500">Updated 8 min ago</p>
                                </div>
                                <button className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700">
                                    New task
                                </button>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">Search</div>
                                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">Filter</div>
                                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">This week</div>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-lg border border-slate-200 bg-white p-3">
                                    <p className="text-sm text-slate-500">Open</p>
                                    <p className="mt-1 text-xl font-semibold text-slate-900">24</p>
                                </div>
                                <div className="rounded-lg border border-slate-200 bg-white p-3">
                                    <p className="text-sm text-slate-500">Due today</p>
                                    <p className="mt-1 text-xl font-semibold text-slate-900">8</p>
                                </div>
                                <div className="rounded-lg border border-slate-200 bg-white p-3">
                                    <p className="text-sm text-slate-500">Approved</p>
                                    <p className="mt-1 text-xl font-semibold text-slate-900">19</p>
                                </div>
                            </div>

                            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
                                <div className="grid grid-cols-[1.4fr_0.7fr_0.8fr] border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                    <span>Task</span>
                                    <span>Status</span>
                                    <span>Owner</span>
                                </div>
                                {[
                                    ["Client onboarding", "In review", "Ava"],
                                    ["Vendor update", "Scheduled", "Noah"],
                                    ["Invoice review", "Approved", "Mina"],
                                ].map(([task, status, owner]) => (
                                    <div key={task} className="grid grid-cols-[1.4fr_0.7fr_0.8fr] items-center border-b border-slate-200 px-3 py-3 text-sm last:border-b-0">
                                        <span className="font-medium text-slate-700">{task}</span>
                                        <span className="text-slate-500">{status}</span>
                                        <span className="text-slate-500">{owner}</span>
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