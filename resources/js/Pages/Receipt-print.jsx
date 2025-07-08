import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';

const ReceiptPrint = ({ invoices }) => {
    useEffect(() => {
        window.print();
    }, []);

    if (invoices.length === 0) {
        return <p>No invoice found.</p>;
    }

    const receipt = invoices[0].receipt; // if eager-loaded, or you can pass it separately
    const customerName = receipt?.customer_name || 'N/A';
    const totalAmount = invoices.reduce((sum, item) => sum + item.total_amount, 0);

    return (
        <>
            <style>
                {`
                    @media print {
                        body {
                            width: 80mm;
                            margin: 0;
                            padding: 0;
                            font-size: 12px;
                        }
                        .no-print {
                            display: none;
                        }
                    }
                `}
            </style>
            <Head title={`Receipt #${invoices[0].receipt_id}`} />
            <div className='bg-white text-black' style={{ width: '80mm', padding: '10px' }}>
                <h2>Receipt #{invoices[0].receipt_id}</h2>
                <p>Customer: {customerName}</p>
                <hr />

                {invoices.map((item, index) => (
                    <div key={index}>
                        <p>
                            {item.product?.name_description || 'Unnamed Product'} x {item.quantity} = ₱
                            {(item.total_amount).toFixed(2)}
                        </p>
                    </div>
                ))}

                <hr />
                <p>Total: ₱{totalAmount.toFixed(2)}</p>
                <p>Thank you!</p>
            </div>
        </>
    );
};

export default ReceiptPrint;
