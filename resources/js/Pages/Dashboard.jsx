import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { BiBlanket } from "react-icons/bi";
import { BiReceipt } from "react-icons/bi";
import { BiSolidReport } from "react-icons/bi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { BiLogoProductHunt } from "react-icons/bi";
import { BiBox } from "react-icons/bi";
export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6 text-white">
                        <div className='bg-black border px-3 text-center'>
                            <h1>INVENTORY SYSTEM</h1>
                        </div>
                        <div className='flex'>
                            <div className='bg-success border w-1/2 hover:bg-green-950 transition-colors duration-300'>
                                <Link href={"/point-of-sale"} className='flex p-3'>
                                    <BiBlanket className='m-1' />
                                    <p>POS</p>
                                </Link>
                            </div>
                            <div className='bg-success border w-1/2 hover:bg-green-950 transition-colors duration-300'>
                                <Link href={"/receipts"} className='flex p-3'>
                                    <BiReceipt className='m-1' />
                                    <p>RECEIPTS</p>
                                </Link>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='bg-success border w-1/2 hover:bg-green-950 transition-colors duration-300'>
                                <Link href="#" className='flex p-3'>
                                    <BiSolidReport className='m-1' />
                                    <p>REPORTS</p>
                                </Link>
                            </div>
                            <div className='bg-success border w-1/2 hover:bg-green-950 transition-colors duration-300'>
                                <Link href="#" className='flex p-3'>
                                    <BiMoneyWithdraw className='m-1' />
                                    <p>EXPENSES</p>
                                </Link>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='bg-success border w-1/2 hover:bg-green-950 transition-colors duration-300'>
                                <Link href="#" className='flex p-3'>
                                    <BiBox className='m-1' />
                                    <p>INVENTORY</p>
                                </Link>
                            </div>
                            <div className='bg-success border w-1/2 hover:bg-green-950 transition-colors duration-300'>
                                <Link href={"/products"} className='flex p-3'>
                                    <BiPurchaseTagAlt className='m-1' />
                                    <h1>PRODUCTS</h1>
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
