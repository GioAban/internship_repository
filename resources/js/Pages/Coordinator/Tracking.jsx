import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RefreshCw, Search } from "lucide-react";
import { useState } from "react";

export default function Tracking() {
    const [students, setStudents] = useState([
        { id: "20211222", name: "ABAN, GENE MATTHEW T", research: false, barangay: true, resume: true, enrollment: true, police: true, nbi: true, evaluation: true, profile: true, medical: true, vax: true },
        { id: "20241620", name: "ANCHETA, CHRISTIAN C", research: true, barangay: true, resume: true, enrollment: true, police: true, nbi: true, evaluation: true, profile: true, medical: true, vax: true },
    ]);


    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 5;
    const [openAdd, setOpenAdd] = useState(false);
    const [activeTab, setActiveTab] = useState("initial");

    const handleChange = (studentIndex, field, value) => {
        const updatedStudents = [...students];
        updatedStudents[studentIndex][field] = value === "true";
        setStudents(updatedStudents);
    };

    const renderDropdown = (studentIndex, field, value) => (
        <select
            value={value ? "true" : "false"}
            onChange={(e) => handleChange(studentIndex, field, e.target.value)}
            className={`appearance-none text-xs text-center px-1 py-[1px] border font-semibold w-full rounded sm:w-auto transition-colors duration-200 ${value
                ? "bg-green-200 text-green-800 border-green-300"
                : "bg-red-200 text-red-800 border-red-300"
                }`}
            style={{ backgroundImage: "none" }}
        >
            <option value="true">Completed</option>
            <option value="false">Pending</option>
        </select>
    );

    const filteredStudents = students.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.id.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredStudents.length / perPage);
    const paginatedStudents = filteredStudents.slice(
        (page - 1) * perPage,
        page * perPage
    );

    const tabFields = {
        initial: ["research", "barangay", "resume"],
        preliminary: ["enrollment", "police", "nbi"],
        post: ["evaluation", "profile", "medical", "vax"],
    };

    const tabLabels = {
        research: "Research",
        barangay: "Barangay",
        resume: "Resume",
        enrollment: "Enrollment",
        police: "Police",
        nbi: "NBI",
        evaluation: "Evaluation",
        profile: "Profile",
        medical: "Medical",
        vax: "Vax",
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                    Tracking
                </h2>
            }
        >
            <Head title="Tracking" />
            <Card className="mx-2 sm:mx-6 mt-4">
                <CardHeader>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                            <TabsTrigger value="initial">
                                Initial Requirements
                            </TabsTrigger>
                            <TabsTrigger value="preliminary">
                                Preliminary Requirements
                            </TabsTrigger>
                            <TabsTrigger value="post">
                                Post Requirements
                            </TabsTrigger>
                        </TabsList>

                        {/* Shared search + filter */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 mb-4">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <Input
                                        placeholder="Search students..."
                                        value={search}
                                        onChange={(e) => {
                                            setPage(1);
                                            setSearch(e.target.value);
                                        }}
                                        className="w-full pl-8 text-sm"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setSearch("");
                                        setPage(1);
                                    }}
                                >
                                    <RefreshCw className="w-4 h-4 mr-1" />
                                    Reset
                                </Button>
                            </div>
                        </div>

                        {/* Table per tab */}
                        {["initial", "preliminary", "post"].map((tab) => (
                            <TabsContent key={tab} value={tab}>
                                <div className="w-full overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-md">
                                    <table className="min-w-[700px] w-full text-xs sm:text-sm text-center border-collapse">
                                        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                            <tr>
                                                <th className="p-0 border w-1/6 font-semibold">
                                                    ID
                                                </th>
                                                <th className="p-1 border w-1/6 font-semibold">
                                                    Name
                                                </th>
                                                {tabFields[tab].map((field, idx) => (
                                                    <th
                                                        key={idx}
                                                        className="border w-10 h-[120px] bg-gray-50 dark:bg-gray-900 align-middle"
                                                    >
                                                        <div className="flex items-center justify-center h-full">
                                                            <span className="transform -rotate-90 text-xs font-medium whitespace-nowrap leading-tight">
                                                                {tabLabels[field]}
                                                            </span>
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedStudents.map((s, i) => (
                                                <tr
                                                    key={i}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <td className="border p-1">
                                                        {s.id}
                                                    </td>
                                                    <td className="border p-1 text-left whitespace-nowrap font-medium">
                                                        {s.name}
                                                    </td>
                                                    {tabFields[tab].map((field, idx) => (
                                                        <td key={idx} className="border p-2">
                                                            {renderDropdown(i, field, s[field])}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </TabsContent>
                        ))}

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center mt-4 gap-2 text-sm">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </Button>
                            <span className="text-gray-700 dark:text-gray-300">
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
                    </Tabs>
                </CardHeader>
            </Card>

            {/* Add Tracking Modal */}
            <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                <DialogContent className="max-w-lg w-full max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Tracking</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div>
                            <Label>Tracking Name</Label>
                            <Input placeholder="Enter tracking name" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className="bg-blue-900 text-white w-full sm:w-auto">
                            Add
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );


}
