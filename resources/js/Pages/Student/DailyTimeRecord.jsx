import { Head } from "@inertiajs/react";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/Layouts/StudentNavigation/Navbar";
import Sidebar from "@/Layouts/StudentNavigation/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, X } from "lucide-react";

export default function DailyTimeRecord({ user }) {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [dtrRecords, setDtrRecords] = useState([
        {
            id: 1,
            date: "January 06, 2025",
            amTimeIn: "08:00 AM",
            amTimeOut: "12:00 PM",
            pmTimeIn: "01:00 PM",
            pmTimeOut: "05:00 PM",
            signed: true,
        },
        {
            id: 2,
            date: "January 07, 2025",
            amTimeIn: "08:00 AM",
            amTimeOut: "12:00 PM",
            pmTimeIn: "01:00 PM",
            pmTimeOut: "05:00 PM",
            signed: false,
        },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newRecord, setNewRecord] = useState({
        date: "",
        amTimeIn: "",
        amTimeOut: "",
        pmTimeIn: "",
        pmTimeOut: "",
        signed: false,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const filteredRecords = useMemo(() => {
        return dtrRecords.filter(
            (record) =>
                record.date.toLowerCase().includes(search.toLowerCase()) &&
                (filter === "all" || (filter === "Signed" ? record.signed : !record.signed))
        );
    }, [dtrRecords, search, filter]);

    const paginatedRecords = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredRecords.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredRecords, currentPage]);

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

    const addDtrRecord = () => {
        if (!newRecord.date.trim()) {
            setErrorMessage("Please enter a valid date");
            return;
        }

        const newDtr = { ...newRecord, id: dtrRecords.length + 1 };
        setDtrRecords([...dtrRecords, newDtr]);
        setNewRecord({
            date: "",
            amTimeIn: "",
            amTimeOut: "",
            pmTimeIn: "",
            pmTimeOut: "",
            signed: false,
        });
        setShowAddModal(false);
        setErrorMessage("");
    };

    const removeDtrRecord = (index) => {
        const updated = [...dtrRecords];
        updated.splice(index, 1);
        setDtrRecords(updated);
    };

    const openEditModal = (index) => {
        const record = dtrRecords[index];
        alert(`Editing ${record.date}`);
    };

    return (
        <div
            className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
                }`}
        >
            <Head title="Daily Time Record" />

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

                <main
                    className={`flex-1 transition-all duration-300 px-4 sm:px-6 py-6 ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
                        }`}
                >
                    <div className="max-w-6xl mx-auto space-y-6">
                        {/* Header */}
                        <div
                            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between`}
                        >
                            <h4 className="text-lg font-semibold">Daily Time Records</h4>
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
                                        Daily Time Records
                                    </li>
                                </ol>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2 items-center">
                            <Button
                                onClick={() => setShowAddModal(true)}
                                className="bg-blue-900 text-white flex items-center gap-1"
                            >
                                <PlusCircle className="w-4 h-4" /> Add Record
                            </Button>
                            <Input
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="border-blue-900 w-full sm:w-auto"
                            />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-600 w-full sm:w-auto"
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
                                        <TableHead>Date</TableHead>
                                        <TableHead>AM Time In</TableHead>
                                        <TableHead>AM Time Out</TableHead>
                                        <TableHead>PM Time In</TableHead>
                                        <TableHead>PM Time Out</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedRecords.length > 0 ? (
                                        paginatedRecords.map((record, idx) => (
                                            <TableRow key={record.id}>
                                                <TableCell>{record.date}</TableCell>
                                                <TableCell>{record.amTimeIn}</TableCell>
                                                <TableCell>{record.amTimeOut}</TableCell>
                                                <TableCell>{record.pmTimeIn}</TableCell>
                                                <TableCell>{record.pmTimeOut}</TableCell>
                                                <TableCell>
                                                    {record.signed ? "Signed" : "Not Signed"}
                                                </TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => openEditModal(idx)}
                                                        className="bg-yellow-500 text-white"
                                                    >
                                                        <Edit className="w-3 h-3" /> Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => removeDtrRecord(idx)}
                                                        className="bg-red-600 text-white"
                                                    >
                                                        <Trash2 className="w-3 h-3" /> Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="text-center text-gray-500"
                                            >
                                                No records found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Mobile Responsive View */}
                        <div className="block sm:hidden space-y-3 mt-4">
                            {paginatedRecords.length > 0 ? (
                                paginatedRecords.map((record, idx) => (
                                    <div
                                        key={record.id}
                                        className={`p-4 rounded-lg shadow ${darkMode
                                            ? "bg-gray-800 border border-gray-700"
                                            : "bg-white border border-gray-200"
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h5 className="font-semibold">{record.date}</h5>
                                            <span
                                                className={`text-sm ${record.signed
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                                    }`}
                                            >
                                                {record.signed ? "Signed" : "Not Signed"}
                                            </span>
                                        </div>
                                        <div className="mt-2 text-sm space-y-1">
                                            <p>
                                                <strong>AM In:</strong> {record.amTimeIn}
                                            </p>
                                            <p>
                                                <strong>AM Out:</strong> {record.amTimeOut}
                                            </p>
                                            <p>
                                                <strong>PM In:</strong> {record.pmTimeIn}
                                            </p>
                                            <p>
                                                <strong>PM Out:</strong> {record.pmTimeOut}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 mt-3">
                                            <Button
                                                size="sm"
                                                onClick={() => openEditModal(idx)}
                                                className="bg-yellow-500 text-white flex-1"
                                            >
                                                <Edit className="w-4 h-4" /> Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() => removeDtrRecord(idx)}
                                                className="bg-red-600 text-white flex-1"
                                            >
                                                <Trash2 className="w-4 h-4" /> Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No records found</p>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row justify-end items-center mt-4 gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </Button>
                            <span className="px-2 text-sm">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </main>
            </div>

            {/* Add Record Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div
                        className={`p-6 rounded-lg shadow-lg w-96 max-w-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                            }`}
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold">Add DTR Record</h3>
                            <button onClick={() => setShowAddModal(false)}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="text"
                                placeholder="Date"
                                value={newRecord.date}
                                onChange={(e) =>
                                    setNewRecord({ ...newRecord, date: e.target.value })
                                }
                            />
                            <Input
                                type="text"
                                placeholder="AM Time In"
                                value={newRecord.amTimeIn}
                                onChange={(e) =>
                                    setNewRecord({ ...newRecord, amTimeIn: e.target.value })
                                }
                            />
                            <Input
                                type="text"
                                placeholder="AM Time Out"
                                value={newRecord.amTimeOut}
                                onChange={(e) =>
                                    setNewRecord({ ...newRecord, amTimeOut: e.target.value })
                                }
                            />
                            <Input
                                type="text"
                                placeholder="PM Time In"
                                value={newRecord.pmTimeIn}
                                onChange={(e) =>
                                    setNewRecord({ ...newRecord, pmTimeIn: e.target.value })
                                }
                            />
                            <Input
                                type="text"
                                placeholder="PM Time Out"
                                value={newRecord.pmTimeOut}
                                onChange={(e) =>
                                    setNewRecord({ ...newRecord, pmTimeOut: e.target.value })
                                }
                            />
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={newRecord.signed}
                                    onChange={(e) =>
                                        setNewRecord({ ...newRecord, signed: e.target.checked })
                                    }
                                />
                                <label>Signed</label>
                            </div>
                        </div>

                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                        )}

                        <div className="mt-4 flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowAddModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button className="bg-blue-900 text-white" onClick={addDtrRecord}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Sidebar Backdrop */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
