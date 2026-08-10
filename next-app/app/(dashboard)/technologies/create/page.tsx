import TechnologyForm from "@/components/technology/TechnologyForm";

export default function CreateTechnologyPage() {
    return (
        <main className="min-h-screen bg-slate-50 px-6 py-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Create Technology
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Add a new technology to your portfolio.
                    </p>
                </div>

                <TechnologyForm mode="create" />
            </div>
        </main>
    );
}