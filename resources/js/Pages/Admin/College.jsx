import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
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
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle, Search, Eye, Pencil } from "lucide-react";

// Dummy data
const initialColleges = [
    { id: 1, logo: "/logos/ccs.png", name: "College of Computer Studies", acronym: "CCS" },
    { id: 2, logo: "/logos/cbm.png", name: "College of Business Management", acronym: "CBM" },
    { id: 3, logo: "/logos/coe.png", name: "College of Engineering", acronym: "COE" },
    { id: 4, logo: "/logos/cas.png", name: "College of Arts & Sciences", acronym: "CAS" },
    { id: 5, logo: "/logos/chtm.png", name: "College of Hospitality & Tourism", acronym: "CHTM" },
    { id: 6, logo: "/logos/cte.png", name: "College of Teacher Education", acronym: "CTE" },
];

export default function College() {
    const [search, setSearch] = useState("");
    const [colleges, setColleges] = useState(initialColleges);

    // Pagination
    const [page, setPage] = useState(1);
    const perPage = 5;
    const filteredColleges = colleges.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.acronym.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredColleges.length / perPage);
    const paginatedColleges = filteredColleges.slice(
        (page - 1) * perPage,
        page * perPage
    );

    // Modal State
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ logo: "", name: "", acronym: "", dean: "" });
    const [errors, setErrors] = useState({});

    // Handle Add College
    const handleAddCollege = () => {
        let newErrors = {};
        if (!form.name.trim()) newErrors.name = "College name is required.";
        if (!form.acronym.trim()) newErrors.acronym = "Acronym is required.";
        if (!form.dean.trim()) newErrors.dean = "Dean is required.";
        if (!form.logo.trim()) newErrors.logo = "Logo URL is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setColleges([
            ...colleges,
            { id: Date.now(), logo: form.logo, name: form.name, acronym: form.acronym }
        ]);

        // reset
        setForm({ logo: "", name: "", acronym: "" });
        setErrors({});
        setOpen(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    College List
                </h2>
            }
        >
            <Head title="Colleges" />
            <Card className="bg-neutral border-0">
                <CardHeader className="flex flex-row items-center justify-between">
                    {/* Add College Modal */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="max-w-lg w-full">
                            <DialogHeader>
                                <DialogTitle>Add New College</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-2">
                                <div>
                                    <Label>College Logo (URL)</Label>
                                    <Input
                                        value={form.logo}
                                        onChange={(e) => setForm({ ...form, logo: e.target.value })}
                                    />
                                    {errors.logo && <p className="text-red-500 text-sm">{errors.logo}</p>}
                                </div>
                                <div>
                                    <Label>College Name</Label>
                                    <Input
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>
                                <div>
                                    <Label>Acronym</Label>
                                    <Input
                                        value={form.acronym}
                                        onChange={(e) => setForm({ ...form, acronym: e.target.value })}
                                    />
                                    {errors.acronym && <p className="text-red-500 text-sm">{errors.acronym}</p>}
                                </div>
                                <div>
                                    <Label>Dean</Label>
                                    <Input
                                        value={form.acronym}
                                        onChange={(e) => setForm({ ...form, dean: e.target.value })}
                                    />
                                    {errors.acronym && <p className="text-red-500 text-sm">{errors.dean}</p>}
                                </div>
                            </div>

                            <DialogFooter>
                                <Button onClick={handleAddCollege} className="bg-blue-900 text-white w-full sm:w-auto dark:hover:bg-black-200">
                                    Save
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
                                placeholder="Search colleges..."
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
                            Add College
                        </Button>
                    </div>

                    {/* Table (scrollable on small screens) */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Logo</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Acronym</TableHead>
                                    <TableHead>Programs</TableHead>
                                    <TableHead>Dean</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedColleges.map((college) => (
                                    <TableRow key={college.id}>
                                        <TableCell>
                                            <img
                                                src={college.logo}
                                                alt={college.acronym}
                                                className="w-10 h-10 rounded-md object-contain"
                                            />
                                        </TableCell>
                                        <TableCell>{college.name}</TableCell>
                                        <TableCell>{college.acronym}</TableCell>
                                        <TableCell>Bachelor of Science in Information Technology</TableCell>
                                        <TableCell>Johans Rabago</TableCell>
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
                                {paginatedColleges.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-gray-500">
                                            No colleges found.
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
