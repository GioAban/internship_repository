import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-hot-toast';
export default function CategoryCreate() {
    const [category, setCategory] = useState("");

    const handleCategoryCreate = async (e) => {
        e.preventDefault();
        if (category == "") {
            toast.error("Category name is required.");
            return;
        }
        try {
            const { data } = await axios.post('/api/categoryStore', {
                name: category
            });
            if (data) {
                toast.success(data.message);
                setCategory("");
                router.visit('/categories');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Create Category</h2>
            }
        >
            <Head title="Create Category" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleCategoryCreate} >
                                <input type="text" placeholder="Enter Category"
                                    className="input input-bordered w-full bg-transparent mb-3"
                                    value={category} onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
                                <button className="btn btn-neutral btn-md w-full" type="submit">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
