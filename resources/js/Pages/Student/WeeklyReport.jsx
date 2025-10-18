import { Head } from "@inertiajs/react";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/Layouts/StudentNavigation/Navbar";
import Sidebar from "@/Layouts/StudentNavigation/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function WeeklyReport({ user }) {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [weekReports, setWeekReports] = useState([
        { id: 1, week: "Week 1", signed: true, addedAt: new Date().toLocaleString() },
        { id: 2, week: "Week 2", signed: false, addedAt: new Date().toLocaleString() },
        { id: 3, week: "Week 3", signed: true, addedAt: new Date().toLocaleString() },
        { id: 4, week: "Week 4", signed: false, addedAt: new Date().toLocaleString() },
        { id: 5, week: "Week 5", signed: true, addedAt: new Date().toLocaleString() },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newWeek, setNewWeek] = useState("");
    const [newSigned, setNewSigned] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Dark mode effect
    useEffect(() => {
        if (darkMode) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    // Filtered reports based on search and filter
    const filteredReports = useMemo(() => {
        return weekReports.filter(
            (report) =>
                report.week.toLowerCase().includes(search.toLowerCase()) &&
                (filter === "all" || (filter === "Signed" ? report.signed : !report.signed))
        );
    }, [weekReports, search, filter]);

    // Paginated reports
    const paginatedReports = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredReports.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredReports, currentPage]);

    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

    const addWeeklyReport = () => {
        if (!newWeek.trim()) {
            setErrorMessage("Please enter a week name");
            return;
        }

        const newReport = {
            id: weekReports.length + 1,
            week: newWeek,
            signed: newSigned,
            addedAt: new Date().toLocaleString(),
        };

        setWeekReports([...weekReports, newReport]);
        setNewWeek("");
        setNewSigned(false);
        setErrorMessage("");
        setShowAddModal(false);
    };

    const removeWeeklyReport = (index) => {
        const updatedReports = [...weekReports];
        updatedReports.splice(index, 1);
        setWeekReports(updatedReports);
    };

    const openEditModal = (index) => {
        const report = weekReports[index];
        alert(`Editing ${report.week} (Signed: ${report.signed ? "Yes" : "No"})`);
    };

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}>
            <Head title="Weekly Reports" />

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
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                    darkMode={darkMode}
                />

                <main className={`flex-1 transition-all duration-300 px-4 sm:px-6 py-6 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
                    <div className="max-w-6xl mx-auto space-y-6">
                        {/* Header */}
                        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between`}>
                            <h4 className="text-lg font-semibold">Weekly Reports</h4>
                            <div className="sm:mt-0">
                                <ol className="flex flex-wrap gap-1 text-sm">
                                    <li className="opacity-70">
                                        <a href="javascript:void(0);" className={`hover:underline ${darkMode ? "text-gray-300" : "text-gray-600"}`}>List</a>
                                    </li>
                                    <li className="opacity-60">/</li>
                                    <li className="font-medium text-blue-600 dark:text-blue-400">Weekly Reports</li>
                                </ol>
                            </div>
                        </div>


                        <div className="flex gap-2 items-center">
                            <Button onClick={() => setShowAddModal(true)} className="bg-blue-900 text-white flex items-center gap-1">
                                <PlusCircle className="w-4 h-4" /> Add Week
                            </Button>
                            <Input
                                placeholder="Search weeks..."
                                value={search}
                                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                                className="border-blue-900"
                            />
                            <select
                                value={filter}
                                onChange={e => { setFilter(e.target.value); setCurrentPage(1); }}
                                className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-600"
                            >
                                <option value="all">All</option>
                                <option value="Signed">Signed</option>
                                <option value="Not Signed">Not Signed</option>
                            </select>
                        </div>

                        {/* Table for Desktop */}
                        <div className="overflow-x-auto hidden sm:block mt-2">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Week</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date Added</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedReports.length > 0 ? (
                                        paginatedReports.map((report, idx) => (
                                            <TableRow key={report.id}>
                                                <TableCell>{report.week}</TableCell>
                                                <TableCell>{report.signed ? "Signed" : "Not Signed"}</TableCell>
                                                <TableCell>{report.addedAt}</TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Button size="sm" onClick={() => openEditModal(idx)} className="bg-yellow-500 hover:bg-yellow-400 text-white flex items-center gap-1">
                                                        <Edit className="w-3 h-3" /> Edit
                                                    </Button>
                                                    <Button size="sm" onClick={() => removeWeeklyReport(idx)} className="bg-red-600 hover:bg-red-500 text-white flex items-center gap-1">
                                                        <Trash2 className="w-3 h-3" /> Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center text-gray-500">No reports found</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="sm:hidden flex flex-col gap-4 mt-2">
                            {paginatedReports.map((report, idx) => (
                                <div key={report.id} className="border rounded-md p-3 bg-white dark:bg-gray-800 shadow-sm">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">{report.week}</span>
                                        <span>{report.signed ? "Signed" : "Not Signed"}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{report.addedAt}</p>
                                    <div className="flex gap-2 mt-2">
                                        <Button size="sm" onClick={() => openEditModal(idx)} className="bg-yellow-500 hover:bg-yellow-400 text-white flex-1 flex items-center justify-center gap-1">
                                            <Edit className="w-3 h-3" /> Edit
                                        </Button>
                                        <Button size="sm" onClick={() => removeWeeklyReport(idx)} className="bg-red-600 hover:bg-red-500 text-white flex-1 flex items-center justify-center gap-1">
                                            <Trash2 className="w-3 h-3" /> Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {paginatedReports.length === 0 && (
                                <div className="text-center text-gray-500">No reports found.</div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row justify-end items-center mt-4 gap-2">
                            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
                            <span className="px-2 py-1 text-sm">Page {currentPage} of {totalPages}</span>
                            <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
                        </div>


                        {/* Add Modal */}
                        {showAddModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowAddModal(false)}>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md" onClick={e => e.stopPropagation()}>
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Add Weekly Report</h3>
                                    <div className="flex flex-col gap-3">
                                        <Input
                                            placeholder="Week Name"
                                            value={newWeek}
                                            onChange={e => { setNewWeek(e.target.value); setErrorMessage(""); }}
                                        />
                                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                                        <label className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                                            <input type="checkbox" checked={newSigned} onChange={e => setNewSigned(e.target.checked)} />
                                            Signed
                                        </label>

                                        <div className="flex justify-end gap-2 mt-4">
                                            <Button onClick={() => { setShowAddModal(false); setErrorMessage(""); }} className="bg-gray-400 hover:bg-gray-300 text-black dark:bg-gray-600 dark:hover:bg-gray-500">Cancel</Button>
                                            <Button onClick={addWeeklyReport} className="bg-green-600 hover:bg-green-500 text-white dark:bg-green-500 dark:hover:bg-green-400">Add</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Backdrop */}
            {isMobileSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)}></div>
            )}
        </div>
    );
}
