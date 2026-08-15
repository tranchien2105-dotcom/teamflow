"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1800);

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111111]">
            <div className="flex w-80 flex-col items-center">

                {/* Logo */}

                <div className="relative flex h-24 w-24 items-center justify-center">

                    {/* Rotating ring */}

                    <div
                        className="
                            absolute inset-0
                            animate-[spin_3s_linear_infinite]
                            rounded-full
                            border-2
                            border-amber-400/10
                            border-t-amber-400
                        "
                    />

                    {/* Logo circle */}

                    <div
                        className="
                            flex h-20 w-20
                            items-center justify-center
                            rounded-full
                            border-2 border-amber-400
                            font-mono text-4xl
                            font-bold text-amber-400
                            shadow-[0_0_25px_rgba(251,191,36,0.08)]
                        "
                    >
                        C
                    </div>
                </div>

                {/* Name */}

                <div className="mt-8 text-center">

                    <p
                        className="
                            font-mono
                            text-lg
                            font-medium
                            tracking-[0.3em]
                            text-zinc-200
                        "
                    >
                        CHIẾN
                    </p>

                    <p
                        className="
                            mt-2
                            font-mono
                            text-xs
                            tracking-[0.25em]
                            text-zinc-600
                        "
                    >
                        DEVELOPER PORTFOLIO
                    </p>
                </div>

                {/* Loading */}

                <div className="mt-10 w-72">

                    {/* Status */}

                    <div className="mb-3 flex items-center justify-between">

                        <div className="flex items-center gap-2">

                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />

                            <span
                                className="
                                    font-mono
                                    text-[10px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-zinc-600
                                "
                            >
                                Initializing
                            </span>
                        </div>

                        <div className="flex gap-1">

                            <span className="animate-[blink_1.4s_infinite] text-amber-400">
                                .
                            </span>

                            <span className="animate-[blink_1.4s_0.2s_infinite] text-amber-400">
                                .
                            </span>

                            <span className="animate-[blink_1.4s_0.4s_infinite] text-amber-400">
                                .
                            </span>

                        </div>
                    </div>

                    {/* Progress line */}

                    <div className="relative h-[2px] overflow-hidden bg-zinc-800">

                        <div
                            className="
                                absolute inset-y-0 left-0
                                w-1/2
                                bg-gradient-to-r
                                from-transparent
                                via-amber-400
                                to-transparent
                                animate-[loader_1.2s_ease-in-out_infinite]
                            "
                        />

                    </div>

                    {/* Bottom text */}

                    <div
                        className="
                            mt-3
                            text-center
                            font-mono
                            text-[9px]
                            uppercase
                            tracking-[0.3em]
                            text-zinc-700
                        "
                    >
                        Loading experience
                    </div>

                </div>
            </div>
        </div>
    );
}
