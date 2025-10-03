import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle, Search, Eye, Pencil } from "lucide-react";

// Dummy data
const initialSchoolYears = [
    { id: 1, school_year: "2023-2024", status: "Active" },
    { id: 2, school_year: "2022-2023", status: "Inactive" },
    { id: 3, school_year: "2021-2022", status: "Inactive" },
];

export default function SchoolYear() {
    const [search, setSearch] = useState("");
    const [schoolYears, setSchoolYears] = useState(initialSchoolYears);

    // Pagination
    const [page, setPage] = useState(1);
    const perPage = 5;
    const filteredSchoolYears = schoolYears.filter(
        (sy) =>
            sy.school_year.toLowerCase().includes(search.toLowerCase()) ||
            sy.status.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredSchoolYears.length / perPage);
    const paginatedSchoolYears = filteredSchoolYears.slice(
        (page - 1) * perPage,
        page * perPage
    );

    // Modal State
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ from: "", to: "", status: "" });
    const [errors, setErrors] = useState({});

    // Handle Add School Year
    // Handle Add School Year
    const handleAddSchoolYear = () => {
        let newErrors = {};

        if (!form.from.trim()) newErrors.from = "From year is required.";
        else if (form.from.length !== 4) newErrors.from = "From year must be 4 digits.";

        if (!form.to.trim()) newErrors.to = "To year is required.";
        else if (form.to.length !== 4) newErrors.to = "To year must be 4 digits.";

        if (form.from && form.to && Number(form.from) >= Number(form.to)) {
            newErrors.to = "To year must be greater than From year.";
        }

        if (!form.status.trim()) newErrors.status = "Status is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSchoolYears([
            ...schoolYears,
            { id: Date.now(), school_year: `${form.from}-${form.to}`, status: form.status }
        ]);

        // reset
        setForm({ from: "", to: "", status: "" });
        setErrors({});
        setOpen(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    School Year
                </h2>
            }
        >
            <Head title="School Year" />
            <Card className="bg-neutral border-0">
                <CardHeader className="flex flex-row items-center justify-between">
                    {/* Add School Year Modal */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="max-w-lg w-full bg-white dark:bg-black text-gray-900 dark:text-gray-200">
                            <DialogHeader>
                                <DialogTitle className="text-gray-900 dark:text-gray-100">Add New School Year</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-2">
                                <div>
                                    <Label>From:</Label>
                                    <Input
                                        className={"border-grey-500"}
                                        type="number"
                                        maxLength={4}
                                        value={form.from}
                                        onChange={(e) => {
                                            let year = e.target.value.slice(0, 4); // limit to 4 digits
                                            setForm({
                                                ...form,
                                                from: year,
                                                to: year && year.length === 4 ? String(Number(year) + 1) : "" // auto set To
                                            });
                                        }}
                                    />
                                    {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
                                </div>

                                <div>
                                    <Label>To:</Label>
                                    <Input
                                        className={"border-grey-500"}
                                        type="number"
                                        maxLength={4}
                                        value={form.to}
                                        readOnly // prevent manual edit since it auto-updates
                                    />
                                    {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Status
                                    </Label>
                                    <select
                                        id="status"
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                                    >
                                        <option value="">-- Select Status --</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                                    )}
                                </div>

                            </div>
                            <DialogFooter>
                                <Button
                                    onClick={handleAddSchoolYear}
                                    className="bg-blue-900 text-white hover:bg-blue-800 w-full sm:w-auto"
                                >
                                    Add
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent>
                    {/* Search Bar + Button */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mb-4">
                        {/* Search */}
                        <div className="flex items-center gap-2 flex-1">
                            <Search className="w-6 h-4 text-blue-900" />
                            <Input
                                placeholder="Search school year..."
                                value={search}
                                onChange={(e) => {
                                    setPage(1);
                                    setSearch(e.target.value);
                                }}
                                className="flex-1 border-blue-900"
                            />
                        </div>

                        {/* Add Button */}
                        <Button
                            onClick={() => setOpen(true)}
                            className="bg-blue-900 hover:bg-blue-700 text-white flex items-center justify-center sm:w-auto w-full"
                        >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add New School Year
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>School Year</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedSchoolYears.map((sy) => (
                                    <TableRow key={sy.id}>
                                        <TableCell>{sy.school_year}</TableCell>
                                        <TableCell>
                                            <select
                                                value={sy.status}
                                                onChange={(e) => {
                                                    const updated = schoolYears.map((item) =>
                                                        item.id === sy.id ? { ...item, status: e.target.value } : item
                                                    );
                                                    setSchoolYears(updated);
                                                }}
                                                className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-2 py-1"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>

                                        </TableCell>
                                        <TableCell className="text-right flex justify-end gap-2">
                                            <Button variant="outline" size="sm" className="bg-blue-900 text-white">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {paginatedSchoolYears.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-gray-500">
                                            No school years found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row justify-end items-center mt-4 gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </Button>
                        <span className="px-2 py-1 text-sm">
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
