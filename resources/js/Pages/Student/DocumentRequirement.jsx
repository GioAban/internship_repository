import { Head } from "@inertiajs/react";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/Layouts/StudentNavigation/Navbar";
import Sidebar from "@/Layouts/StudentNavigation/Sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, RefreshCw } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function DocumentRequirement({ user }) {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState("initialDocs");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const documents = {
        initialDocs: [
            { id: 1, name: "Resume", status: "Submitted" },
            { id: 2, name: "Endorsement Letter", status: "Pending" },
        ],
        preDocs: [
            { id: 3, name: "MOA (Memorandum of Agreement)", status: "Submitted" },
            { id: 4, name: "Narrative Report", status: "Not Submitted" },
        ],
        postDocs: [
            { id: 5, name: "Final Report", status: "Pending" },
            { id: 6, name: "Review Paper", status: "Submitted" },
        ],
    };

    const filteredDocs = useMemo(() => {
        return Object.fromEntries(
            Object.entries(documents).map(([key, docs]) => [
                key,
                docs.filter(
                    (doc) =>
                        (filter === "all" || doc.status === filter) &&
                        doc.name.toLowerCase().includes(search.toLowerCase())
                ),
            ])
        );
    }, [documents, search, filter]);

    const handleEditDocument = (doc) => alert(`Edit document: ${doc.name}`);
    const handleRemoveDocument = (id) => {
        if (confirm("Are you sure you want to remove this document?")) {
            console.log(`Removed document ID: ${id}`);
        }
    };

    const reloadData = () => {
        setSearch("");
        setFilter("all");
    };

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <div
            className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
                }`}
        >
            <Head title="Document Requirements" />

            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                />
            </div>

            {/* Page Layout */}
            <div className="flex flex-1 pt-[70px]">
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
                    <div className="max-w-7xl mx-auto space-y-4">
                        {/* Header */}
                        <div
                            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between`}
                        >
                            <h4 className="text-lg font-semibold">Documents Requirements</h4>
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
                                        Documents Requirements
                                    </li>
                                </ol>
                            </div>
                        </div>

                        {/* Search + Filter */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">
                            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                                <Input
                                    placeholder={`Search ${selectedTab}...`}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full sm:w-64 h-10"
                                />
                                <select
                                    className="border dark:bg-gray-700 dark:text-white w-full sm:w-auto h-10 px-2"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="Submitted">Submitted</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Not Submitted">Not Submitted</option>
                                </select>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={reloadData}
                                    className="flex items-center gap-1 w-full sm:w-auto h-10"
                                >
                                    <RefreshCw className="w-4 h-4" /> Reload
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                                <TabsList>
                                    <TabsTrigger value="initialDocs" className="w-full">Initial Docs</TabsTrigger>
                                    <TabsTrigger value="preDocs" className="w-full">Pre Docs</TabsTrigger>
                                    <TabsTrigger value="postDocs" className="w-full">Post Docs</TabsTrigger>
                                </TabsList>
                                <div className="flex-1">
                                    {Object.entries(filteredDocs).map(([key, docs]) => (
                                        <TabsContent key={key} value={key} className="mt-4">
                                            <h5 className="font-semibold text-base mb-3">
                                                {key === "initialDocs"
                                                    ? "Initial Document List"
                                                    : key === "preDocs"
                                                        ? "Preliminary Document List"
                                                        : "Post Document List"}
                                            </h5>

                                            <div className="overflow-x-auto">
                                                <table className="min-w-full text-sm border-collapse border rounded-lg">
                                                    <thead>
                                                        <tr
                                                        >
                                                            <th className="px-4 py-2 text-left font-medium">
                                                                Document Name
                                                            </th>
                                                            <th className="px-4 py-2 text-left font-medium">Status</th>
                                                            <th className="px-4 py-2 text-left font-medium">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {docs.length > 0 ? (
                                                            docs.map((doc, idx) => (
                                                                <tr
                                                                    key={doc.id}
                                                                    className={`${idx % 2 === 0
                                                                        ? darkMode
                                                                            ? "bg-gray-700"
                                                                            : "bg-gray-50"
                                                                        : ""
                                                                        }`}
                                                                >
                                                                    <td className="px-4 py-2">{doc.name}</td>
                                                                    <td
                                                                        className={`px-4 py-2 font-medium ${doc.status === "Submitted"
                                                                            ? "text-green-500"
                                                                            : doc.status === "Pending"
                                                                                ? "text-yellow-500"
                                                                                : "text-red-500"
                                                                            }`}
                                                                    >
                                                                        {doc.status}
                                                                    </td>
                                                                    <td className="px-4 py-2 flex flex-wrap gap-2">
                                                                        <Button
                                                                            size="sm"
                                                                            onClick={() => handleEditDocument(doc)}
                                                                            className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1"
                                                                        >
                                                                            <Edit className="w-4 h-4" /> Edit
                                                                        </Button>
                                                                        <Button
                                                                            size="sm"
                                                                            onClick={() => handleRemoveDocument(doc.id)}
                                                                            className="bg-red-600 hover:bg-red-500 text-white flex items-center gap-1"
                                                                        >
                                                                            <Trash2 className="w-4 h-4" /> Remove
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="3" className="text-center py-4 text-gray-500">
                                                                    No matching documents found.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </TabsContent>
                                    ))}
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </main>
            </div>

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
