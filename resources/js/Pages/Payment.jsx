import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { toast } from 'react-hot-toast';

const Payment = () => {

    const [invoice, setInvoice] = useState(() => {
        const stored = localStorage.getItem('pos_invoice');
        return stored ? JSON.parse(stored) : [];
    });
    const [receipt_number, setReceiptNumber] = useState(() => parseFloat(localStorage.getItem('pos_receiptNumber')));
    const [amount_discount, setAmountDiscount] = useState(() => parseFloat(localStorage.getItem('pos_totalDiscount')));
    const [grandTotal, setGrandTotal] = useState(() => parseFloat(localStorage.getItem('pos_grandTotal')) || 0);
    const [status, setStatus] = useState("Completed");
    const [customer_name, setCustomerName] = useState(() => localStorage.getItem('pos_customerName') || '');
    const [customer_contact, setCustomerContact] = useState(() => localStorage.getItem('pos_customerContact') || '');
    const [customer_address, setCustomerAddress] = useState(() => localStorage.getItem('pos_customerAddress') || '');
    const [customer_note, setCustomerNote] = useState(() => localStorage.getItem('pos_customerNote') || '');
    const [amount_received, setAmountReceived] = useState('');
    const [change, setChange] = useState(0);
    const quickAmounts = [10, 20, 50, 100, 200, 300, 400, 500, 1000];
    const handleStatus = (e) => {
        setStatus(e.target.value);
    };
    const handleQuickAmount = (amount) => {
        const current = parseFloat(amount_received) || 0;
        setAmountReceived((current + amount).toString());
    };
    const handleExactAmount = () => {
        setAmountReceived(grandTotal.toString());
    };
    const submitPayment = async () => {
        if (!amount_received) {
            toast.error("Amount is required.");
            return { success: false };
        }
        try {
            const { data } = await axios.post('/api/invoiceStore', {
                invoice: invoice,
                receipt_number: receipt_number,
                amount_received: amount_received,
                amount_discount: amount_discount,
                customer_name: customer_name,
                customer_contact: customer_contact,
                customer_address: customer_address,
                customer_note: customer_note,
                status: status,
            });
            toast.success(data.message || "Product added successfully!");
            setInvoice([]);
            setReceiptNumber("");
            setAmountDiscount(0);
            setGrandTotal(0);
            setCustomerName("");
            setCustomerContact("");
            setCustomerAddress("");
            setCustomerNote("");
            setAmountReceived("");
            localStorage.clear();
            setConfirmModal(false);
            return { success: true, data };
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
            return { success: false };
        }
    };

    useEffect(() => {
        const received = parseFloat(amount_received);
        if (!isNaN(received)) {
            const computedChange = received - grandTotal;
            setChange(computedChange > 0 ? computedChange : 0);
        } else {
            setChange(0);
        }
    }, [amount_received, grandTotal]);

    const [showConfirmModal, setConfirmModal] = useState(false);
    const handlePaymentModal = () => {
        setConfirmModal(true);
    };
    const handleFinishPayment = async (e) => {
        e.preventDefault();
        const result = await submitPayment();
        if (result.success) {
            router.visit('/point-of-sale');
        }
    };
    const handleFinishPaymentPrint = async (e) => {
        e.preventDefault();
        const result = await submitPayment();
        if (result.success) {
            window.open(`/receipt/print/${result.data.receipt_id}`, '_blank', 'width=400,height=600');
            router.visit('/point-of-sale');
        }
    };


    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800"></h2>}
        >
            <Head title="Point of Sale" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="p-6 text-gray-900">
                    <div className='text-center mt-5'>
                        <h1 className='text-2xl mb-3 border-b-2'>Amount Payable</h1>
                        <p className='text-4xl mb-5 border-b-2'>
                            ₱ {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                    </div>

                    {parseFloat(amount_received) >= grandTotal && (
                        <div className='text-center mt-5'>
                            <h2 className='text-2xl border-b-2'>Change</h2>
                            <p className='text-3xl mb-3 border-b-2'>
                                {change > 0
                                    ? `₱ ${change.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                                    : 'No change'}
                            </p>
                        </div>
                    )}
                    <select
                        value={status}
                        onChange={handleStatus}
                        className="select text-black bg-white w-28"
                    >
                        <option value="Completed">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <div className='text-left mt-5'>
                        <p>Amount Received:</p>
                        <input
                            type='number'
                            className='w-full h-10 border rounded px-2 mb-4'
                            placeholder='Enter amount received'
                            value={amount_received}
                            onChange={(e) => setAmountReceived(e.target.value)}
                        />
                        <div className="grid grid-cols-3 gap-2">
                            {quickAmounts.map((amt) => (
                                <button
                                    key={amt}
                                    className="bg-gray-200 hover:bg-gray-300 text-black py-2 rounded"
                                    onClick={() => handleQuickAmount(amt)}
                                >
                                    {amt}
                                </button>
                            ))}
                            <button
                                className="col-span-3 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded mt-2"
                                onClick={handleExactAmount}
                            >
                                EXACT AMOUNT
                            </button>
                            <button
                                className="col-span-3 bg-green-300 hover:bg-gray-400 text-black py-2 rounded mt-2"

                                onClick={handlePaymentModal}
                            >
                                FINISH PAYMENT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4">
                {showConfirmModal && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                        onClick={() => setConfirmModal(false)} // click outside = close
                    >
                        <div
                            className="bg-white p-4 rounded shadow"
                            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                        >
                            <p className="mb-4 text-black">Do you want to print receipt?</p>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={handleFinishPaymentPrint}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={handleFinishPayment}
                                    className="bg-gray-300 px-3 py-1 rounded"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Payment;
