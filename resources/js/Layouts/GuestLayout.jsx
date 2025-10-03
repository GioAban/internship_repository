// GuestLayout.jsx
import { motion } from "framer-motion";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-4 sm:px-6 lg:px-8">
            {/* Logos */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 lg:gap-6">
                <motion.img
                    src="/images/ucu_logo.png"
                    alt="University Logo"
                    className="hidden sm:block h-28 w-auto md:h-40 lg:h-52 object-contain"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                />
                <motion.img
                    src="/images/internship_logo.png"
                    alt="Internship Logo"
                    className="h-24 w-auto sm:h-28 md:h-36 lg:h-44 object-contain"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                />
            </div>

            {/* Title */}
            <motion.h1
                className="text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-4xl max-w-4xl leading-snug"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Welcome to University City University Student Internship Programs
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="mt-3 text-center text-base sm:text-lg text-blue-100 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Connecting Students, Coordinators, and Partner Companies
            </motion.p>

            {/* Children (Login Form) */}
            <div className="mt-8 w-full max-w-xs sm:max-w-md md:max-w-lg">
                {children}
            </div>
        </div>
    );
}
