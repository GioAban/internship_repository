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

export default function User() {
    const { initialUsers = [] } = usePage().props;
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState(initialUsers);

    // Pagination
    const [page, setPage] = useState(1);
    const perPage = 5;
    const filteredUsers = users.filter((u) => {
        const name = u.name?.toLowerCase() || "";
        const employeeNumber = u.employee_number?.toLowerCase() || "";
        const programName = u.program?.name?.toLowerCase() || ""; // <-- use u.program.name
        const email = u.email?.toLowerCase() || "";

        return (
            name.includes(search.toLowerCase()) ||
            employeeNumber.includes(search.toLowerCase()) ||
            programName.includes(search.toLowerCase()) ||
            email.includes(search.toLowerCase())
        );
    });


    const totalPages = Math.ceil(filteredUsers.length / perPage);
    const paginatedUsers = filteredUsers.slice(
        (page - 1) * perPage,
        page * perPage
    );

    // Modal State
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ photo: "", name: "", employee_number: "", program: "", email: "" });
    const [errors, setErrors] = useState({});

    // Handle Add User
    const handleAddUser = () => {
        let newErrors = {};
        if (!form.photo.trim()) newErrors.photo = "Photo URL is required.";
        if (!form.name.trim()) newErrors.name = "Name is required.";
        if (!form.employee_number.trim()) newErrors.employee_number = "Employee number is required.";
        if (!form.email.trim()) newErrors.email = "Email is required.";
        if (!form.program.trim()) newErrors.program = "Program is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const today = new Date().toISOString().split("T")[0];

        setUsers([
            ...users,
            { id: Date.now(), ...form, added_at: today }
        ]);

        setForm({ photo: "", name: "", employee_number: "", program: "", email: "" });
        setErrors({});
        setOpen(false);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Users
                </h2>
            }
        >
            <Head title="User" />
            <Card className="bg-neutral border-0">
                <CardHeader className="flex flex-row items-center justify-between">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="max-w-lg w-full">
                            <DialogHeader>
                                <DialogTitle>Add New User</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-2">
                                <div>
                                    <Label>Photo (URL)</Label>
                                    <Input
                                        value={form.photo}
                                        onChange={(e) => setForm({ ...form, photo: e.target.value })}
                                    />
                                    {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
                                </div>
                                <div>
                                    <Label>Name</Label>
                                    <Input
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>
                                <div>
                                    <Label>Employee Number</Label>
                                    <Input
                                        value={form.employee_number}
                                        onChange={(e) => setForm({ ...form, employee_number: e.target.value })}
                                    />
                                    {errors.employee_number && <p className="text-red-500 text-sm">{errors.employee_number}</p>}
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <Label htmlFor="program">Program</Label>
                                    <select
                                        id="program"
                                        value={form.program}
                                        onChange={(e) => setForm({ ...form, program: e.target.value })}
                                        className="w-full border border-gray-300 dark:border-gray-600 p-2 focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                                    >
                                        <option value="">-- Select Program --</option>
                                        <option value="BSCS">Bachelor of Science in Computer Science</option>
                                        <option value="BSCpE">Bachelor of Science in Computer Engineering</option>
                                        <option value="BSCrim">Bachelor of Science in Criminology</option>
                                    </select>
                                    {errors.program && <p className="text-red-500 text-sm mt-1">{errors.program}</p>}
                                </div>
                            </div>
                            <DialogFooter className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    className="w-full sm:w-auto"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleAddUser}
                                    className="bg-blue-900 text-white w-full sm:w-auto"
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent>
                    {/* Search and Add Button */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2 flex-1">
                            <Search className="w-5 h-5 text-blue-900 dark:text-gray-300" />
                            <Input
                                placeholder="Search users..."
                                value={search}
                                onChange={(e) => {
                                    setPage(1);
                                    setSearch(e.target.value);
                                }}
                                className="flex-1 border-blue-900 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200"
                            />
                        </div>

                        <Button
                            onClick={() => setOpen(true)}
                            className="bg-blue-900 hover:bg-blue-700 text-white flex items-center justify-center sm:w-auto w-full"
                        >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add New User
                        </Button>
                    </div>

                    {/* Table (Desktop) */}
                    <div className="hidden md:block overflow-x-auto border border-gray-200 dark:border-gray-700">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                                    <TableHead>Photo</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Employee No.</TableHead>
                                    <TableHead>Program</TableHead>
                                    <TableHead>Added At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedUsers.length > 0 ? (
                                    paginatedUsers.map((u) => (
                                        <TableRow key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <TableCell>
                                                <img
                                                    src={u.photo ? `/${u.photo}` : '/uploads/colleges/ucu_logo.png'}
                                                    alt={u.employee_number}
                                                    className="w-10 h-10 rounded-md object-contain"
                                                />
                                            </TableCell>
                                            <TableCell>{u.name}</TableCell>
                                            <TableCell>{u.employee_number}</TableCell>
                                            <TableCell>{u.program?.name || "-"}</TableCell>

                                            <TableCell>{new Date(u.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                                            <TableCell className="text-right flex justify-end gap-2">
                                                <Button size="sm" className="bg-blue-900 text-white">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button size="sm" variant="outline">
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-gray-500 dark:text-gray-400 py-4">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((u) => (
                                <Card
                                    key={u.id}
                                    className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <img
                                                src={u.photo ? `/${u.photo}` : '/uploads/colleges/ucu_logo.png'}
                                                alt={u.photo}
                                                className="w-12 h-12 rounded-md object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold">{u.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{u.employee_number}</p>
                                            </div>
                                        </div>
                                        <p><span className="font-semibold">Email:</span> {u.email}</p>
                                        <p><span className="font-semibold">Program:</span> {u.program?.name || "-"}</p>

                                        <p><span className="font-semibold">Added:</span> {u.added_at}</p>

                                        <div className="flex justify-end gap-2 mt-3">
                                            <Button size="sm" className="bg-blue-900 text-white">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">No users found.</p>
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
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
