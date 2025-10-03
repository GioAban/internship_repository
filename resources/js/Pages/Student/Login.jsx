import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button } from "@/components/ui/button";
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // optional kung may icon library ka

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        student_number: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head title="Student Login" />
            <div className="min-h-screen flex flex-col lg:flex-row">

                {/* Left Section (branding) */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10"
                >
                    <div className="flex flex-row items-center justify-center gap-2 sm:gap-3">
                        <motion.img
                            src="/images/ucu_logo.png"
                            alt="University Logo"
                            className="h-20 w-16 sm:h-40 sm:w-32 lg:h-64 lg:w-48 max-w-full"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        />

                        <motion.img
                            src="/images/internship_logo.png"
                            alt="Internship Logo"
                            className="h-16 w-12 sm:h-32 sm:w-24 lg:h-48 lg:w-44 max-w-full"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        />
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-snug">
                        Welcome to University City University Student Internship Programs
                    </h1>
                    <p className="mt-4 text-gray-200 text-center text-sm sm:text-base max-w-md">
                        Access your internship resources, track progress, and stay connected.
                    </p>
                </motion.div>

                {/* Right Section (login form) */}
                <main className="flex-1 flex items-center justify-center bg-neutral-90 px-6 py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h2>
                        <p className="text-gray-500 text-center mt-1">Login with your Student Number</p>

                        <form onSubmit={submit} className="mt-8 space-y-5">
                            {/* Student Number */}
                            <div>
                                <InputLabel htmlFor="student_number" value="Student Number" />
                                <TextInput
                                    id="student_number"
                                    type="text"
                                    name="student_number"
                                    value={data.student_number}
                                    className="mt-2 block w-full border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 px-4 py-3 text-sm rounded-lg"
                                    placeholder="Enter your student number"
                                    autoComplete="off"
                                    isFocused={true}
                                    onChange={(e) => setData('student_number', e.target.value)}
                                />
                                <InputError message={errors.student_number} className="mt-2 text-sm" />
                            </div>

                            {/* Password with Show/Hide */}
                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <div className="relative mt-2">
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                        className="block w-full border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 px-4 py-3 text-sm rounded-lg pr-10"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-2 text-sm" />
                            </div>

                            {/* Forgot Password */}
                            {canResetPassword && (
                                <div className="flex justify-end">
                                    <Link
                                        href={route('password.request')}
                                        className="text-blue-700 text-sm font-medium hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            )}

                            {/* Login Button */}
                            <Button
                                type="submit"
                                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition"
                                disabled={processing}
                            >
                                {processing ? "Logging in..." : "Log in"}
                            </Button>
                        </form>
                    </motion.div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-blue-900 text-center text-gray-200 py-4 text-xs sm:text-sm">
                © {new Date().getFullYear()} UCU Internship Portal. All rights reserved.
            </footer>
        </>
    );
}
