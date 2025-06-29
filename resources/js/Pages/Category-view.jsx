import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage, Link } from "@inertiajs/react";

export default function CategoryView() {
    const { category } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    View Category
                </h2>
            }
        >
            <Head title="View Category" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-5">
                        <div className="text-gray-900 text-center mb-6 border-b border-gray-300 pb-4">
                            <p className="text-5xl font-semibold p-2 ">{category.name}</p>
                            <h3 className="bg-success text-white p-1">{category.status ? "Active" : "InActive"}</h3>
                        </div>
                        <div>
                            <Link href={"/edit-category/" + category.id} className="btn btn-warning w-full mb-2 text-white">Update</Link>
                            <button className="btn btn-neutral w-full mb-3 text-white" > Remove</button>
                            <Link href={"/categories/"} className="btn btn-neutral w-full mb-3 text-white">Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
