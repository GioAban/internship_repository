import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Building2,
    FileText,
    Megaphone,
    Calendar,
    Clock,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Sidebar({
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    darkMode,
}) {
    const sidebarLinks = [
        { icon: LayoutDashboard, text: "Dashboards", link: "/student-dashboard" },
        { icon: Megaphone, text: "Announcements", link: "/student-announcements" },
        { icon: FileText, text: "Doc. Requiremernts", link: "/student-documents-requirements" },
        { icon: Calendar, text: "Weekly Reports", link: "/student-weekly-reports" },
        { icon: Clock, text: "Daily Time Records", link: "/student-daily-time-records" },
        { icon: Building2, text: "Company", link: "/student-company" },
    ];

    return (
        <>
            {/* ✅ Desktop Sidebar */}
            <motion.aside
                className={`fixed top-0 left-0 h-screen shadow-lg z-[40] hidden lg:flex flex-col justify-between transition-all duration-300 ${darkMode
                    ? "bg-gray-900 border-r border-gray-700 text-gray-100"
                    : "bg-white border-r border-gray-200 text-gray-800"
                    } ${isSidebarOpen ? "w-64" : "w-20"}`}
                initial={false}
            >
                {/* Para hindi matakpan ng navbar, maglagay ng padding sa itaas */}
                <div className="pt-[70px] flex-1 overflow-y-auto">
                    <ul className="space-y-1 px-3">
                        {sidebarLinks.map(({ icon: Icon, text, link }, i) => (
                            <li key={i}>
                                <a
                                    href={link}
                                    className={`flex items-center gap-3 py-2 px-3 rounded-md hover:text-white hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors ${!isSidebarOpen ? "justify-center" : ""
                                        }`}
                                >
                                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                                    {isSidebarOpen && <span>{text}</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Collapse Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="flex items-center justify-center py-3 border-t border-gray-200 dark:border-gray-700 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    {isSidebarOpen ? (
                        <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    )}
                </button>
            </motion.aside>

            {/* ✅ Mobile Sidebar */}
            <motion.aside
                className={`fixed top-0 left-0 h-screen w-64 shadow-lg z-[50] lg:hidden transform transition-transform duration-300 ${darkMode
                    ? "bg-gray-900 text-gray-100 border-r border-gray-700"
                    : "bg-white text-gray-800 border-r border-gray-200"
                    } ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="pt-[70px]">
                    <ul className="space-y-2 px-5">
                        {sidebarLinks.map(({ icon: Icon, text, link }, i) => (
                            <li key={i}>
                                <a
                                    href={link}
                                    onClick={() => setIsMobileSidebarOpen(false)}
                                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                                    <span>{text}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.aside>

            {/* ✅ Overlay (click outside to close) */}
            {isMobileSidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/40 z-[45] lg:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                ></motion.div>
            )}
        </>
    );
}
