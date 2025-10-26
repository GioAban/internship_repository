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

export default function College() {
    const { initialColleges = [] } = usePage().props;
    const [search, setSearch] = useState("");
    const [colleges, setColleges] = useState(initialColleges);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ logo: "", name: "", abbreviation: "", dean: "" });
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState(1);
    const perPage = 10;

    // Filter
    const filteredColleges = useMemo(() => {
        const term = search.toLowerCase();
        return colleges.filter(c => {
            const logo = c.logo?.toLowerCase() || "";
            const name = c.name?.toLowerCase() || "";
            const abbreviation = c.abbreviation?.toLowerCase() || "";
            const dean = c.dean?.toLowerCase() || "";
            const programs = "bachelor of science in information technology";
            return (
                logo.includes(term) ||
                name.includes(term) ||
                abbreviation.includes(term) ||
                dean.includes(term) ||
                programs.includes(term)
            );
        });
    }, [search, colleges]);

    const totalPages = Math.max(1, Math.ceil(filteredColleges.length / perPage));
    const paginatedColleges = filteredColleges.slice((page - 1) * perPage, page * perPage);

    const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const validateForm = () => {
        const newErrors = {};
        if (!form.logo.trim()) newErrors.logo = "Logo URL is required.";
        if (!form.name.trim()) newErrors.name = "College name is required.";
        if (!form.abbreviation.trim()) newErrors.abbreviation = "Abbreviation is required.";
        if (!form.dean.trim()) newErrors.dean = "Dean is required.";
        return newErrors;
    };

    const handleAddCollege = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }
        setColleges(prev => [...prev, { id: Date.now(), ...form }]);
        setForm({ logo: "", name: "", abbreviation: "", dean: "" });
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

            <Card className="bg-neutral border-0 shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <CardTitle className="text-lg font-semibold">Colleges</CardTitle>

                    {/* Add College Modal */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-xl">
                            <DialogHeader>
                                <DialogTitle>Add New College</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-4 py-2">
                                {["logo", "name", "abbreviation", "dean"].map((field) => (
                                    <div key={field}>
                                        <Label className="capitalize">{field}</Label>
                                        <Input
                                            placeholder={`Enter ${field}`}
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
                                    onClick={handleAddCollege}
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
                                placeholder="Search colleges..."
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
                            Add College
                        </Button>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="min-w-full border rounded-md">
                            <thead className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
                                <tr>
                                    <th className="px-3 py-2 text-left">No.</th>
                                    <th className="px-3 py-2 text-left">Logo</th>
                                    <th className="px-3 py-2 text-left">Name</th>
                                    <th className="px-3 py-2 text-left">Abbreviation</th>
                                    <th className="px-3 py-2 text-left">Programs</th>

                                    <th className="px-3 py-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedColleges.length > 0 ? (
                                    paginatedColleges.map((college, index) => (
                                        <tr key={college.id} className="border-t">
                                            <td className="px-3 py-2">{(page - 1) * perPage + index + 1}</td>
                                            <td className="px-3 py-2">
                                                <img
                                                    src={college.logo ? `/${college.logo}` : '/uploads/college/ucu_logo.png'}
                                                    alt={college.abbreviation}
                                                    className="w-10 h-10 rounded-md object-contain"
                                                />
                                            </td>
                                            <td className="px-3 py-2">{college.name}</td>
                                            <td className="px-3 py-2">{college.abbreviation}</td>

                                            {/* ✅ Show all programs under this college */}
                                            <td className="px-3 py-2 text-sm">
                                                {college.programs && college.programs.length > 0 ? (
                                                    <ul className="list-disc list-inside">
                                                        {college.programs.map((program) => (
                                                            <li key={program.id}>{program.name}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <span className="text-gray-500 italic">No programs</span>
                                                )}
                                            </td>



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
                                        <td colSpan="7" className="text-center text-gray-500 py-4">
                                            No colleges found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                    {/* Mobile View (Card style) */}
                    <div className="sm:hidden grid gap-3">
                        {paginatedColleges.length > 0 ? (
                            paginatedColleges.map((college, index) => (
                                <div
                                    key={college.id}
                                    className="border border-gray-200 rounded-lg p-3 shadow-sm bg-white"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <img
                                            src={college.logo ? `/${college.logo}` : '/uploads/colleges/ucu_logo.png'}
                                            alt={college.abbreviation}
                                            className="w-12 h-12 rounded-md object-contain"
                                        />
                                        <div>
                                            <p className="font-semibold text-sm">{college.name}</p>
                                            <p className="text-xs text-gray-500">{college.abbreviation}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-700">
                                        <strong>Program:</strong> Bachelor of Science in Information Technology
                                    </p>
                                    <p className="text-xs text-gray-700">
                                        <strong>Dean:</strong> {college.dean}
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
                            <p className="text-center text-gray-500 text-sm">No colleges found.</p>
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
