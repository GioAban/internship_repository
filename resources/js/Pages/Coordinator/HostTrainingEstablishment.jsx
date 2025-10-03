import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
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
    DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle, Search, Eye, Pencil, RefreshCw } from "lucide-react";

// Dummy data for companies
const initialCompanies = [
    { id: 1, name: "Accenture", owner: "Eherson Valdez", supervisor: "Supervisor 1", contact: "09123456789", nature: "Industry", email: "acc@company.com" },
    { id: 2, name: "IBM", owner: "Jane Doe", supervisor: "Supervisor 2", contact: "09987654321", nature: "Business", email: "ibm@company.com" },
    { id: 3, name: "PLDT", owner: "John Smith", supervisor: "Supervisor 3", contact: "09111222333", nature: "Industry", email: "pldt@company.com" },
];
const companyNatures = ["Government", "Industry", "Business", "Other"];

export default function HostTrainingEstablishment() {
    const [search, setSearch] = useState("");
    const [companies, setCompanies] = useState(initialCompanies);
    const [page, setPage] = useState(1);
    const perPage = 5;
    const [filterNature, setFilterNature] = useState("");

    const filteredCompanies = companies.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) &&
            (filterNature === "" || c.nature === filterNature)
    );

    const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / perPage));
    const paginatedCompanies = filteredCompanies.slice(
        (page - 1) * perPage,
        page * perPage
    );

    // Modal state
    const [openAdd, setOpenAdd] = useState(false);
    const [form, setForm] = useState({
        name: "", owner: "", supervisor: "", contact: "",
        address: "", nature: "", moaStart: "", moaEnd: "",
        email: "", password: Math.random().toString(36).slice(-6),
        files: null,
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const handleAddCompany = () => {
        let newErrors = {};

        // Required fields
        if (!form.name.trim()) newErrors.name = "Company name is required.";
        if (!form.owner.trim()) newErrors.owner = "Owner is required.";
        if (!form.supervisor.trim()) newErrors.supervisor = "Supervisor is required.";
        if (!form.contact.trim()) newErrors.contact = "Company Contact No. is required.";
        if (!form.nature.trim()) newErrors.nature = "Nature is required.";
        if (!form.email.trim()) newErrors.email = "Email is required."; // ✅ email required
        if (!form.password.trim()) newErrors.password = "Password is required."; // ✅ password required

        // Optional: simple email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (form.email && !emailPattern.test(form.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Add company
        setCompanies([
            ...companies,
            { ...form, id: Date.now(), files: form.files ? Array.from(form.files) : [] },
        ]);

        // Reset form
        setForm({
            name: "", owner: "", supervisor: "", contact: "",
            address: "", nature: "", moaStart: "", moaEnd: "",
            email: "", password: Math.random().toString(36).slice(-6),
            files: null,
        });
        setErrors({});
        setOpenAdd(false);
    };


    // Render mobile cards for small screens
    const renderMobileCards = (data) =>
        data.map((company) => (
            <div key={company.id} className="border rounded-md p-3 bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{company.name}</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-blue-900 text-white">
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                            <Pencil className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <p><strong>Owner:</strong> {company.owner}</p>
                    <p><strong>Supervisor:</strong> {company.supervisor}</p>
                    <p><strong>Contact:</strong> {company.contact}</p>
                    <p><strong>Nature:</strong> {company.nature}</p>
                    <p><strong>Email:</strong> {company.email}</p>
                </div>
            </div>
        ));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Host Training Establishments
                </h2>
            }
        >
            <Head title="Host Training Establishments" />
            <Card className="bg-neutral border-0">
                <CardHeader className="flex flex-row items-center justify-between p-2">
                    {/* Add Company Modal */}
                    <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                        <DialogContent className="max-w-xl w-full max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Add New Company</DialogTitle>
                                <DialogDescription>
                                    Fill in the company details below. All fields marked * are required.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-2">
                                <div>
                                    <Label>Company Name</Label>
                                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="dark:bg-gray-800 dark:border-gray-600" />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>
                                <div>
                                    <Label>Owner</Label>
                                    <Input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className="dark:bg-gray-800 dark:border-gray-600" />
                                    {errors.owner && <p className="text-red-500 text-sm">{errors.owner}</p>}
                                </div>
                                <div>
                                    <Label>Supervisor</Label>
                                    <Input value={form.supervisor} onChange={(e) => setForm({ ...form, supervisor: e.target.value })} className="dark:bg-gray-800 dark:border-gray-600" />
                                    {errors.supervisor && <p className="text-red-500 text-sm">{errors.supervisor}</p>}
                                </div>
                                <div>
                                    <Label>Company Contact No.</Label>
                                    <Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="dark:bg-gray-800 dark:border-gray-600" />
                                    {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                                </div>
                                <div>
                                    <Label>Address (Optional)</Label>
                                    <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="dark:bg-gray-800 dark:border-gray-600" />
                                </div>
                                <div>
                                    <Label>MOA Start Date (Optional)</Label>
                                    <Input type="date" value={form.moaStart} onChange={(e) => setForm({ ...form, moaStart: e.target.value })} className="dark:bg-gray-800 dark:border-gray-600" />
                                </div>
                                <div>
                                    <Label>MOA End Date (Optional)</Label>
                                    <Input type="date" value={form.moaEnd} onChange={(e) => setForm({ ...form, moaEnd: e.target.value })} className="dark:bg-gray-800 dark:border-gray-600" />
                                </div>
                                <div>
                                    <Label>Nature</Label>
                                    <select value={form.nature} onChange={(e) => setForm({ ...form, nature: e.target.value })} className="border border-gray-300 rounded px-2 py-1 w-full dark:bg-gray-800 dark:border-gray-600">
                                        <option value="">Select nature</option>
                                        {companyNatures.map((n, i) => <option key={i} value={n}>{n}</option>)}
                                    </select>
                                    {errors.nature && <p className="text-red-500 text-sm">{errors.nature}</p>}
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="dark:bg-gray-800 dark:border-gray-600" />
                                </div>
                                <div>
                                    <Label>Password (Auto-generated)</Label>
                                    <div className="flex items-center gap-2">
                                        <Input type={showPassword ? "text" : "password"} value={form.password} readOnly className="dark:bg-gray-800 dark:border-gray-600" />
                                        <Button type="button" variant="outline" size="sm" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <Label>Upload MOA Files</Label>
                                    <Input type="file" multiple onChange={(e) => setForm({ ...form, files: e.target.files })} className="dark:bg-gray-800 dark:border-gray-600" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddCompany} className="bg-blue-900 text-white hover:bg-blue-800 w-full sm:w-auto">
                                    Add
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </CardHeader>

                <CardContent>
                    {/* Search + Filter + Reload + Add */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                            <Search className="w-6 h-4 text-blue-900" />
                            <Input
                                placeholder="Search companies..."
                                value={search}
                                onChange={(e) => { setPage(1); setSearch(e.target.value); }}
                                className="flex-1 border-blue-900 dark:bg-gray-800 dark:border-gray-600"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-center">
                            <Button variant="outline" size="sm" onClick={() => { setFilterNature(""); setSearch(""); setPage(1); }} className="flex items-center justify-center dark:bg-gray-800 dark:border-gray-600">
                                <RefreshCw className="w-4 h-4" />
                            </Button>
                            <select value={filterNature} onChange={(e) => setFilterNature(e.target.value)} className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto dark:bg-gray-800 dark:border-gray-600">
                                <option value="">All</option>
                                {companyNatures.map((n, i) => <option key={i} value={n}>{n}</option>)}
                            </select>
                            <Button onClick={() => setOpenAdd(true)} className="bg-blue-900 hover:bg-blue-700 text-white flex items-center justify-center w-full sm:w-auto">
                                <PlusCircle className="w-4 h-4 mr-2" /> Add Company
                            </Button>
                        </div>
                    </div>

                    {/* Table for larger screens */}
                    <div className="overflow-x-auto hidden sm:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Supervisor</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Nature</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedCompanies.map(c => (
                                    <TableRow key={c.id}>
                                        <TableCell>{c.name}</TableCell>
                                        <TableCell>{c.owner}</TableCell>
                                        <TableCell>{c.supervisor}</TableCell>
                                        <TableCell>{c.contact}</TableCell>
                                        <TableCell>{c.nature}</TableCell>
                                        <TableCell>{c.email}</TableCell>
                                        <TableCell className="text-right flex justify-end gap-2">
                                            <Button variant="outline" size="sm" className="bg-blue-900 text-white"><Eye className="w-4 h-4" /></Button>
                                            <Button variant="outline" size="sm"><Pencil className="w-4 h-4" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {paginatedCompanies.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-gray-500">No companies found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile cards for small screens */}
                    <div className="sm:hidden flex flex-col gap-4">
                        {renderMobileCards(paginatedCompanies)}
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row justify-end items-center mt-4 gap-2">
                        <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                        <span className="px-2 py-1 text-sm">Page {page} of {totalPages}</span>
                        <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
