import Sidebar from "@/components/layout/sidebar";
import Toast from "@/components/ui/Toast";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="min-w-0 flex-1 overflow-y-auto bg-gray-50">
                <Toast />
                {children}
            </main>
        </div>
    );
}

