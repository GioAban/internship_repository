import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center py-2 text-md font-medium leading-6 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-blue-900 text-white' // active background
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:text-gray-700') +
                ' ' +
                className
            }
        >
            {children}
        </Link>

    );
}
