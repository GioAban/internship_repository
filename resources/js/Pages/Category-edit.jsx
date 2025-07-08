import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-hot-toast';
export default function CategoryEdit() {
    const { category } = usePage().props;
    const [category_edit, setCategory] = useState(category.name);
    const [status_edit, setStatus] = useState(category.status);
    const handleCategoryEdit = async (e) => {
        e.preventDefault();
        if (category_edit === "" || status_edit === "") {
            toast.error("All fields are required.");
            return;
        }
        try {
            const { data } = await axios.patch("/api/categorySave/" + category.id, {
                name: category_edit,
                status: status_edit,
            });
            if (data) {
                toast.success(data.message);
                router.visit("/categories");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Category
                </h2>
            }
        >
            <Head title="Edit Category" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleCategoryEdit}>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter Category"
                                        className="input input-bordered w-full bg-transparent mb-3"
                                        value={category_edit}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    />
                                    <select
                                        className="select select-bordered w-full bg-transparent mb-3"
                                        value={status_edit}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option disabled value="">Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="InActive">InActive</option>
                                    </select>
                                </div>
                                <button className="btn btn-neutral btn-md w-full" type="submit">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
