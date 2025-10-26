import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle, Search, Eye, Pencil } from "lucide-react";

export default function Program() {
    const { initialPrograms = [] } = usePage().props;
    const [search, setSearch] = useState("");
    const [programs, setPrograms] = useState(initialPrograms);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: "", abbreviation: "", training_duration: "", program_head: "" });
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState(1);
    const perPage = 10;


    // Filter programs
    const filteredPrograms = useMemo(() => {
        const term = search.toLowerCase();
        return programs.filter(p => {
            const name = p.name?.toLowerCase() || "";
            const abbreviation = p.abbreviation?.toLowerCase() || "";
            const duration = p.training_duration?.toLowerCase() || "";
            const head = p.program_head?.toLowerCase() || "";

            return (
                name.includes(term) ||
                abbreviation.includes(term) ||
                duration.includes(term) ||
                head.includes(term)
            );
        });
    }, [search, programs]);

    const totalPages = Math.max(1, Math.ceil(filteredPrograms.length / perPage));
    const paginatedPrograms = filteredPrograms.slice((page - 1) * perPage, page * perPage);

    // Input handler
    const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    // Validation
    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Program name is required.";
        if (!form.abbreviation.trim()) newErrors.abbreviation = "Abbreviation is required.";
        if (!form.training_duration.trim()) newErrors.training_duration = "Training duration is required.";
        if (!form.program_head.trim()) newErrors.program_head = "Program head is required.";
        return newErrors;
    };

    // Add program
    const handleAddProgram = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        setPrograms(prev => [
            ...prev,
            { id: Date.now(), ...form }
        ]);

        setForm({ name: "", abbreviation: "", training_duration: "", program_head: "" });
        setErrors({});
        setOpen(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Program List
                </h2>
            }
        >
            <Head title="Programs" />

            <Card className="bg-neutral border-0 shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <CardTitle className="text-lg font-semibold">Programs</CardTitle>

                    {/* Add Program Modal */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-xl">
                            <DialogHeader>
                                <DialogTitle>Add New Program</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-4 py-2">
                                {[
                                    { field: "name", label: "Program Name" },
                                    { field: "abbreviation", label: "Abbreviation" },
                                    { field: "training_duration", label: "Training Duration" },
                                    { field: "program_head", label: "Program Head" },
                                ].map(({ field, label }) => (
                                    <div key={field}>
                                        <Label>{label}</Label>
                                        <Input
                                            placeholder={`Enter ${label.toLowerCase()} `}
                                            value={form[field]}
                                            onChange={(e) => handleChange(field, e.target.value)}
                                        />
                                        {errors[field] && (
                                            <p className="text-red-500 text-sm">{errors[field]}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <DialogFooter>
                                <Button
                                    onClick={handleAddProgram}
                                    className="bg-blue-900 text-white w-full hover:bg-blue-800"
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent>
                    {/* Search and Add Button */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2 w-full">
                            <Search className="w-5 h-5 text-blue-900 hidden sm:block" />
                            <Input
                                placeholder="Search programs..."
                                value={search}
                                onChange={(e) => {
                                    setPage(1);
                                    setSearch(e.target.value);
                                }}
                                className="border-blue-900 flex-1"
                            />
                        </div>

                        <Button
                            onClick={() => setOpen(true)}
                            className="bg-blue-900 hover:bg-blue-700 text-white flex items-center justify-center sm:w-auto w-full"
                        >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Program
                        </Button>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="min-w-full border rounded-md">
                            <thead className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
                                <tr>
                                    <th className="px-2 py-2 text-left">No.</th>
                                    <th className="px-2 py-2 text-left">Name</th>
                                    <th className="px-2 py-2 text-left">Abbreviation</th>
                                    <th className="px-2 py-2 text-left">Training Duration</th>
                                    <th className="px-2 py-2 text-left">Program Head</th>
                                    <th className="px-2 py-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPrograms.length > 0 ? (
                                    paginatedPrograms.map((program, index) => (
                                        <tr key={program.id} className="border-t">
                                            <td className="px-3 py-2">{(page - 1) * perPage + index + 1}</td>
                                            <td className="px-3 py-2">{program.name}</td>
                                            <td className="px-3 py-2">{program.abbreviation}</td>
                                            <td className="px-3 py-2">{program.training_duration}</td>
                                            <td className="px-3 py-2">{program.program_head}</td>
                                            <td className="px-3 py-2 text-right flex justify-end gap-2">
                                                <Button size="sm" className="bg-blue-900 text-white">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button size="sm" variant="outline">
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-gray-500 py-4">
                                            No programs found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="sm:hidden grid gap-3">
                        {paginatedPrograms.length > 0 ? (
                            paginatedPrograms.map((program, index) => (
                                <div
                                    key={program.id}
                                    className="border border-gray-200 rounded-lg p-3 shadow-sm bg-white"
                                >
                                    <p className="font-semibold text-sm">{program.name}</p>
                                    <p className="text-xs text-gray-500">{program.abbreviation}</p>
                                    <p className="text-xs text-gray-700 mt-1">
                                        <strong>Duration:</strong> {program.training_duration}
                                    </p>
                                    <p className="text-xs text-gray-700">
                                        <strong>Head:</strong> {program.program_head}
                                    </p>
                                    <div className="flex justify-end gap-2 mt-2">
                                        <Button size="sm" className="bg-blue-900 text-white p-1">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="outline" className="p-1">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 text-sm">No programs found.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center mt-4 gap-2 text-sm">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="w-full sm:w-auto"
                        >
                            Previous
                        </Button>
                        <span className="text-center w-full sm:w-auto">
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="w-full sm:w-auto"
                        >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );


}
