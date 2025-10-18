import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Navbar from "@/Layouts/StudentNavigation/Navbar";
import Sidebar from "@/Layouts/StudentNavigation/Sidebar";
import { Megaphone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Announcement({ user }) {
    // ✅ Initialize darkMode from localStorage
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === "true" || false;
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    // ✅ Persist dark mode in localStorage and update html class
    useEffect(() => {
        if (darkMode) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const announcements = [
        {
            id: 1,
            title: "Weekly Report Reminder",
            content:
                "Submit your weekly reports before Friday 5PM. Make sure your entries are complete and accurate for review.",
            date: "October 10, 2025",
            postedBy: "Coordinator: Mr. Dela Cruz",
        },
        {
            id: 2,
            title: "Attendance Notice",
            content:
                "Please make sure to time-in using the system daily to ensure your attendance is properly recorded.",
            date: "October 7, 2025",
            postedBy: "Coordinator: Ms. Santos",
        },
        {
            id: 3,
            title: "OJT Orientation",
            content:
                "Join the upcoming OJT Orientation scheduled next week. Details will be posted soon.",
            date: "October 5, 2025",
            postedBy: "Coordinator: Mr. Ramirez",
        },
    ];

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
            <Head title="Announcements" />

            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                />
            </div>

            {/* Page Content */}
            <div className="flex flex-1 pt-[70px]">
                {/* Sidebar */}
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                    darkMode={darkMode}
                />

                {/* Main Content */}
                <main className={`flex-1 transition-all duration-300 px-4 sm:px-6 py-6 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
                    <div className="max-w-6xl mx-auto space-y-3">
                        {/* Header */}
                        <div
                            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between`}
                        >
                            <h4 className="text-lg font-semibold">Announcements</h4>
                            <div className="sm:mt-0">
                                <ol className="flex flex-wrap gap-1 text-sm">
                                    <li className="opacity-70">
                                        <a
                                            href="javascript:void(0);"
                                            className={`hover:underline ${darkMode ? "text-gray-300" : "text-gray-600"
                                                }`}
                                        >
                                            List
                                        </a>
                                    </li>
                                    <li className="opacity-60">/</li>
                                    <li className="font-medium text-blue-600 dark:text-blue-400">
                                        Announcements
                                    </li>
                                </ol>
                            </div>
                        </div>

                        {/* Announcements List */}
                        <div className="grid gap-2 sm:gap-4">
                            {announcements.map((a) => (
                                <div key={a.id} className={`p-4 sm:p-5 rounded-lg border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${darkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-200 hover:bg-gray-50"}`}>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                        <div>
                                            <h4 className="font-semibold text-base sm:text-lg">{a.title}</h4>
                                            <p className="text-xs opacity-60">{a.date}</p>
                                            <p className="text-xs opacity-70 italic mt-1">{a.postedBy}</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedAnnouncement(a)}
                                            className="mt-3 sm:mt-0 text-sm px-3 py-1.5 rounded-md border font-medium transition hover:scale-105 active:scale-95
                                            dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white
                                            border-gray-300 hover:bg-gray-200"
                                        >
                                            View
                                        </button>
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed opacity-90 line-clamp-2">{a.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            {/* Backdrop for mobile sidebar */}
            {isMobileSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)}></div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {selectedAnnouncement && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]" onClick={() => setSelectedAnnouncement(null)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`max-w-md w-full mx-3 p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold">{selectedAnnouncement.title}</h3>
                                <button onClick={() => setSelectedAnnouncement(null)} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-sm opacity-90 leading-relaxed">{selectedAnnouncement.content}</p>
                            <p className="text-xs opacity-60 mt-3">{selectedAnnouncement.date}</p>
                            <p className="text-xs opacity-70 italic mt-1">{selectedAnnouncement.postedBy}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
