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
                    School Year
                </h2>
            }
        >
            <Head title="Select School Year" />

            <CardContent className="flex">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-900 hover:bg-blue-700 text-white flex items-center">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Select School Year
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-row gap-6">
                                {/* Program Select */}
                                <div className="flex flex-col gap-2 w-full">
                                    <Label htmlFor="program">Program</Label>
                                    <select
                                        id="program"
                                        value={form.program}
                                        onChange={(e) => setForm({ ...form, program: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                                    >
                                        <option value="">-- Select School Year --</option>
                                        <option value="1">2nd Semester S.A 2025-2026</option>
                                        <option value="2">2nd Semester S.A 2024-2025</option>
                                        <option value="2">2nd Semester S.A 2023-2024</option>
                                    </select>
                                    {errors.program && <p className="text-red-500 text-sm mt-1">{errors.program}</p>}
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white">
                                    Submit
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </AuthenticatedLayout>
    );
}
