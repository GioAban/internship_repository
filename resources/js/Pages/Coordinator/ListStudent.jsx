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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle, Search, Eye, Pencil, EyeOff, FileSpreadsheet, RefreshCw } from "lucide-react";

// Dummy data for students
const initialStudents = [
    { id: 1, studentNumber: "20200823", subjectCode: "CS101", lastname: "Valdez", firstname: "Eherson", gender: "Male", company: "Accenture", password: "Accenture" },
    { id: 2, studentNumber: "20200824", subjectCode: "BM102", lastname: "Doe", firstname: "Jane", gender: "Female", company: "Unassigned", password: "" },
    { id: 3, studentNumber: "20200825", subjectCode: "ENG103", lastname: "Smith", firstname: "John", gender: "Male", company: "PLDT", password: "Accenture" },
];


const companyOptions = ["IBM", "Accenture", "PLDT", "Globe", "Google"];


export default function ListStudent() {
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState(initialStudents);

    // Pagination
    const [page, setPage] = useState(1);
    const perPage = 5;
    // Add these states at the top of your component
    const [filterGender, setFilterGender] = useState("");
    const [filterCompany, setFilterCompany] = useState("");

    // Update filteredStudents with additional filters
    const filteredStudents = students.filter(
        (s) =>
            (s.studentNumber.toLowerCase().includes(search.toLowerCase()) ||
                s.lastname.toLowerCase().includes(search.toLowerCase()) ||
                s.firstname.toLowerCase().includes(search.toLowerCase()) ||
                s.subjectCode.toLowerCase().includes(search.toLowerCase())) &&
            (filterGender === "" || s.gender === filterGender) &&
            (filterCompany === "" || s.company === filterCompany)
    );

    const totalPages = Math.ceil(filteredStudents.length / perPage);
    const paginatedStudents = filteredStudents.slice(
        (page - 1) * perPage,
        page * perPage
    );

    // Modal States
    const [openAdd, setOpenAdd] = useState(false);
    const [openImport, setOpenImport] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [excelFile, setExcelFile] = useState(null);

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        middleInitial: "",
        studentNumber: "",
        subjectCode: "",
        gender: "",
        contact: "",
        address: "",
        company: "",
        department: "",
        birthday: "",
        email: "",
        password: Math.random().toString(36).slice(-6), // auto-generated
        parent: "",
        photo: null,
    });
    const [errors, setErrors] = useState({});

    // Handle Add Student
    const handleAddStudent = () => {
        let newErrors = {};
        if (!form.firstname.trim()) newErrors.firstname = "Firstname is required.";
        if (!form.lastname.trim()) newErrors.lastname = "Lastname is required.";
        if (!form.studentNumber.trim()) newErrors.studentNumber = "Student Number is required.";
        if (!form.subjectCode.trim()) newErrors.subjectCode = "Subject code is required.";
        if (!form.gender.trim()) newErrors.gender = "Gender is required.";
        if (!form.email.trim()) newErrors.email = "Email is required.";
        if (!form.password.trim()) newErrors.password = "Password is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setStudents([
            ...students,
            {
                id: Date.now(),
                studentNumber: form.studentNumber,
                subjectCode: form.subjectCode,
                lastname: form.lastname,
                firstname: form.firstname,
                gender: form.gender,
                company: form.company || "Unassigned",
            }
        ]);

        // reset
        setForm({
            firstname: "",
            lastname: "",
            middleInitial: "",
            studentNumber: "",
            subjectCode: "",
            gender: "",
            contact: "",
            address: "",
            company: "",
            department: "",
            birthday: "",
            email: "",
            password: Math.random().toString(36).slice(-6),
            parent: "",
            photo: null,
        });
        setErrors({});
        setOpenAdd(false);

    };

    // Handle Excel Import (UI only for now)
    const handleImportExcel = () => {
        if (!excelFile) {
            alert("Please choose an Excel file first.");
            return;
        }
        console.log("Excel file uploaded:", excelFile.name);
        setExcelFile(null);
        setOpenImport(false);
    };

    const [showTempPw, setShowTempPw] = useState(false);
    const [visiblePasswords, setVisiblePasswords] = useState({});

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    List of Students
                </h2>
            }
        >
            <Head title="ListStudent" />
            <Card className="bg-neutral border-0">
                <CardHeader className="flex flex-row items-center justify-between p-2">

                    {/* Add Student Modal */}
                    <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                        <DialogContent className="max-w-lg w-full max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Add New Student</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-2">
                                {/* Firstname */}
                                <div>
                                    <Label>Firstname</Label>
                                    <Input
                                        value={form.firstname}
                                        onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                                    />
                                    {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
                                </div>

                                {/* Lastname */}
                                <div>
                                    <Label>Lastname</Label>
                                    <Input
                                        value={form.lastname}
                                        onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                                    />
                                    {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                                </div>

                                {/* Middle Initial */}
                                <div>
                                    <Label>Middle Initial (Optional)</Label>
                                    <Input
                                        value={form.middleInitial}
                                        onChange={(e) => setForm({ ...form, middleInitial: e.target.value })}
                                    />
                                </div>

                                {/* Student Number */}
                                <div>
                                    <Label>Student Number</Label>
                                    <Input
                                        value={form.studentNumber}
                                        onChange={(e) => setForm({ ...form, studentNumber: e.target.value })}
                                    />
                                    {errors.studentNumber && <p className="text-red-500 text-sm">{errors.studentNumber}</p>}
                                </div>

                                {/* Subject Code */}
                                <div>
                                    <Label>Subject Code</Label>
                                    <Input
                                        value={form.subjectCode}
                                        onChange={(e) => setForm({ ...form, subjectCode: e.target.value })}
                                    />
                                    {errors.subjectCode && <p className="text-red-500 text-sm">{errors.subjectCode}</p>}
                                </div>

                                {/* Gender Dropdown */}
                                <div>
                                    <Label>Gender</Label>
                                    <select
                                        value={form.gender}
                                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                                        className="border border-gray-300 rounded px-2 py-1 w-full dark:bg-gray-800 dark:border-gray-600"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                                </div>

                                {/* Company Dropdown (Optional) */}
                                <div>
                                    <Label>Company (Optional)</Label>
                                    <select
                                        value={form.company}
                                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                                        className="border border-gray-300 rounded px-2 py-1 w-full dark:bg-gray-800 dark:border-gray-600"
                                    >
                                        {companyOptions.map((comp, index) => (
                                            <option key={index} value={comp}>{comp}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Email */}
                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <Label>Password (Auto-generated)</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            value={form.password}
                                            readOnly
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    onClick={handleAddStudent}
                                    className="bg-blue-900 text-white hover:bg-blue-800 hover:text-gray-200 w-full sm:w-auto"
                                >
                                    Add
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Import Excel Modal */}
                    <Dialog open={openImport} onOpenChange={setOpenImport}>
                        <DialogContent className="max-w-md w-full">
                            <DialogHeader>
                                <DialogTitle>Import Students from Excel</DialogTitle>
                            </DialogHeader>
                            <div className="py-2">
                                <Label>Choose Excel File</Label>
                                <Input
                                    type="file"
                                    accept=".xls,.xlsx"
                                    onChange={(e) => setExcelFile(e.target.files[0])}
                                />
                            </div>
                            <DialogFooter>
                                <Button
                                    onClick={handleImportExcel}
                                    className="bg-blue-900 hover:bg-blue-700 text-white w-full sm:w-auto"
                                >
                                    Upload
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent>
                    {/* Tabs at the top */}
                    <Tabs defaultValue="students" className="w-full">
                        <TabsList>
                            <TabsTrigger value="students">List Student</TabsTrigger>
                            <TabsTrigger value="accounts">Accounts</TabsTrigger>
                        </TabsList>

                        {/* Students Tab */}
                        <TabsContent value="students">
                            {/* Search Bar + Filters + Buttons */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mb-4 mt-4">
                                <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                                    <Search className="w-6 h-4 text-blue-900" />
                                    <Input
                                        placeholder="Search students..."
                                        value={search}
                                        onChange={(e) => {
                                            setPage(1);
                                            setSearch(e.target.value);
                                        }}
                                        className="flex-1 border-blue-900"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-center">
                                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                                        {/* Reset/Reload Button */}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setFilterGender("");
                                                setFilterCompany("");
                                                setSearch("");
                                                setPage(1);
                                            }}
                                            className="flex items-center justify-center dark:bg-gray-800 dark:border-gray-600"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                        </Button>
                                        <select
                                            value={filterGender}
                                            onChange={(e) => setFilterGender(e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto dark:bg-gray-800 dark:border-gray-600"
                                        >
                                            <option value="">All Genders</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>

                                        <select
                                            value={filterCompany}
                                            onChange={(e) => setFilterCompany(e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto dark:bg-gray-800 dark:border-gray-600"
                                        >
                                            <option value="">All Companies</option>
                                            {companyOptions.map((comp, i) => (
                                                <option key={i} value={comp}>{comp}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Import + Add Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                        <Button
                                            onClick={() => setOpenImport(true)}
                                            className="bg-blue-900 hover:bg-blue-700 text-white flex items-center justify-center w-full sm:w-auto"
                                        >
                                            <FileSpreadsheet className="w-4 h-4 mr-2" />
                                            Import Excel
                                        </Button>
                                        <Button
                                            onClick={() => setOpenAdd(true)}
                                            className="bg-blue-900 hover:bg-blue-700 text-white flex items-center justify-center w-full sm:w-auto"
                                        >
                                            <PlusCircle className="w-4 h-4 mr-2" />
                                            Add Student
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Table for Large Screens */}
                            <div className="overflow-x-auto hidden sm:block mt-2">
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
                                        {paginatedStudents.map((student) => (
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
                                        ))}
                                        {paginatedStudents.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center text-gray-500">
                                                    No students found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="sm:hidden flex flex-col gap-4 mt-2">
                                {paginatedStudents.map((student) => (
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
                                ))}
                                {paginatedStudents.length === 0 && (
                                    <div className="text-center text-gray-500">No students found.</div>
                                )}
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
                        </TabsContent>

                        <TabsContent value="accounts">
                            {/* Search Bar + Filters + Pagination Controls */}
                            <div className="flex items-center justify-between gap-2 mb-4 mt-4">
                                {/* Search Bar */}
                                <div className="flex items-center gap-2 flex-1 sm:w-auto">
                                    <Search className="w-6 h-4 text-blue-900" />
                                    <Input
                                        placeholder="Search accounts..."
                                        value={search}
                                        onChange={(e) => {
                                            setPage(1); // Reset to page 1 when searching
                                            setSearch(e.target.value);
                                        }}
                                        className="flex-1 border-blue-900"
                                    />
                                </div>

                                {/* Filters */}
                                <div className="flex gap-4">
                                    {/* Gender Filter */}
                                    <select
                                        value={filterGender}
                                        onChange={(e) => setFilterGender(e.target.value)}
                                        className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto dark:bg-gray-800 dark:border-gray-600"
                                    >
                                        <option value="">All Genders</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                {/* Reset Button */}
                                <div className="flex items-center">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSearch(""); // Reset search
                                            setPage(1); // Reset to page 1
                                        }}
                                        className="flex items-center justify-center dark:bg-gray-800 dark:border-gray-600"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>


                            <div className="overflow-x-auto mt-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Student No</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Gender</TableHead>
                                            <TableHead>Temporary Password</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {/* Filtered and Paginated Students */}
                                        {paginatedStudents.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center text-gray-500">
                                                    No accounts found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            paginatedStudents.map((student, index) => (
                                                <TableRow key={student.id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{student.studentNumber}</TableCell>
                                                    <TableCell>{student.firstname} {student.lastname}</TableCell>
                                                    <TableCell>{student.gender}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-mono">
                                                                {student.password
                                                                    ? (visiblePasswords[student.id] ? student.password : "••••••")
                                                                    : "🔒"}
                                                            </span>
                                                            {student.password && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        setVisiblePasswords(prev => ({
                                                                            ...prev,
                                                                            [student.id]: !prev[student.id]
                                                                        }))
                                                                    }
                                                                >
                                                                    {visiblePasswords[student.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
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
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
