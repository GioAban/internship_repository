import React from 'react';
import { usePage } from '@inertiajs/react';
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
const Products = () => {
    const { products } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Products
                </h2>
            }
        >
            <Head title="Products" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="overflow-x-auto">
                                <div className="mb-3">
                                    <Link
                                        href={route("product.create")}
                                        className="btn btn-soft btn-sm w-full"
                                    >
                                        Add
                                    </Link>
                                </div>
                                <div className="overflow-hidden">
                                    <table className="w-full text-xs">
                                        <thead className="border text-black border">
                                            <tr>
                                                <th className='w-1/2 border ps-2'>Name/Desc.</th>
                                                <th className='border ps-2'>Price</th>
                                                <th className='border ps-2'>Stock</th>
                                                <th className='border ps-2'>Unit</th>
                                                <th className="text-right border ps-2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((row) => (
                                                <tr key={row.id} className='border'>
                                                    <td className='border ps-2'>{row.name_description}</td>
                                                    <td className='border ps-2'>{row.selling_price}</td>
                                                    <td className='border ps-2'>{row.stock}</td>
                                                    <td className='border ps-2'>{row.unit_measurement_abbreviation}</td>
                                                    <td className='border ps-2'>
                                                        <div className="flex justify-end">
                                                            <Link
                                                                href={"/product-edit/" + row.id}
                                                                className="btn btn-soft btn-sm mx-1"
                                                            >
                                                                Edit
                                                            </Link>
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
        </AuthenticatedLayout>
    )
}
export default Products