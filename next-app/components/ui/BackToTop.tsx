"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        handleScroll();

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`
                fixed
                bottom-6
                right-6
                z-50
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-amber-400/60
                bg-[#111111]/90
                text-amber-400
                backdrop-blur
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-amber-400
                hover:bg-amber-400/10
                hover:shadow-[0_0_12px_rgba(251,191,36,0.35)]
                ${
                    visible
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-3 opacity-0"
                }
            `}
        >
            <span className="text-lg leading-none">
                ↑
            </span>
        </button>
    );
}