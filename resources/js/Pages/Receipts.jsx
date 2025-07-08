import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
const Receipts = () => {
    const { receipts } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800">
                    Receipts
                </h2>
            }
        >
            <Head title="Receipts" />
            <div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mt-2 text-white">
                        <table className="w-full text-base text-black bg-white">
                            <thead className="border text-black border">
                                <tr>
                                    <th className='w-1/2 border ps-2'>Receipt #</th>
                                    <th className='border ps-2'>total_amount</th>
                                    <th className="text-right border ps-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {receipts.map((row) => (
                                    <tr key={row.id} className='border'>
                                        <td className='border ps-2'>{row.receipt_number}</td>
                                        <td className='border ps-2'>{row.total_amount}</td>
                                        <td className='border ps-2'>-</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
export default Receipts