import { useState } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ darkMode, setDarkMode }) {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md z-50">
            <div className="flex justify-between items-center px-6 py-5">
                <h1 className="font-bold text-lg">UCU Internship</h1>

                <div className="flex items-center space-x-3">
                    {/* Dark/Light mode toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <div className="w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 transition-colors duration-300 relative">
                            <div
                                className={`absolute top-1 left-1 w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-sm ${darkMode ? "translate-x-7 bg-gray-800" : "translate-x-0 bg-yellow-300"}`}
                            >
                                {darkMode ? <Moon /> : <Sun />}
                            </div>
                        </div>
                    </label>

                    {/* Menu Button */}
                    <div className="relative">
                        <button
                            className="text-white"
                            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <AnimatePresence>
                            {isMobileNavOpen && (
                                <motion.ul
                                    className="absolute right-0 mt-2 w-48 bg-blue-700/90 backdrop-blur text-white text-sm p-4 space-y-3 rounded-md shadow-lg"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <li><a href="#notification" className="hover:underline">Notification</a></li>
                                    <li><a href="#company" className="hover:underline">Company</a></li>
                                    <li><a href="#profile" className="hover:underline">Profile</a></li>
                                    <li><a href="#settings" className="hover:underline">Settings</a></li>
                                    <li><a href="#logout" className="text-red-300 hover:underline">Logout</a></li>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
