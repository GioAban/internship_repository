import { useState } from "react";
import { Sun, Moon, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, usePage } from "@inertiajs/react";

export default function Navbar({ darkMode, setDarkMode, isMobileSidebarOpen, setIsMobileSidebarOpen }) {
    const { auth } = usePage().props; // get the global auth.user shared from AppServiceProvider
    const user = auth?.user;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route("student.company.logout")); // adjust route if needed for admin/students/companies
    };

    return (
        <header className={`fixed top-0 left-0 w-full shadow-md z-[60] transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100 border-b border-gray-700" : "bg-gradient-to-r from-blue-600 to-blue-800 text-white"}`}>
            <div className="flex justify-between items-center px-4 sm:px-6 py-4">

                {/* Left Section */}
                <div className="flex items-center gap-4">
                    {/* Mobile Sidebar Toggle */}
                    <button
                        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                        className="lg:hidden p-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-800 transition z-[70] relative"
                    >
                        {isMobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                    <h1 className="font-bold text-lg tracking-wide">IMIS</h1>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <div className={`w-14 h-7 rounded-full transition-colors relative ${darkMode ? "bg-gray-700" : "bg-blue-400 hover:bg-blue-500"}`}>
                            <div className={`absolute top-1 left-1 w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-sm ${darkMode ? "translate-x-7 bg-gray-900 text-yellow-300" : "bg-yellow-300 text-gray-800"}`}>
                                {darkMode ? <Moon size={14} /> : <Sun size={14} />}
                            </div>
                        </div>
                    </label>

                    {/* Account Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-1 font-medium hover:opacity-80 transition"
                        >
                            <span>{user?.firstname && user?.lastname ? `${user.firstname} ${user.lastname}` : user?.email || "user@example.com"}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.ul
                                    className={`absolute right-0 mt-2 w-44 text-sm p-3 space-y-2 rounded-md shadow-lg transition ${darkMode ? "bg-gray-800 text-gray-100 border border-gray-700" : "bg-white text-gray-800 border border-gray-200"}`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <li>
                                        <a href="/student-profile" className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#settings" className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
                                    </li>
                                    <li>
                                        <a
                                            href="#logout"
                                            onClick={handleLogout}
                                            className="block px-2 py-1 rounded hover:bg-red-100 text-red-600 dark:hover:bg-gray-700 dark:text-red-400"
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
