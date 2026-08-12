import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import BackToTop from "@/components/ui/BackToTop";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin", "vietnamese"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin", "vietnamese"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${jetbrainsMono.variable}`}
            >
                {children}
                <BackToTop />
            </body>
        </html>
    );
}