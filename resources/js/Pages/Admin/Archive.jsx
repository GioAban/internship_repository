import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArchiveRestore } from "lucide-react";

export default function Archive() {
    // Example mock data (replace with props from backend)
    const colleges = [
        { id: 1, logo: "", name: "College of Engineering", acronym: "COE", dean: "Dr. Reyes" },
        { id: 2, logo: "", name: "College of Education", acronym: "COED", dean: "Prof. Santos" },
    ];

    const programs = [
        { id: 1, program: "BS Computer Science", duration: 4800, head: "Engr. Dela Cruz" },
        { id: 2, program: "BSIT", duration: 4200, head: "Prof. Aquino" },
    ];

    const coordinators = [
        { id: 1, name: "Juan Dela Cruz", empNo: "EMP123", program: "BSCS" },
        { id: 2, name: "Maria Santos", empNo: "EMP456", program: "BSIT" },
    ];

    const schoolYears = [
        { id: 1, year: "2023-2024" },
        { id: 2, year: "2024-2025" },
    ];

    const [search, setSearch] = useState("");

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Archive
                </h2>
            }
        >
            <Head title="Archive" />
            <Card className="bg-neutral border-0 pt-3">
                <CardContent>
                    <Tabs defaultValue="colleges" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="colleges">Colleges</TabsTrigger>
                            <TabsTrigger value="programs">Programs</TabsTrigger>
                            <TabsTrigger value="coordinators">Coordinators</TabsTrigger>
                            <TabsTrigger value="schoolyear">School Year</TabsTrigger>
                        </TabsList>

                        {/* Colleges */}
                        <TabsContent value="colleges">
                            <div className="flex justify-between mb-3">
                                <Input
                                    placeholder="Search colleges..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-64"
                                />
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Logo</TableHead>
                                        <TableHead>College Name</TableHead>
                                        <TableHead>Acronym</TableHead>
                                        <TableHead>Dean</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {colleges.map((c) => (
                                        <TableRow key={c.id}>
                                            <TableCell>{c.logo}</TableCell>
                                            <TableCell>{c.name}</TableCell>
                                            <TableCell>{c.acronym}</TableCell>
                                            <TableCell>{c.dean}</TableCell>
                                            <TableCell>
                                                <Button size="icon" variant="outline" className="text-red-800 border-red-800 dark:bg-gray-900">
                                                    <ArchiveRestore className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* Pagination Example */}
                            <div className="flex justify-end mt-3 space-x-2">
                                <Button size="sm" variant="outline">Prev</Button>
                                <Button size="sm" variant="outline">Next</Button>
                            </div>
                        </TabsContent>

                        {/* Programs */}
                        <TabsContent value="programs">
                            <div className="flex justify-between mb-3">
                                <Input
                                    placeholder="Search programs..."
                                    className="w-64"
                                />
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Program</TableHead>
                                        <TableHead>Training Duration (hrs)</TableHead>
                                        <TableHead>Program Head</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {programs.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell>{p.program}</TableCell>
                                            <TableCell>{p.duration}</TableCell>
                                            <TableCell>{p.head}</TableCell>
                                            <TableCell>
                                                <Button size="icon" variant="outline" className="text-red-800 border-red-800 dark:bg-gray-900">
                                                    <ArchiveRestore className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="flex justify-end mt-3 space-x-2">
                                <Button size="sm" variant="outline">Prev</Button>
                                <Button size="sm" variant="outline">Next</Button>
                            </div>
                        </TabsContent>

                        {/* Coordinators */}
                        <TabsContent value="coordinators">
                            <div className="flex justify-between mb-3">
                                <Input
                                    placeholder="Search coordinators..."
                                    className="w-64"
                                />
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Employee Number</TableHead>
                                        <TableHead>Program</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {coordinators.map((u) => (
                                        <TableRow key={u.id}>
                                            <TableCell>{u.name}</TableCell>
                                            <TableCell>{u.empNo}</TableCell>
                                            <TableCell>{u.program}</TableCell>
                                            <TableCell>
                                                <Button size="icon" variant="outline" className="text-red-800 border-red-800 dark:bg-gray-900">
                                                    <ArchiveRestore className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="flex justify-end mt-3 space-x-2">
                                <Button size="sm" variant="outline">Prev</Button>
                                <Button size="sm" variant="outline">Next</Button>
                            </div>
                        </TabsContent>

                        {/* School Year */}
                        <TabsContent value="schoolyear">
                            <div className="flex justify-between mb-3">
                                <Input
                                    placeholder="Search school years..."
                                    className="w-64"
                                />
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>School Year</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {schoolYears.map((s) => (
                                        <TableRow key={s.id}>
                                            <TableCell>{s.year}</TableCell>
                                            <TableCell>
                                                <Button size="icon" variant="outline" className="text-red-800 border-red-800 dark:bg-gray-900">
                                                    <ArchiveRestore className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="flex justify-end mt-3 space-x-2">
                                <Button size="sm" variant="outline">Prev</Button>
                                <Button size="sm" variant="outline">Next</Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
