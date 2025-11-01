import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Card, CardContent, CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusCircle, Pencil, Search, RefreshCw, Filter } from "lucide-react";

export default function DocumentRequirement() {
    const { initialRequirements = [], preRequirements = [], postRequirements = [] } = usePage().props;


    const [activeTab, setActiveTab] = useState("initial");

    // Modal States
    const [isInitialModalOpen, setIsInitialModalOpen] = useState(false);
    const [isPreliminaryModalOpen, setIsPreliminaryModalOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    // Form States
    const [initialForm, setInitialForm] = useState({ title: "", is_required: 0 });
    const [preForm, setPreForm] = useState({ category: "", is_required: 0 });
    const [postForm, setPostForm] = useState({ title: "", is_required: 0 });

    // Search, Filter, Pagination States
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all"); // all | required | optional
    const [page, setPage] = useState(1);
    const perPage = 5;

    // Filtering logic
    const getData = () => {
        const list =
            activeTab === "initial"
                ? initialRequirements
                : activeTab === "pre"
                    ? preRequirements
                    : postRequirements;

        return list
            .filter((item) => {
                const field = item.title || item.category || "";
                return field.toLowerCase().includes(search.toLowerCase());
            })
            .filter((item) => {
                if (filter === "required") return item.is_required === 1;
                if (filter === "optional") return item.is_required === 0;
                return true;
            });
    };

    const filteredData = getData();
    const totalPages = Math.ceil(filteredData.length / perPage);
    const paginatedData = filteredData.slice((page - 1) * perPage, page * perPage);

    const renderStatus = (is_required) => (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${is_required === 1
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                }`}
        >
            {is_required === 1 ? "Required" : "Optional"}
        </span>
    );

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-gray-800 dark:text-gray-200">Document Requirements</h2>}
        >
            <Head title="Document Requirement" />

            <Card className="bg-neutral border-none">
                <CardHeader>
                    <Tabs
                        value={activeTab}
                        onValueChange={(v) => {
                            setActiveTab(v);
                            setSearch("");
                            setFilter("all");
                            setPage(1);
                        }}
                    >
                        <TabsList className="bg-gray-100 p-1 rounded-lg">
                            <TabsTrigger value="initial" className="text-sm font-medium">Initial</TabsTrigger>
                            <TabsTrigger value="pre" className="text-sm font-medium">Preliminary</TabsTrigger>
                            <TabsTrigger value="post" className="text-sm font-medium">Post</TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab}>
                            <CardContent className="p-0 mt-4">
                                {/* Search + Filter + Button Row */}
                                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                                    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
                                        {/* Search */}
                                        <div className="relative w-full sm:w-64">
                                            <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
                                            <Input
                                                placeholder="Search requirement..."
                                                value={search}
                                                onChange={(e) => {
                                                    setSearch(e.target.value);
                                                    setPage(1);
                                                }}
                                                className="pl-8"
                                            />
                                        </div>

                                        {/* Filter Dropdown */}
                                        <div className="relative w-full sm:w-40">
                                            <Filter className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
                                            <select
                                                value={filter}
                                                onChange={(e) => {
                                                    setFilter(e.target.value);
                                                    setPage(1);
                                                }}
                                                className="pl-8 border rounded-md w-full h-9 text-sm"
                                            >
                                                <option value="all">All</option>
                                                <option value="required">Required</option>
                                                <option value="optional">Optional</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSearch("");
                                                setFilter("all");
                                                setPage(1);
                                            }}
                                        >
                                            <RefreshCw className="w-4 h-4 mr-1" /> Clear
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                activeTab === "initial"
                                                    ? setIsInitialModalOpen(true)
                                                    : activeTab === "pre"
                                                        ? setIsPreliminaryModalOpen(true)
                                                        : setIsPostModalOpen(true)
                                            }
                                            className="bg-blue-900 hover:bg-blue-700 text-white flex items-center text-sm"
                                        >
                                            <PlusCircle className="w-4 h-4 mr-1" /> Add
                                        </Button>
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto border rounded-md">
                                    <Table>
                                        <TableHeader className="bg-gray-100">
                                            <TableRow>
                                                <TableHead className="w-16 text-center">#</TableHead>
                                                <TableHead>{activeTab === "pre" ? "Category" : "Title"}</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-center">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedData.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                                                        No results found.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                paginatedData.map((req, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell className="text-center">
                                                            {(page - 1) * perPage + i + 1}
                                                        </TableCell>
                                                        <TableCell>{req.title || req.category}</TableCell>
                                                        <TableCell>{renderStatus(req.is_required)}</TableCell>
                                                        <TableCell className="text-center">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="flex items-center gap-1"
                                                            >
                                                                <Pencil className="w-4 h-4" /> Edit
                                                            </Button>
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
                                        Page {page} of {totalPages || 1}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={page === totalPages || totalPages === 0}
                                        onClick={() => setPage(page + 1)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </CardContent>
                        </TabsContent>
                    </Tabs>
                </CardHeader>
            </Card>

            {/* INITIAL MODAL */}
            <Dialog open={isInitialModalOpen} onOpenChange={setIsInitialModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Initial Requirement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Label>Title</Label>
                        <Input
                            value={initialForm.title}
                            onChange={(e) => setInitialForm({ ...initialForm, title: e.target.value })}
                            placeholder="Enter requirement title"
                        />
                        <Label>Status</Label>
                        <select
                            value={initialForm.is_required === 1 ? "required" : "optional"}
                            onChange={(e) =>
                                setInitialForm({ ...initialForm, is_required: e.target.value === "required" ? 1 : 0 })
                            }
                            className="border rounded p-2 w-full"
                        >
                            <option value="required">Required</option>
                            <option value="optional">Optional</option>
                        </select>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsInitialModalOpen(false)} variant="outline">
                            Cancel
                        </Button>
                        <Button className="bg-blue-900 hover:bg-blue-700 text-white">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* PRELIMINARY MODAL */}
            <Dialog open={isPreliminaryModalOpen} onOpenChange={setIsPreliminaryModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Preliminary Requirement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Label>Category</Label>
                        <Input
                            value={preForm.category}
                            onChange={(e) => setPreForm({ ...preForm, category: e.target.value })}
                            placeholder="Enter requirement category"
                        />
                        <Label>Status</Label>
                        <select
                            value={preForm.is_required === 1 ? "required" : "optional"}
                            onChange={(e) =>
                                setPreForm({ ...preForm, is_required: e.target.value === "required" ? 1 : 0 })
                            }
                            className="border rounded p-2 w-full"
                        >
                            <option value="required">Required</option>
                            <option value="optional">Optional</option>
                        </select>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsPreliminaryModalOpen(false)} variant="outline">
                            Cancel
                        </Button>
                        <Button className="bg-blue-900 hover:bg-blue-700 text-white">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* POST MODAL */}
            <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Post Requirement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Label>Title</Label>
                        <Input
                            value={postForm.title}
                            onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                            placeholder="Enter requirement title"
                        />
                        <Label>Status</Label>
                        <select
                            value={postForm.is_required === 1 ? "required" : "optional"}
                            onChange={(e) =>
                                setPostForm({ ...postForm, is_required: e.target.value === "required" ? 1 : 0 })
                            }
                            className="border rounded p-2 w-full"
                        >
                            <option value="required">Required</option>
                            <option value="optional">Optional</option>
                        </select>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsPostModalOpen(false)} variant="outline">
                            Cancel
                        </Button>
                        <Button className="bg-blue-900 hover:bg-blue-700 text-white">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );


}
