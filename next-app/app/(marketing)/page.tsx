import Hero from "@/components/marketing/hero";
import TrustedBy from "@/components/marketing/trusted-by";
import Features from "@/components/marketing/features";
import DashboardPreview from "@/components/marketing/dashboard-preview";
import Cta from "@/components/marketing/cta";

export default function HomePage() {
    return (
        <>
            <Hero />
            <TrustedBy />
            <Features />
            <DashboardPreview />
            <Cta />
        </>
    );
}