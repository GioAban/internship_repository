import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage, Link } from "@inertiajs/react";
import { CiSearch } from "react-icons/ci";
const PointOfSale = () => {
    const { categories, products } = usePage().props;




    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Point of Sale
                </h2>
            }
        >
            <Head title="Point of Sale" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="overflow-x-auto">
                                <div className="overflow-hidden">
                                    <div className="flex">
                                        <div className="w-1/4 border">
                                            <div className="p-1">
                                                <h3 className="text-sm font-semibold border-b p-2">All</h3>
                                                {categories.map((row) => (
                                                    <ul className="list-none" key={row.id} >
                                                        <li className="border-b p-1">
                                                            {row.name}
                                                        </li>
                                                    </ul>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="w-5/6 border">
                                            <ul className="list-none flex text-center text-xs font-semibold m-1 mb-3 border-b-2">
                                                <li className="border-r-2 border-100 p-2 w-1/3">
                                                    SK
                                                </li>
                                                <li className="border-r-2 border-100 p-2 w-1/3">
                                                    KG
                                                </li>
                                                <li className="border-r-2 border-100 p-2 w-1/3">
                                                    PCS
                                                </li>
                                                <li className="p-2 w-1/3">
                                                    PK
                                                </li>
                                            </ul>
                                            <div className='flex p-1'>
                                                <input type="text" placeholder="Search products" className="input input-sm border border-black w-full bg-transparent mt-1" />
                                                <button className="btn btn-soft btn-sm m-1"><CiSearch /></button>
                                            </div>
                                            <ul className="list-none flex text-center text-xs font-semibold bg-black text-white">
                                                <li className="border p-1 w-1/2 text-start">
                                                    <h2>Product</h2>
                                                </li>
                                                <li className="border p-1 w-1/6">
                                                    <h2>Unit</h2>
                                                </li>
                                                <li className="border p-1 w-1/4">
                                                    <h2>Price</h2>
                                                </li>
                                                <li className="border p-1 w-1/4">
                                                    <h2>QTY.</h2>
                                                </li>
                                            </ul>
                                            <div className="h-3/4 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                                {products.map((row) => (
                                                    <ul key={row.id} className="list-none flex text-center text-xs font-semibold m-1 mb-2">
                                                        <li className="border p-1 w-1/2 text-start">
                                                            <h2>{row.name_description}</h2>
                                                            <p className='text-start rounded bg-black text-white px-1'>{row.stock} (stock)</p>

                                                        </li>
                                                        <li className="border p-1 w-1/6">
                                                            <h2>{row.unit_measurement_abbreviation}</h2>
                                                        </li>
                                                        <li className="border p-1 w-1/4">
                                                            <h2>{row.selling_price}</h2>
                                                        </li>
                                                        <li className="border p-1 w-1/4">
                                                            <h2>0</h2>
                                                            <p>QTY.</p>
                                                        </li>
                                                    </ul>
                                                ))}
                                            </div>

                                            <ul className="fixed bottom-20 right-4 list-none flex bg-white shadow-md rounded text-center">
                                                <li className="border bg-base-100 text-white p-2 w-24 content-center">
                                                    <h2 className="font-semibold">REVIEW</h2>
                                                </li>
                                                <li className="border p-2 w-28 content-center">
                                                    <p className="text-xs">Total Amount</p>
                                                    <h2 className="text-base">12000.00</h2>
                                                </li>
                                                <li className="border p-2 w-28 content-center">
                                                    <p className="text-xs">Total QTY.</p>
                                                    <h2 className="text-base">12000</h2>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default PointOfSale