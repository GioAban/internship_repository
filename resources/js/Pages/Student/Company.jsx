import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Navbar from "@/Layouts/StudentNavigation/Navbar";
import Sidebar from "@/Layouts/StudentNavigation/Sidebar";

export default function CompanyInformation({ user }) {
    // ✅ Dark mode state
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === "true" || false;
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // ✅ Persist dark mode in localStorage
    useEffect(() => {
        if (darkMode) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const companyInfo = {
        name: "Tech Innovators Co.",
        description:
            "Tech Innovators Co. is a leading tech company focused on developing innovative software solutions that help businesses streamline their operations. We specialize in AI, machine learning, and cloud-based services.",
        address: "123 Tech Avenue, Silicon Valley, CA, USA",
        phone: "+1 (123) 456-7890",
        email: "contact@techinnovators.com",
        website: "www.techinnovators.com",
    };

    return (
        <div
            className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
                }`}
        >
            <Head title="Company Information" />

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
                <main
                    className={`flex-1 transition-all duration-300 px-4 sm:px-6 py-6 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
                        }`}
                >
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Header */}
                        <div
                            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between`}
                        >
                            <h4 className="text-lg font-semibold">Company</h4>
                            <div className="sm:mt-0">
                                <ol className="flex flex-wrap gap-1 text-sm">
                                    <li className="opacity-70">
                                        <a
                                            href="javascript:void(0);"
                                            className={`hover:underline ${darkMode ? "text-gray-300" : "text-gray-600"
                                                }`}
                                        >
                                            View
                                        </a>
                                    </li>
                                    <li className="opacity-60">/</li>
                                    <li className="font-medium text-blue-600 dark:text-blue-400">
                                        Company
                                    </li>
                                </ol>
                            </div>
                        </div>

                        {/* Company Information Card */}
                        <div
                            className={`rounded-lg shadow-md overflow-hidden border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                                }`}
                        >
                            {/* Table Header */}
                            <div
                                className={`px-6 py-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"
                                    }`}
                            >
                                <h5 className="text-2xl font-semibold">{companyInfo.name}</h5>
                                <p
                                    className={`mt-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"
                                        }`}
                                >
                                    {companyInfo.description}
                                </p>
                            </div>

                            {/* Table Body */}
                            <div className="px-6 py-4">
                                <div className="overflow-x-auto">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b sm:border-none pb-2 sm:pb-0">
                                            <span className="font-medium text-sm opacity-80">Address</span>
                                            <span className="text-sm">{companyInfo.address}</span>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b sm:border-none pb-2 sm:pb-0">
                                            <span className="font-medium text-sm opacity-80">Phone</span>
                                            <span className="text-sm">{companyInfo.phone}</span>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b sm:border-none pb-2 sm:pb-0">
                                            <span className="font-medium text-sm opacity-80">Email</span>
                                            <span className="text-sm">{companyInfo.email}</span>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                            <span className="font-medium text-sm opacity-80">Website</span>
                                            <a
                                                href={`https://${companyInfo.website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline text-sm"
                                            >
                                                {companyInfo.website}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
