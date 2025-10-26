import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusCircle, Pencil, Search } from "lucide-react";

export default function DocumentRequirement() {
    const { initialRequirements = [] } = usePage().props;
    const { preRequirements = [] } = usePage().props;
    const { postRequirements = [] } = usePage().props;

    const [activeTab, setActiveTab] = useState("initial");
    const [preliminaryRequirements, setPreliminaryRequirements] = useState([
        { category: "Medical Certificate", status: true },
        { category: "Barangay Clearance", status: false },
    ]);

    // Modal States
    const [isInitialModalOpen, setIsInitialModalOpen] = useState(false);
    const [isPreliminaryModalOpen, setIsPreliminaryModalOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    // Form States
    const [initialRequirementForm, setInitialRequirementForm] = useState({ title: "", status: false });
    const [preliminaryRequirementForm, setPreliminaryRequirementForm] = useState({ category: "", status: false });
    const [postRequirementForm, setPostRequirementForm] = useState({ title: "", status: false });

    // Search States
    const [initialSearch, setInitialSearch] = useState("");
    const [preliminarySearch, setPreliminarySearch] = useState("");
    const [postSearch, setPostSearch] = useState("");

    // Pagination States
    const [initialPage, setInitialPage] = useState(1);
    const [preliminaryPage, setPreliminaryPage] = useState(1);
    const [postPage, setPostPage] = useState(1);
    const perPage = 5;

    // Filtering Function (fixed for each tab)
    const filterData = (data, search, field) =>
        data.filter(item => (item[field] || "").toLowerCase().includes(search.toLowerCase()));

    // Save Handlers
    const handleSaveInitialRequirement = () => {
        initialRequirements.push(initialRequirementForm);
        setInitialRequirementForm({ title: "", status: false });
        setIsInitialModalOpen(false);
    };

    const handleSavePreliminaryRequirement = () => {
        preliminaryRequirements.push(preliminaryRequirementForm);
        setPreliminaryRequirementForm({ category: "", status: false });
        setIsPreliminaryModalOpen(false);
    };

    const handleSavePostRequirement = () => {
        postRequirements.push(postRequirementForm);
        setPostRequirementForm({ title: "", status: false });
        setIsPostModalOpen(false);
    };

    // Paginate Function
    const paginate = (data, page) => data.slice((page - 1) * perPage, page * perPage);

    // Status Display
    const renderStatus = (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
            {status ? "Required" : "Optional"}
        </span>
    );

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">Document Requirements</h2>}
        >
            <Head title="Document Requirement" />
            <Card className="bg-neutral border-none">
                <CardHeader>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="dark:bg-white-900">
                            <TabsTrigger value="initial">Initial Requirements</TabsTrigger>
                            <TabsTrigger value="pre">Preliminary Requirements</TabsTrigger>
                            <TabsTrigger value="post">Post Requirements</TabsTrigger>
                        </TabsList>

                        {/* INITIAL TAB */}
                        <TabsContent value="initial">
                            <CardContent className="p-0 mt-4">
                                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                                    <div className="relative w-full sm:w-1/3">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search requirement..."
                                            value={initialSearch}
                                            onChange={(e) => { setInitialSearch(e.target.value); setInitialPage(1); }}
                                            className="pl-8"
                                        />
                                    </div>
                                    <Button onClick={() => setIsInitialModalOpen(true)} className="bg-blue-900 hover:bg-blue-700 text-white flex items-center">
                                        <PlusCircle className="w-4 h-4 mr-2" /> Add Initial Requirement
                                    </Button>
                                </div>

                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="w-20 text-center">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginate(filterData(initialRequirements, initialSearch, "title"), initialPage).map((req, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{req.title}</TableCell>
                                                <TableCell>{renderStatus(req.status)}</TableCell>
                                                <TableCell className="text-center">
                                                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                                                        <Pencil className="w-4 h-4" /> Edit
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </TabsContent>

                        {/* PRELIMINARY TAB */}
                        <TabsContent value="pre">
                            <CardContent className="p-0 mt-4">
                                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                                    <div className="relative w-full sm:w-1/3">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search requirement..."
                                            value={preliminarySearch}
                                            onChange={(e) => { setPreliminarySearch(e.target.value); setPreliminaryPage(1); }}
                                            className="pl-8"
                                        />
                                    </div>
                                    <Button onClick={() => setIsPreliminaryModalOpen(true)} className="bg-blue-900 hover:bg-blue-700 text-white flex items-center">
                                        <PlusCircle className="w-4 h-4 mr-2" /> Add Preliminary Requirement
                                    </Button>
                                </div>

                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="w-20 text-center">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginate(filterData(preliminaryRequirements, preliminarySearch, "category"), preliminaryPage).map((req, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{req.category}</TableCell>
                                                <TableCell>{renderStatus(req.status)}</TableCell>
                                                <TableCell className="text-center">
                                                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                                                        <Pencil className="w-4 h-4" /> Edit
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </TabsContent>

                        {/* POST TAB */}
                        <TabsContent value="post">
                            <CardContent className="p-0 mt-4">
                                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                                    <div className="relative w-full sm:w-1/3">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search requirement..."
                                            value={postSearch}
                                            onChange={(e) => { setPostSearch(e.target.value); setPostPage(1); }}
                                            className="pl-8"
                                        />
                                    </div>
                                    <Button onClick={() => setIsPostModalOpen(true)} className="bg-blue-900 hover:bg-blue-700 text-white flex items-center">
                                        <PlusCircle className="w-4 h-4 mr-2" /> Add Post Requirement
                                    </Button>
                                </div>

                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="w-20 text-center">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginate(filterData(postRequirements, postSearch, "title"), postPage).map((req, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{req.title}</TableCell>
                                                <TableCell>{renderStatus(req.status)}</TableCell>
                                                <TableCell className="text-center">
                                                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                                                        <Pencil className="w-4 h-4" /> Edit
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </TabsContent>
                    </Tabs>
                </CardHeader>
            </Card>

            {/* MODALS remain unchanged... */}
        </AuthenticatedLayout>
    );
}
