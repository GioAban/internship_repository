import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Navbar from "@/Layouts/StudentNavigation/Navbar";
import Sidebar from "@/Layouts/StudentNavigation/Sidebar";
import { FileText, Building2, Clock, UserCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard({ user }) {
    // ✅ Dark mode setup
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("darkMode");
            if (saved !== null) return saved === "true";
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    const [mounted, setMounted] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useEffect(() => setMounted(true), []);
    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    if (!mounted) return null;

    // Data
    const totalHoursRequired = 500;
    const renderedHours = 152;
    const remainingHours = totalHoursRequired - renderedHours;

    // ✅ Determine status dynamically
    let studentStatus = "Pending";
    if (renderedHours > 0 && renderedHours < totalHoursRequired) {
        studentStatus = "Ongoing";
    } else if (renderedHours >= totalHoursRequired) {
        studentStatus = "Completed";
    }

    // ✅ Status color
    const statusColor = {
        Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        Ongoing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        Completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    }[studentStatus];

    const requirements = [
        { title: "Initial Requirements", uploaded: 3, total: 5 },
        { title: "Pre-Deployment Requirements", uploaded: 4, total: 6 },
        { title: "Post-Deployment Requirements", uploaded: 1, total: 3 },
    ];

    const stats = [
        {
            title: "Rendered Hours",
            value: `${renderedHours} hrs`,
            icon: Clock,
            color: "text-blue-500",
            description: "Hours completed in OJT",
        },
        {
            title: "Remaining Hours",
            value: `${remainingHours} hrs`,
            icon: Clock,
            color: "text-green-500",
            description: "Hours left to complete",
        },
        {
            title: "Total Training Hours",
            value: `${totalHoursRequired} hrs`,
            icon: Clock,
            color: "text-yellow-500",
            description: "Overall required hours",
        },
    ];

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-950 text-gray-100" : "bg-gray-100 text-gray-800"
                }`}
        >
            <Head title="Dashboard" />
            <Navbar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                isMobileSidebarOpen={isMobileSidebarOpen}
                setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isMobileSidebarOpen={isMobileSidebarOpen}
                setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                darkMode={darkMode}
            />

            <main
                className={`pt-[90px] px-4 sm:px-5 md:px-6 pb-10 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
                    }`}
            >
                <div className="max-w-6xl mx-auto space-y-5">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3">
                        <h4 className="text-lg font-semibold">Dashboard Overview</h4>
                        <ol className="flex gap-2 text-sm opacity-80">
                            <li>
                                <a href="#" className="hover:underline">OJT Status</a>
                            </li>
                            <li>/</li>
                            <li className="font-medium text-blue-900 dark:text-blue-900">
                                <p className={`inline-block px-2 text-sm font-medium ${statusColor}`}>
                                    {studentStatus}
                                </p>
                            </li>
                        </ol>
                    </div>


                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stats.map(({ title, value, icon: Icon, color, description }, i) => (
                            <div
                                key={i}
                                className={`p-5 border shadow-sm flex items-start gap-4 rounded-sm transition-all duration-200 ${darkMode
                                    ? "bg-gray-900 border-gray-800 hover:bg-gray-800"
                                    : "bg-white border-gray-200 hover:shadow-md"
                                    }`}
                            >
                                <div className={`p-3 rounded-full bg-opacity-10 ${color}`}>
                                    <Icon className={`w-6 h-6 ${color}`} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-base">{title}</h4>
                                    <p className="text-lg font-bold">{value}</p>
                                    <p className="text-xs opacity-70 mt-1">{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* OJT Progress */}
                    <section
                        className={`p-5 border rounded-sm shadow-sm transition-all duration-200 ${darkMode
                            ? "bg-gray-900 border-gray-800"
                            : "bg-white border-gray-200"
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Clock className="w-5 h-5 text-blue-500" />
                            <h3 className="text-lg font-semibold">OJT Progress</h3>
                        </div>
                        <div className="h-40 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        {
                                            name: "OJT Hours",
                                            Rendered: renderedHours,
                                            Remaining: remainingHours,
                                        },
                                    ]}
                                    layout="vertical"
                                    margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                                >
                                    <XAxis type="number" domain={[0, totalHoursRequired]} />
                                    <YAxis type="category" dataKey="name" />
                                    <Tooltip />
                                    <Bar dataKey="Rendered" stackId="a" fill="#3b82f6" />
                                    <Bar dataKey="Remaining" stackId="a" fill="#9ca3af" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    {/* Requirements */}
                    <section
                        className={`p-5 border rounded-sm shadow-sm transition-all duration-200 ${darkMode
                            ? "bg-gray-900 border-gray-800"
                            : "bg-white border-gray-200"
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <FileText className="w-5 h-5 text-indigo-500" />
                            <h3 className="text-lg font-semibold">Requirements Progress</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {requirements.map((req, index) => {
                                const progress = Math.round((req.uploaded / req.total) * 100);
                                return (
                                    <div
                                        key={index}
                                        className={`p-4 border shadow-sm text-center transition rounded-lg ${darkMode
                                            ? "bg-gray-800 border-gray-700"
                                            : "bg-gray-50 border-gray-200"
                                            }`}
                                    >
                                        <h4 className="font-semibold mb-2">{req.title}</h4>
                                        <div className="flex justify-center gap-1 mb-2">
                                            {[...Array(req.total)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-3 w-6 rounded ${i < req.uploaded
                                                        ? "bg-blue-500"
                                                        : "bg-gray-300 dark:bg-gray-600"
                                                        }`}
                                                ></div>
                                            ))}
                                        </div>
                                        <p className="text-xs opacity-70">
                                            {req.uploaded} of {req.total} files uploaded
                                        </p>
                                        <p className="text-sm font-medium mt-1">{progress}%</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
