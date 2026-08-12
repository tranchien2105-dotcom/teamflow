import { notFound } from "next/navigation";

import PortfolioPage from "@/components/portfolio/PortfolioPage";
import { getPortfolio } from "@/services/portfolio-service";

interface UsernamePageProps {
    params: Promise<{
        username: string;
    }>;
}

export default async function UsernamePage({
    params,
}: UsernamePageProps) {
    const { username } = await params;

    try {
        const portfolio = await getPortfolio(username);

        return (
            <PortfolioPage
                portfolio={portfolio}
            />
        );
    } catch {
        notFound();
    }
}