
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Timer, FileText, Megaphone, Calendar, Clock, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/Layouts/GuestNav/Navbar";

export default function Dashboard({ user }) {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : false;
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

    const hoursRendered = 100;
    const totalHours = 360;
    const percentage = Math.round((hoursRendered / totalHours) * 100);

    const stats = [
        { icon: Timer, label: "Hours Rendered", value: "100 hrs" },
        { icon: Clock, label: "To Render", value: "260 hrs" },
        { icon: Calendar, label: "Training Duration", value: "360 hrs" },
        { icon: Building2, label: "Company", value: "Municipality of Urdaneta city." }
    ];

    const quickActions = [
        { icon: FileText, text: "Requirements", link: "student-requirements" },
        { icon: Megaphone, text: "Announcements", link: "student-announcements" },
        { icon: Calendar, text: "Weekly Report", link: "student-weekly-reports" },
        { icon: Clock, text: "DTR", link: "student-daily-time-records" }
    ];

    return (
        <>
            <Head title="Student Dashboard" />

            {/* Navbar */}
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Main Content */}
            <main className="pt-24 pb-20 px-6 min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
                {/* Stats */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {stats.map(({ icon: Icon, label, value }, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl p-5 flex items-center gap-4"
                        >
                            <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
                                <Icon className="w-6 h-6 text-blue-700 dark:text-blue-200" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                                <h2 className="text-lg font-bold">{value}</h2>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* Time Progress */}
                {/* Time Progress */}
                <section className="bg-white dark:bg-gray-900 shadow-sm rounded-xl p-6 mb-6">
                    <h3 className="text-base font-semibold mb-3">Time Progress</h3>

                    <div className="relative w-full">
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                            <motion.div
                                className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>

                        {/* Milestones as dots */}
                        {[25, 50, 75, 100].map((milestone) => (
                            <div
                                key={milestone}
                                className="absolute top-1/2 transform -translate-y-1/2"
                                style={{ left: `${milestone}%` }}
                            >
                                <div
                                    className={`w-3 h-3 rounded-full border-2 ${percentage >= milestone
                                        ? "bg-blue-600 border-blue-700"
                                        : "bg-white dark:bg-gray-900 border-gray-400"
                                        }`}
                                    style={{ transform: "translateX(-50%)" }}
                                />
                                <span className="absolute mt-2 text-xs text-gray-600 dark:text-gray-400 transform -translate-x-1/2">
                                    {milestone}%
                                </span>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs mt-3 text-gray-600 dark:text-gray-400 mt-8">
                        {hoursRendered} hrs rendered out of {totalHours} hrs ({percentage}%)
                    </p>
                </section>


                {/* Quick Actions */}
                <section>
                    <h3 className="text-base font-semibold mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {quickActions.map(({ icon: Icon, text, link }, i) => (
                            <motion.a
                                key={i}
                                href={link}
                                whileTap={{ scale: 0.97 }}
                                whileHover={{ y: -2 }}
                                className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl py-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <Icon className="w-7 h-7 mb-2" />
                                <p className="text-sm font-medium">{text}</p>
                            </motion.a>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

