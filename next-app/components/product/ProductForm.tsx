type ProductFormProps = {
    mode: "create" | "edit";
    initialData?: {
        name: string;
        price: number;
        stock: number;
        description: string;
        category_id: number;
    };
    categories: {
        id: number;
        name: string;
    }[];
    onSubmit: (data: {
        name: string;
        price: number;
        stock: number;
        description: string;
        category_id: number;
    }) => void;
};

export default function ProductForm({
    mode,
}: ProductFormProps) {
    return (
        <div>
            {mode}
        </div>
    );
}