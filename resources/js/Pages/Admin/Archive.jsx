import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArchiveRestore } from "lucide-react";
import { useState } from "react";

const ResponsiveTable = ({ data, columns, searchPlaceholder }) => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 5;

    // Filter
    const filtered = data.filter(item =>
        columns.some(col => {
            const value = col.accessor(item);
            return value?.toString().toLowerCase().includes(search.toLowerCase());
        })
    );

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div>
            <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="mb-3 w-full sm:w-64"
            />

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto border border-gray-200 dark:border-gray-700">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col, idx) => <TableHead key={idx}>{col.header}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length > 0 ? paginated.map(item => (
                            <TableRow key={item.id}>
                                {columns.map((col, idx) => (
                                    <TableCell key={idx}>{col.accessor(item)}</TableCell>
                                ))}
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center py-4 text-gray-500 dark:text-gray-400">
                                    No records found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Cards */}
            <div className="grid grid-cols-1 gap-3 md:hidden">
                {paginated.length > 0 ? paginated.map(item => (
                    <Card key={item.id} className="border dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
                        {columns.map((col, idx) => (
                            <p key={idx}><span className="font-semibold">{col.header}:</span> {col.accessor(item)}</p>
                        ))}
                    </Card>
                )) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No records found.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-3 gap-2">
                <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
                <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
            </div>
        </div>
    );
};

export default function Archive() {
    // Fetch archived data from Inertia props
    const { initialColleges = [], initialPrograms = [], initialUsers = [], initialSchoolYears = [] } = usePage().props;

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-gray-800 dark:text-gray-200">Archive</h2>}>
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
                            <ResponsiveTable
                                data={initialColleges}
                                searchPlaceholder="Search colleges..."
                                columns={[
                                    { header: "College Name", accessor: c => c.name },
                                    { header: "abbreviation", accessor: c => c.abbreviation },
                                    { header: "Dean", accessor: c => c.dean },
                                    {
                                        header: "Action", accessor: c => (
                                            <Button size="icon" variant="outline" className="text-red-800 border-red-800 dark:bg-gray-900">
                                                <ArchiveRestore className="w-4 h-4" />
                                            </Button>
                                        )
                                    },
                                ]}
                            />
                        </TabsContent>

                        {/* Programs */}
                        <TabsContent value="programs">
                            <ResponsiveTable
                                data={initialPrograms}
                                searchPlaceholder="Search programs..."
                                columns={[
                                    { header: "Program", accessor: p => p.name },
                                    { header: "Training Duration (hrs)", accessor: p => p.training_duration },
                                    { header: "Program Head", accessor: p => p.program_head },
                                    {
                                        header: "Action", accessor: p => (
                                            <Button size="icon" variant="outline" className="text-red-800 border-red-800 dark:bg-gray-900">
                                                <ArchiveRestore className="w-4 h-4" />
                                            </Button>
                                        )
                                    },
                                ]}
                            />
                        </TabsContent>

                        {/* Coordinators */}
                        <TabsContent value="coordinators">
                            <ResponsiveTable
                                data={initialUsers}
                                searchPlaceholder="Search coordinators..."
                                columns={[
                                    { header: "Name", accessor: u => u.name },
                                    { header: "Employee Number", accessor: u => u.employee_number || u.empNo },
                                    { header: "Program", accessor: u => u.program?.name || "No program assigned" },
                                    {
                                        header: "Action", accessor: u => (
                                            <Button size="icon" variant="outline" className="text-red-800 border-red-800 dark:bg-gray-900">
                                                <ArchiveRestore className="w-4 h-4" />
                                            </Button>
                                        )
                                    },
                                ]}
                            />
                        </TabsContent>

                        {/* School Years */}
                        <TabsContent value="schoolyear">
                            <ResponsiveTable
                                data={initialSchoolYears}
                                searchPlaceholder="Search school years..."
                                columns={[
                                    { header: "School Year", accessor: s => s.school_year },
                                    {
                                        header: "Action", accessor: s => (
                                            <Button size="icon" variant="outline" className="text-red-800 border-red-800 dark:bg-gray-900">
                                                <ArchiveRestore className="w-4 h-4" />
                                            </Button>
                                        )
                                    },
                                ]}
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
