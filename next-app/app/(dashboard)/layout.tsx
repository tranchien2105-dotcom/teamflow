import Sidebar from "@/components/layout/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: "flex" }}>
            <aside
                style={{
                    width: 250,
                    borderRight: "1px solid #ddd",
                    padding: 20,
                }}
            >
                <Sidebar />
            </aside>

            <main style={{ flex: 1, padding: 20 }}>
                {children}
            </main>
        </div>
    );
}