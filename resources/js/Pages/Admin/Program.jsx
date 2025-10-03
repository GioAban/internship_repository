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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle, Search, Eye, Pencil } from "lucide-react";

// Dummy data
const initialPrograms = [
    { id: 1, name: "Bachelor of Science in Computer Science", acronym: "BSCS", duration: "560 hrs", head: "Eherson Valdez" },
    { id: 2, name: "Bachelor of Science in Business Management", acronym: "BSBM", duration: "480 hrs", head: "Jane Doe" },
    { id: 3, name: "Bachelor of Science in Engineering", acronym: "BSE", duration: "600 hrs", head: "John Smith" },
];

export default function Program() {
    const [search, setSearch] = useState("");
    const [programs, setPrograms] = useState(initialPrograms);

    // Pagination
    const [page, setPage] = useState(1);
    const perPage = 5;
    const filteredPrograms = programs.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.acronym.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredPrograms.length / perPage);
    const paginatedPrograms = filteredPrograms.slice(
        (page - 1) * perPage,
        page * perPage
    );

    // Modal State
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: "", acronym: "", duration: "", head: "" });
    const [errors, setErrors] = useState({});

    // Handle Add Program
    const handleAddProgram = () => {
        let newErrors = {};
        if (!form.name.trim()) newErrors.name = "Program name is required.";
        if (!form.acronym.trim()) newErrors.acronym = "Acronym is required.";
        if (!form.duration.trim()) newErrors.duration = "Training duration is required.";
        if (!form.head.trim()) newErrors.head = "Program head is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setPrograms([
            ...programs,
            { id: Date.now(), ...form }
        ]);

        // reset
        setForm({ name: "", acronym: "", duration: "", head: "" });
        setErrors({});
        setOpen(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Program
                </h2>
            }
        >
            <Head title="Program" />
            <Card className="bg-neutral border-0">
                <CardHeader className="flex flex-row items-center justify-between">
                    {/* Add Program Modal */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="max-w-lg w-full">
                            <DialogHeader>
                                <DialogTitle>Add New Program</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-2">
                                <div>
                                    <Label>Program Name</Label>
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
                                    <Label>Training Duration</Label>
                                    <Input
                                        value={form.duration}
                                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                    />
                                    {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                                </div>
                                <div>
                                    <Label>Program Head</Label>
                                    <Input
                                        value={form.head}
                                        onChange={(e) => setForm({ ...form, head: e.target.value })}
                                    />
                                    {errors.head && <p className="text-red-500 text-sm">{errors.head}</p>}
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    onClick={handleAddProgram}
                                    className="bg-blue-900 text-white hover:bg-blue-800 hover:text-gray-200 w-full sm:w-auto"
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
                                placeholder="Search programs..."
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
                            Add Program
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Acronym</TableHead>
                                    <TableHead>Training Duration</TableHead>
                                    <TableHead>Program Head</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedPrograms.map((program) => (
                                    <TableRow key={program.id}>
                                        <TableCell>{program.name}</TableCell>
                                        <TableCell>{program.acronym}</TableCell>
                                        <TableCell>{program.duration}</TableCell>
                                        <TableCell>{program.head}</TableCell>
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
                                {paginatedPrograms.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-gray-500">
                                            No programs found.
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
