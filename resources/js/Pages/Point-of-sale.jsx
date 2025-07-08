import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { CiSearch } from "react-icons/ci";

const PointOfSale = () => {
    const { categories, products } = usePage().props;
    const [invoice, setInvoice] = useState(() => {
        const stored = localStorage.getItem('pos_invoice');
        return stored ? JSON.parse(stored) : [];
    });
    const [totalQty, setTotalQty] = useState(() => {
        return parseInt(localStorage.getItem('pos_totalQty')) || 0;
    });
    const [totalAmount, setTotalAmount] = useState(() => {
        return parseFloat(localStorage.getItem('pos_totalAmount')) || 0;
    });
    useEffect(() => {
        const qty = invoice.reduce((sum, item) => sum + item.qty, 0);
        const amount = invoice.reduce((sum, item) => sum + item.qty * item.selling_price, 0);
        setTotalQty(qty);
        setTotalAmount(amount);
        localStorage.setItem('pos_invoice', JSON.stringify(invoice));
        localStorage.setItem('pos_totalQty', qty.toString());
        localStorage.setItem('pos_totalAmount', amount.toString());
    }, [invoice]);
    const handleClear = () => {
        setInvoice([]);
        setTotalQty(0);
        setTotalAmount(0);
        localStorage.clear();
    };
    const handleReview = () => {
        router.post(`/review-invoice`);
    };
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Point of Sale</h2>}>
            <Head title="Point of Sale" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6 text-gray-900">
                        <div className="flex">
                            <div className="w-1/4 border p-1">
                                <h3 className="text-sm font-semibold border-b p-2">All</h3>
                                {categories.map((row) => (
                                    <ul className="list-none" key={row.id}>
                                        <li className="border-b p-1">{row.name}</li>
                                    </ul>
                                ))}
                            </div>
                            <div className="w-5/6 border">
                                <div className="flex p-1">
                                    <input type="text" placeholder="Search products" className="input input-sm border border-black w-full bg-transparent mt-1" />
                                    <button className="btn btn-soft btn-sm m-1"><CiSearch /></button>
                                </div>
                                <ul className="list-none flex text-center text-xs font-semibold m-1 mb-3 border-2">
                                    <li className="border-r-2 p-2 w-1/3">SK</li>
                                    <li className="border-r-2 p-2 w-1/3">KG</li>
                                    <li className="border-r-2 p-2 w-1/3">PCS</li>
                                    <li className="p-2 w-1/3">PK</li>
                                </ul>
                                <ul className="list-none flex text-center text-xs font-semibold bg-black text-white mb-3">
                                    <li className="border p-1 w-1/2 text-start"><h2>Product</h2></li>
                                    <li className="border p-1 w-1/6"><h2>Unit</h2></li>
                                    <li className="border p-1 w-1/4"><h2>Price</h2></li>
                                    <li className="border p-1 w-1/4"><h2>QTY.</h2></li>
                                </ul>
                                <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ height: '460px' }}>
                                    {products.map((row) => {
                                        const productQty = invoice.find(item => item.id === row.id)?.qty || 0;
                                        return (
                                            <ul
                                                key={row.id}
                                                className="border-b list-none flex text-center text-xs font-semibold m-1 mb-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    setInvoice(prev => {
                                                        const existing = prev.find(p => p.id === row.id);
                                                        if (existing) {
                                                            return prev.map(p => p.id === row.id ? { ...p, qty: p.qty + 1 } : p);
                                                        } else {
                                                            return [...prev, {
                                                                id: row.id,
                                                                name_description: row.name_description,
                                                                unit_measurement_abbreviation: row.unit_measurement_abbreviation,
                                                                qty: 1,
                                                                selling_price: row.selling_price,
                                                                cost_price: row.cost_price,
                                                            }];
                                                        }
                                                    });
                                                }}
                                            >
                                                <li className="p-1 w-1/2 text-start">
                                                    <h2>{row.name_description}</h2>
                                                    <p className="text-start rounded bg-black text-white px-1 w-2/3">{row.stock} (stock)</p>
                                                </li>
                                                <li className="p-1 w-1/6">{row.unit_measurement_abbreviation}</li>
                                                <li className="p-1 w-1/4">{row.selling_price}</li>
                                                <li className={`p-1 w-1/4 ${productQty > 0 ? 'bg-success' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setInvoice(prev => {
                                                            const updated = prev.map(p =>
                                                                p.id === row.id ? { ...p, qty: p.qty - 1 } : p
                                                            ).filter(p => p.qty > 0);
                                                            return updated;
                                                        });
                                                    }}
                                                >
                                                    <h2>{productQty}</h2>
                                                    <p>QTY.</p>
                                                </li>
                                            </ul>
                                        );
                                    })}
                                </div>
                                <ul className="fixed bottom-20 left-0 w-full list-none flex justify-end  text-center z-50">
                                    <li className="border bg-red-500 text-white p-2 w-24 hover:bg-red-700 cursor-pointer" onClick={handleClear}>
                                        <h2 className="font-semibold">CLEAR</h2>
                                    </li>
                                    <li className="border bg-green-600 text-white p-2 w-24 hover:bg-green-700 cursor-pointer" onClick={handleReview}>
                                        <h2 className="font-semibold">REVIEW</h2>
                                    </li>
                                    <li className="border p-2 w-28 bg-white">
                                        <p className="text-xs">Total Amount</p>
                                        <h2 className="text-base">₱ {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                                    </li>
                                    <li className="border p-2 w-28 bg-white">
                                        <p className="text-xs">Total QTY.</p>
                                        <h2 className="text-base">{totalQty}</h2>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default PointOfSale;
