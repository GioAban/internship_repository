import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    Card,
    CardContent
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, Pencil } from "lucide-react";

// Dummy data
const midtermStudents = [
    { id: 1, studentNumber: "20200823", subjectCode: "CS101", lastname: "Valdez", firstname: "Eherson", gender: "Male", company: "Accenture" },
    { id: 2, studentNumber: "20200824", subjectCode: "BM102", lastname: "Doe", firstname: "Jane", gender: "Female", company: "IBM" },
    { id: 3, studentNumber: "20200825", subjectCode: "ENG103", lastname: "Smith", firstname: "John", gender: "Male", company: "PLDT" },
];

const finalStudents = [
    { id: 4, studentNumber: "20200826", subjectCode: "CS102", lastname: "Reyes", firstname: "Mark", gender: "Male", company: "Accenture" },
    { id: 5, studentNumber: "20200827", subjectCode: "BM103", lastname: "Lopez", firstname: "Maria", gender: "Female", company: "Google" },
];

export default function Evaluation() {
    const [searchMid, setSearchMid] = useState("");
    const [searchFinal, setSearchFinal] = useState("");
    const [filterGenderMid, setFilterGenderMid] = useState("");
    const [filterCompanyMid, setFilterCompanyMid] = useState("");
    const [filterGenderFinal, setFilterGenderFinal] = useState("");
    const [filterCompanyFinal, setFilterCompanyFinal] = useState("");
    const [pageMid, setPageMid] = useState(1);
    const [pageFinal, setPageFinal] = useState(1);
    const perPage = 5;

    // Filter & paginate midterm
    const filteredMidterm = midtermStudents.filter(
        s =>
            (s.studentNumber.toLowerCase().includes(searchMid.toLowerCase()) ||
                s.lastname.toLowerCase().includes(searchMid.toLowerCase()) ||
                s.firstname.toLowerCase().includes(searchMid.toLowerCase()) ||
                s.subjectCode.toLowerCase().includes(searchMid.toLowerCase())) &&
            (filterGenderMid === "" || s.gender === filterGenderMid) &&
            (filterCompanyMid === "" || s.company === filterCompanyMid)
    );
    const totalPagesMid = Math.max(1, Math.ceil(filteredMidterm.length / perPage));
    const paginatedMidterm = filteredMidterm.slice((pageMid - 1) * perPage, pageMid * perPage);

    // Filter & paginate final
    const filteredFinal = finalStudents.filter(
        s =>
            (s.studentNumber.toLowerCase().includes(searchFinal.toLowerCase()) ||
                s.lastname.toLowerCase().includes(searchFinal.toLowerCase()) ||
                s.firstname.toLowerCase().includes(searchFinal.toLowerCase()) ||
                s.subjectCode.toLowerCase().includes(searchFinal.toLowerCase())) &&
            (filterGenderFinal === "" || s.gender === filterGenderFinal) &&
            (filterCompanyFinal === "" || s.company === filterCompanyFinal)
    );
    const totalPagesFinal = Math.max(1, Math.ceil(filteredFinal.length / perPage));
    const paginatedFinal = filteredFinal.slice((pageFinal - 1) * perPage, pageFinal * perPage);

    const renderTableRows = (students) =>
        students.map(student => (
            <TableRow key={student.id}>
                <TableCell>{student.studentNumber}</TableCell>
                <TableCell>{student.subjectCode}</TableCell>
                <TableCell>{student.lastname}</TableCell>
                <TableCell>{student.firstname}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.company}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="bg-blue-900 text-white">
                        <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4" />
                    </Button>
                </TableCell>
            </TableRow>
        ));

    const renderMobileCards = (students) =>
        students.map(student => (
            <div key={student.id} className="border rounded-md p-3 bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{student.firstname} {student.lastname}</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-blue-900 text-white">
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                            <Pencil className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p><strong>Student Number:</strong> {student.studentNumber}</p>
                    <p><strong>Subject Code:</strong> {student.subjectCode}</p>
                    <p><strong>Gender:</strong> {student.gender}</p>
                    <p><strong>Company:</strong> {student.company}</p>
                </div>
            </div>
        ));

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">Evaluation</h2>}
        >
            <Head title="Evaluation" />
            <Card className="bg-neutral border-0">
                <CardContent>
                    <Tabs defaultValue="midterm">
                        <TabsList className="mb-4">
                            <TabsTrigger value="midterm">Midterm Evaluated</TabsTrigger>
                            <TabsTrigger value="final">Finals Evaluated</TabsTrigger>
                        </TabsList>

                        {/* MIDTERM TAB */}
                        <TabsContent value="midterm">
                            <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
                                <input
                                    type="text"
                                    placeholder="Search midterm students..."
                                    value={searchMid}
                                    onChange={(e) => { setPageMid(1); setSearchMid(e.target.value); }}
                                    className="border border-gray-300 rounded px-2 py-1 w-full sm:w-64 dark:bg-gray-800 dark:border-gray-600"
                                />
                                <select
                                    value={filterGenderMid}
                                    onChange={(e) => setFilterGenderMid(e.target.value)}
                                    className="border rounded px-2 py-1 dark:bg-gray-800"
                                >
                                    <option value="">All Genders</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <select
                                    value={filterCompanyMid}
                                    onChange={(e) => setFilterCompanyMid(e.target.value)}
                                    className="border rounded px-2 py-1 dark:bg-gray-800"
                                >
                                    <option value="">All Companies</option>
                                    <option value="Accenture">Accenture</option>
                                    <option value="IBM">IBM</option>
                                    <option value="PLDT">PLDT</option>
                                </select>
                            </div>

                            <div className="overflow-x-auto hidden sm:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student Number</TableHead>
                                            <TableHead>Subject Code</TableHead>
                                            <TableHead>Lastname</TableHead>
                                            <TableHead>Firstname</TableHead>
                                            <TableHead>Gender</TableHead>
                                            <TableHead>Company</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedMidterm.length > 0 ? renderTableRows(paginatedMidterm) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center text-gray-500">No students found.</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="sm:hidden flex flex-col gap-4">
                                {paginatedMidterm.length > 0 ? renderMobileCards(paginatedMidterm) :
                                    <div className="text-center text-gray-500">No students found.</div>
                                }
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col sm:flex-row justify-end items-center mt-4 gap-2">
                                <Button variant="outline" size="sm" disabled={pageMid === 1} onClick={() => setPageMid(pageMid - 1)}>Previous</Button>
                                <span className="px-2 py-1 text-sm">Page {pageMid} of {totalPagesMid}</span>
                                <Button variant="outline" size="sm" disabled={pageMid === totalPagesMid} onClick={() => setPageMid(pageMid + 1)}>Next</Button>
                            </div>
                        </TabsContent>

                        {/* FINALS TAB */}
                        <TabsContent value="final">
                            <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
                                <input
                                    type="text"
                                    placeholder="Search final students..."
                                    value={searchFinal}
                                    onChange={(e) => { setPageFinal(1); setSearchFinal(e.target.value); }}
                                    className="border border-gray-300 rounded px-2 py-1 w-full sm:w-64 dark:bg-gray-800 dark:border-gray-600"
                                />
                                <select
                                    value={filterGenderFinal}
                                    onChange={(e) => setFilterGenderFinal(e.target.value)}
                                    className="border rounded px-2 py-1 dark:bg-gray-800"
                                >
                                    <option value="">All Genders</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <select
                                    value={filterCompanyFinal}
                                    onChange={(e) => setFilterCompanyFinal(e.target.value)}
                                    className="border rounded px-2 py-1 dark:bg-gray-800"
                                >
                                    <option value="">All Companies</option>
                                    <option value="Accenture">Accenture</option>
                                    <option value="IBM">IBM</option>
                                    <option value="PLDT">PLDT</option>
                                    <option value="Google">Google</option>
                                </select>
                            </div>

                            <div className="overflow-x-auto hidden sm:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student Number</TableHead>
                                            <TableHead>Subject Code</TableHead>
                                            <TableHead>Lastname</TableHead>
                                            <TableHead>Firstname</TableHead>
                                            <TableHead>Gender</TableHead>
                                            <TableHead>Company</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedFinal.length > 0 ? renderTableRows(paginatedFinal) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center text-gray-500">No students found.</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="sm:hidden flex flex-col gap-4">
                                {paginatedFinal.length > 0 ? renderMobileCards(paginatedFinal) :
                                    <div className="text-center text-gray-500">No students found.</div>
                                }
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col sm:flex-row justify-end items-center mt-4 gap-2">
                                <Button variant="outline" size="sm" disabled={pageFinal === 1} onClick={() => setPageFinal(pageFinal - 1)}>Previous</Button>
                                <span className="px-2 py-1 text-sm">Page {pageFinal} of {totalPagesFinal}</span>
                                <Button variant="outline" size="sm" disabled={pageFinal === totalPagesFinal} onClick={() => setPageFinal(pageFinal + 1)}>Next</Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
