import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/Layouts/GuestNav/Navbar";

export default function Announcement({ user }) {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : true;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);



    return (
        <>
            <Head title="Student Announcement" />

            {/* Navbar */}
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Main Content */}
            <main className="pt-20 pb-20 px-5 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                {/* Stats */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">

                </section>

                {/* Time Progress */}
                <section className="bg-white dark:bg-gray-800 shadow-md rounded-sm p-3 mb-3">

                </section>


            </main>
        </>
    );
}
