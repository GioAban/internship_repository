import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"; // ✅ modal components

export default function Report() {
    const [form, setForm] = useState({
        program: "",
        schoolYear: "",
        documentType: ""
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!form.program) newErrors.program = "Program is required.";
        if (!form.schoolYear) newErrors.schoolYear = "School Year is required.";
        if (!form.documentType) newErrors.documentType = "Document Type is required.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Form submitted:", form);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Reports
                </h2>
            }
        >
            <Head title="Reports" />

            <CardContent className="flex">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-900 hover:bg-blue-700 text-white flex items-center">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Select Report
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-6xl">
                        <DialogHeader>
                            <DialogTitle>Select Report</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-row gap-6">
                                {/* Program Select */}
                                <div className="flex flex-col gap-2 w-1/3">
                                    <Label htmlFor="program">Program</Label>
                                    <select
                                        id="program"
                                        value={form.program}
                                        onChange={(e) => setForm({ ...form, program: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                                    >
                                        <option value="">-- Select Program --</option>
                                        <option value="BSCS">Bachelor of Science in Computer Science</option>
                                        <option value="BSCpE">Bachelor of Science in Computer Engineering</option>
                                    </select>
                                    {errors.program && <p className="text-red-500 text-sm mt-1">{errors.program}</p>}
                                </div>

                                {/* School Year Select */}
                                <div className="flex flex-col gap-2 w-1/3">
                                    <Label htmlFor="schoolYear">School Year</Label>
                                    <select
                                        id="schoolYear"
                                        value={form.schoolYear}
                                        onChange={(e) => setForm({ ...form, schoolYear: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                                    >
                                        <option value="">-- Select School Year --</option>
                                        <option value="2025-2026-2nd">S.A 2025-2026 2nd Semester</option>
                                        <option value="2026-2027-2nd">S.A 2026-2027 2nd Semester</option>
                                    </select>
                                    {errors.schoolYear && <p className="text-red-500 text-sm mt-1">{errors.schoolYear}</p>}
                                </div>

                                {/* Document Type Select */}
                                <div className="flex flex-col gap-2 w-1/3">
                                    <Label htmlFor="documentType">Document Type</Label>
                                    <select
                                        id="documentType"
                                        value={form.documentType}
                                        onChange={(e) => setForm({ ...form, documentType: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                                    >
                                        <option value="">-- Select Document Type --</option>
                                        <option value="AnnexC">Annex C</option>
                                        <option value="AnnexD">Annex D</option>
                                        <option value="AnnexE">Annex E</option>
                                    </select>
                                    {errors.documentType && <p className="text-red-500 text-sm mt-1">{errors.documentType}</p>}
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white">
                                    Find Report
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </AuthenticatedLayout>
    );
}
