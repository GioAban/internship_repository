import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { CiTrash } from "react-icons/ci";
const ReviewInvoice = () => {
    const { receiptNumber } = usePage().props;
    const date = new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" });
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
    const [discount, setDiscount] = useState(() => {
        return parseFloat(localStorage.getItem('pos_totalDiscount')) || 0;
    });
    const [grandTotal, setGrandTotal] = useState(() => {
        return parseFloat(localStorage.getItem('pos_grandTotal')) || 0;
    });
    const [receipt_number, setReceiptNumber] = useState(() => {
        return localStorage.getItem('pos_receiptNumber') || '';
    });
    const [customer_name, setCustomerName] = useState(() => {
        return localStorage.getItem('pos_customerName') || '';
    });
    const [customer_contact, setCustomerContact] = useState(() => {
        return localStorage.getItem('pos_customerContact') || '';
    });
    const [customer_address, setCustomerAddress] = useState(() => {
        return localStorage.getItem('pos_customerAddress') || '';
    });
    const [customer_note, setCustomerNote] = useState(() => {
        return localStorage.getItem('pos_customerNote') || '';
    });
    useEffect(() => {
        const qty = invoice.reduce((sum, item) => sum + item.qty, 0);
        const amount = invoice.reduce((sum, item) => sum + item.qty * item.selling_price, 0);
        setTotalQty(qty);
        setTotalAmount(amount);
    }, [invoice]);
    useEffect(() => {
        const computed = totalAmount - discount;
        setGrandTotal(computed >= 0 ? computed : 0);
    }, [totalAmount, discount]);
    // Save to localStorage on each change
    useEffect(() => {
        localStorage.setItem('pos_totalDiscount', discount.toString());
        localStorage.setItem('pos_grandTotal', grandTotal.toString());
    }, [discount, grandTotal]);
    useEffect(() => {
        localStorage.setItem('pos_receiptNumber', receiptNumber);
    }, [receipt_number]);
    useEffect(() => {
        localStorage.setItem('pos_customerName', customer_name);
    }, [customer_name]);
    useEffect(() => {
        localStorage.setItem('pos_customerContact', customer_contact);
    }, [customer_contact]);
    useEffect(() => {
        localStorage.setItem('pos_customerAddress', customer_address);
    }, [customer_address]);
    useEffect(() => {
        localStorage.setItem('pos_customerNote', customer_note);
    }, [customer_note]);
    useEffect(() => {
        localStorage.setItem('pos_totalDiscount', discount.toString());
        localStorage.setItem('pos_grandTotal', grandTotal.toString());
    }, [discount, grandTotal]);
    const handlePriceChange = (id, newPrice) => {
        if (newPrice < 0 || newPrice > 4999999.99) {
            alert("Price must be between ₱0.00 and ₱4999999.99");
            return;
        }
        setInvoice(prev => {
            const updatedInvoice = prev.map(item => {
                if (item.id === id) {
                    return { ...item, selling_price: newPrice };
                }
                return item;
            });
            updateLocalStorage(updatedInvoice);
            return updatedInvoice;
        });
    };
    const handleIncrease = (id) => {
        setInvoice(prev => {
            const updatedInvoice = prev.map(item => {
                if (item.id === id) {
                    return { ...item, qty: item.qty + 1 };
                }
                return item;
            });
            updateLocalStorage(updatedInvoice);
            return updatedInvoice;
        });
    };
    const handleDecrease = (id) => {
        setInvoice(prev => {
            const updatedInvoice = prev.map(item => {
                if (item.id === id && item.qty > 1) {
                    return { ...item, qty: item.qty - 1 };
                }
                return item;
            });
            updateLocalStorage(updatedInvoice);
            return updatedInvoice;
        });
    };
    const updateLocalStorage = (updatedInvoice) => {
        const qty = updatedInvoice.reduce((sum, item) => sum + item.qty, 0);
        const amount = updatedInvoice.reduce((sum, item) => sum + item.qty * item.selling_price, 0);
        localStorage.setItem('pos_invoice', JSON.stringify(updatedInvoice));
        localStorage.setItem('pos_totalQty', qty.toString());
        localStorage.setItem('pos_totalAmount', amount.toString());
        setTotalQty(qty);
        setTotalAmount(amount);
    };
    const handleRemove = (id) => {
        setInvoice(prev => {
            const updatedInvoice = prev.filter(item => item.id !== id);
            const qty = updatedInvoice.reduce((sum, item) => sum + item.qty, 0);
            const amount = updatedInvoice.reduce((sum, item) => sum + item.qty * item.selling_price, 0);
            localStorage.setItem('pos_invoice', JSON.stringify(updatedInvoice));
            localStorage.setItem('pos_totalQty', qty.toString());
            localStorage.setItem('pos_totalAmount', amount.toString());
            setTotalQty(qty);
            setTotalAmount(amount);
            return updatedInvoice;
        });
    };
    const handleDiscountChange = (value) => {
        const num = parseFloat(value);
        if (num < 0 || num > totalAmount) {
            alert("Invalid discount");
            return;
        }
        setDiscount(num || 0);
    };
    const handleClear = () => {
        setInvoice([]);
        setTotalQty(0);
        setTotalAmount(0);
        setDiscount(0);
        setGrandTotal(0);
        localStorage.clear();
        router.get('/point-of-sale');
    };
    const handleProceedPayment = () => {
        router.get(`/proceed-payment`);
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center text-gray-800">
                    <p>#{receipt_number}</p>
                    <p className="text-xs bg-red-500 text-white p-1 hover:bg-red-700"
                        onClick={handleClear}>CLEAR</p>
                </div>
            }
        >
            <Head title="Review Invoice" />
            <div className="text-black">
                <div className=" mx-auto sm:px-2">
                    <p className='text-right'><span className='mb-3 text-xs px-2'>{date}</span></p>
                    <div className="overflow-hidden p-2">
                        {invoice.length === 0 ? (
                            <p>No items selected.</p>
                        ) : (
                            <table className="w-full table-auto border text-xs">
                                <thead>
                                    <tr className="bg-gray-100">

                                        <th className="border-r-2 px-1 text-left w-1/2">Product</th>
                                        <th className="px-1"></th>
                                        <th className="px-1">Qty</th>
                                        <th className="border-r-2 px-1"></th>
                                        <th className="border-r-2 px-1 text-right">Price</th>
                                        <th className="border-r-2 px-1 text-right">Sub. total</th>
                                        <th className="border-r-2 px-1"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.map((item, index) => (
                                        <tr key={item.id}>

                                            <td className="border px-1 w-1/2">{item.name_description} ({item.unit_measurement_abbreviation})</td>
                                            <td className="border px-1 text-center bg-error" onClick={() => handleDecrease(item.id)}>
                                                -
                                            </td>
                                            <td className="border px-1 text-center">
                                                <span className='px-1'>{item.qty}</span>
                                            </td>
                                            <td className="border px-1 text-center bg-neutral-content" onClick={() => handleIncrease(item.id)}>
                                                +
                                            </td>
                                            <td className="border px-1 text-right">
                                                <input
                                                    type="number"
                                                    className="w-16 h-4 text-right border text-xs"
                                                    value={item.selling_price}
                                                    min="0"
                                                    step="0"
                                                    onChange={(e) => handlePriceChange(item.id, parseFloat(e.target.value) || 0)}
                                                />
                                            </td>
                                            <td className="border px-1 text-right">
                                                {(item.qty * item.selling_price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="border px-1 w-2">
                                                <CiTrash className='text-error text-base' onClick={() => handleRemove(item.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <div className='text-left text-xs mt-3'>
                            <p>
                                Discount:
                                <input
                                    type='number'
                                    className='w-20 h-4 text-right border text-xs ml-1'
                                    value={discount}
                                    min="0"
                                    step="0"
                                    max={totalAmount}
                                    disabled={invoice.length === 0}
                                    onChange={(e) => handleDiscountChange(e.target.value)}
                                />

                            </p>
                        </div>
                        <div className='text-end text-xs border-t-2 border-b-2 mt-2 mb-2 p-2'>
                            <p>Total Quantity: <span className='font-extrabold'>{totalQty.toLocaleString('en-PH', { minimumFractionDigits: 0 })}</span></p>
                            <p>Total Amount: <span className='font-extrabold'>₱ {totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span></p>
                            <p>Discount: <span className='font-extrabold'>₱ {discount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span></p>
                            <p>Delivery Fee: <span className='font-extrabold'>₱ 0.00</span></p>
                            <p>Grand Total: <span className='font-extrabold'>₱ {grandTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span></p>
                        </div>
                        <div className='text-left text-xs p-4'>
                            <p className='font-extrabold'>Customer Information (Optional)</p>
                            <div className='space-y-1 text-xs'>
                                <div className='text-left'>
                                    <p>Name: </p>
                                    <input
                                        type='text'
                                        className='w-full h-7 border'
                                        value={customer_name}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                    />
                                </div>
                                <div className='text-left'>
                                    <p>Contact: </p>
                                    <input
                                        type='text'
                                        className='w-full h-7 border'
                                        value={customer_contact}
                                        onChange={(e) => setCustomerContact(e.target.value)}
                                    />
                                </div>
                                <div className='text-left'>
                                    <p>Address:</p>
                                    <input
                                        type='text'
                                        className='w-full h-7 border'
                                        value={customer_address}
                                        onChange={(e) => setCustomerAddress(e.target.value)}
                                    />
                                </div>
                                <div className='text-left'>
                                    <p>Note:</p>
                                    <input
                                        type='text'
                                        className='w-full h-7 border'
                                        value={customer_note}
                                        onChange={(e) => setCustomerNote(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='text-xs p-4'>
                            <button
                                className='btn btn-success w-full mt-2'
                                onClick={handleProceedPayment}
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
};
export default ReviewInvoice;
