import { useState } from "react";
import { usePage } from '@inertiajs/react';
import { Head, Link } from "@inertiajs/react";
import { useDataStore } from "@/Context/DataStoreContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CategoryModal from "./CategoryModal";

export default function Category() {
    const { categories } = usePage().props;
    const { setCategoryModalIsOpen } = useDataStore();
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Category
                </h2>
            }
        >
            <Head title="Category" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="overflow-x-auto">
                                <div className="mb-3">
                                    <Link
                                        href={route("category.create")}
                                        className="btn btn-soft btn-sm w-full"
                                    >
                                        Add
                                    </Link>
                                </div>
                                <div className="overflow-hidden rounded-lg">
                                    <table className="text-xs w-full">
                                        <thead className="text-black border ps-2">
                                            <tr>
                                                <th className="border ps-2">Name</th>
                                                <th className="border ps-2">Status</th>
                                                <th className="text-right border ps-2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map((row) => (
                                                <tr key={row.id} className="border ps-2">
                                                    <td className="border ps-2">{row.name}</td>
                                                    <td className="border ps-2">{row.status}</td>
                                                    <td className="border ps-2">
                                                        <div className="flex justify-end">
                                                            <Link
                                                                href={"/category/" + row.id}
                                                                className="btn btn-soft btn-sm mx-1"
                                                            >
                                                                View
                                                            </Link>

                                                            <Link
                                                                href={"/edit-category/" + row.id}
                                                                className="btn btn-soft btn-sm mx-1"
                                                            >
                                                                Edit
                                                            </Link>
                                                            {/* <button
                                                                className="btn btn-soft btn-success btn-sm"
                                                                onClick={() => {
                                                                    setSelectedCategoryId(row.id);
                                                                    setCategoryModalIsOpen(true);
                                                                }}
                                                            >
                                                                Edit
                                                            </button> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CategoryModal id={selectedCategoryId} />
        </AuthenticatedLayout>
    );
}
