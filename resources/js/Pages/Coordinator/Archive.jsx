import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, Pencil, RefreshCw } from "lucide-react";

export default function Archive() {
    const {
        initialCompanies = [],
        initialStudents = [],
        initialRequirements = [],
        initialPreRequirements = [],
        initialPostRequirements = []
    } = usePage().props;

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [activeTab, setActiveTab] = useState("companies");

    // Filter function
    const filterData = (data) =>
        data.filter(item =>
            Object.values(item)
                .some(val => String(val).toLowerCase().includes(search.toLowerCase()))
        );

    const reloadData = () => {
        setSearch("");
        setFilter("all");
    };

    // Render Table Rows
    const renderTableRows = (data, columns) =>
        data.map(item => (
            <TableRow key={item.id}>
                {columns.map(col => {
                    let value = item[col.key];
                    // Compute full name
                    if (col.key === "fullName") {
                        value = `${item.firstname} ${item.lastname}`;
                    }
                    return <TableCell key={col.key}>{value}</TableCell>;
                })}
                <TableCell className="text-right flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="bg-blue-900 text-white">
                        <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4" />
                    </Button>
                </TableCell>
            </TableRow>
        ));

    // Render Mobile Cards
    const renderMobileCards = (data, columns) =>
        data.map(item => (
            <div key={item.id} className="border rounded-md p-3 bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    {/* Display full name or fallback */}
                    <span className="font-semibold">
                        {item.firstname && item.lastname ? `${item.firstname} ${item.lastname}` : item.studentNo || item.name}
                    </span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-blue-900 text-white">
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                            <Pencil className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {columns.map(col => {
                        let value = item[col.key];
                        if (col.key === "fullName") {
                            value = `${item.firstname} ${item.lastname}`;
                        }
                        return <p key={col.key}><strong>{col.label}:</strong> {value}</p>;
                    })}
                </div>
            </div>
        ));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Archive
                </h2>
            }
        >
            <Head title="Archive" />
            <Card className="bg-neutral border-0">
                <CardContent>
                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="mb-4">
                            <TabsTrigger value="companies">Companies</TabsTrigger>
                            <TabsTrigger value="students">Students</TabsTrigger>
                            <TabsTrigger value="initialDocs">Initial Docs</TabsTrigger>
                            <TabsTrigger value="preDocs">Pre Docs</TabsTrigger>
                            <TabsTrigger value="postDocs">Post Docs</TabsTrigger>
                        </TabsList>

                        {/* Search + Filter + Reload */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mb-4">
                            <div className="flex items-center gap-2 flex-1 max-w-md">
                                <Input
                                    placeholder={`Search ${activeTab}...`}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 border-blue-900"
                                />
                                {(activeTab === "companies" || activeTab === "students") && (
                                    <select
                                        className="border rounded px-2 py-1 dark:bg-gray-700"
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                    >
                                        <option value="all">All</option>
                                        {activeTab === "companies" && (
                                            [...new Set(initialCompanies.map(c => c.nature))].map(nature => (
                                                <option key={nature} value={nature}>{nature}</option>
                                            ))
                                        )}
                                        {activeTab === "students" && (
                                            [...new Set(initialStudents.map(s => s.status))].map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))
                                        )}
                                    </select>
                                )}
                                <Button variant="outline" size="sm" onClick={reloadData}>
                                    <RefreshCw className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Companies */}
                        <TabsContent value="companies">
                            <div className="overflow-x-auto hidden sm:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Company Name</TableHead>
                                            <TableHead>Owner</TableHead>
                                            <TableHead>Nature</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {renderTableRows(
                                            filterData(initialCompanies).filter(c => filter === "all" || c.nature === filter),
                                            [
                                                { key: "name", label: "Company Name" },
                                                { key: "owner", label: "Owner" },
                                                { key: "nature", label: "Nature" },
                                            ]
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="sm:hidden flex flex-col gap-4">
                                {renderMobileCards(
                                    filterData(initialCompanies).filter(c => filter === "all" || c.nature === filter),
                                    [
                                        { key: "name", label: "Company Name" },
                                        { key: "owner", label: "Owner" },
                                        { key: "nature", label: "Nature" },
                                    ]
                                )}
                            </div>
                        </TabsContent>

                        {/* Students */}
                        <TabsContent value="students">
                            <div className="overflow-x-auto hidden sm:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student No</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Gender</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {renderTableRows(
                                            filterData(initialStudents).filter(s => filter === "all" || s.status === filter),
                                            [
                                                { key: "student_number", label: "Student No" },
                                                { key: "fullName", label: "Name" },
                                                { key: "gender", label: "Gender" },
                                                { key: "status", label: "Status" },
                                            ]
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="sm:hidden flex flex-col gap-4">
                                {renderMobileCards(
                                    filterData(initialStudents).filter(s => filter === "all" || s.status === filter),
                                    [
                                        { key: "student_number", label: "Student No" },
                                        { key: "fullName", label: "Name" },
                                        { key: "gender", label: "Gender" },
                                        { key: "status", label: "Status" },
                                    ]
                                )}
                            </div>
                        </TabsContent>

                        {/* Initial Docs */}
                        <TabsContent value="initialDocs">
                            <div className="overflow-x-auto hidden sm:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Document Name</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {renderTableRows(initialRequirements, [{ key: "title", label: "Document Name" }])}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="sm:hidden flex flex-col gap-4">
                                {renderMobileCards(initialRequirements, [{ key: "title", label: "Document Name" }])}
                            </div>
                        </TabsContent>

                        {/* Pre Docs */}
                        <TabsContent value="preDocs">
                            <div className="overflow-x-auto hidden sm:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Document Name</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {renderTableRows(initialPreRequirements, [{ key: "title", label: "Document Name" }])}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="sm:hidden flex flex-col gap-4">
                                {renderMobileCards(initialPreRequirements, [{ key: "title", label: "Document Name" }])}
                            </div>
                        </TabsContent>

                        {/* Post Docs */}
                        <TabsContent value="postDocs">
                            <div className="overflow-x-auto hidden sm:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Document Name</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {renderTableRows(initialPostRequirements, [{ key: "title", label: "Document Name" }])}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="sm:hidden flex flex-col gap-4">
                                {renderMobileCards(initialPostRequirements, [{ key: "title", label: "Document Name" }])}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
