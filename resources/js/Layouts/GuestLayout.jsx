import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-black pt-6 sm:justify-center sm:pt-0">
            <div className='mt-6'>
                <Link href="/">
                    <ApplicationLogo className="h-40 w-40 fill-current text-gray-500 " />
                    <h1>INVENTORY SYSTEM</h1>
                </Link>
            </div>
            <div className="mt-5 overflow-hidden px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg text-white">
                {children}
            </div>
        </div>
    );
}
