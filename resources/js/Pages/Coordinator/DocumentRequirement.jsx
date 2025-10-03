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
    DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusCircle, Pencil, Search } from "lucide-react";

export default function DocumentRequirement() {
    const [activeTab, setActiveTab] = useState("initial");

    // Sample Data States
    const [initialRequirements, setInitialRequirements] = useState([
        { category: "Resume", description: "Detailed resume with work experience" },
        { category: "Application Letter", description: "Letter stating your intent to apply" },
    ]);
    const [preliminaryRequirements, setPreliminaryRequirements] = useState([
        { category: "Medical Certificate", description: "Valid medical certificate" },
        { category: "Barangay Clearance", description: "Clearance from the Barangay" },
    ]);
    const [postRequirements, setPostRequirements] = useState([
        { category: "Final Report", description: "Report on the completed project" },
        { category: "Certificate of Completion", description: "Issued after completion of the task" },
    ]);

    // Modal States
    const [isInitialModalOpen, setIsInitialModalOpen] = useState(false);
    const [isPreliminaryModalOpen, setIsPreliminaryModalOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    // Form States
    const [initialRequirementForm, setInitialRequirementForm] = useState({ category: "", description: "" });
    const [preliminaryRequirementForm, setPreliminaryRequirementForm] = useState({ category: "", description: "" });
    const [postRequirementForm, setPostRequirementForm] = useState({ category: "", description: "" });

    // Search States
    const [initialSearch, setInitialSearch] = useState("");
    const [preliminarySearch, setPreliminarySearch] = useState("");
    const [postSearch, setPostSearch] = useState("");

    // Save Handlers
    const handleSaveInitialRequirement = () => {
        setInitialRequirements([...initialRequirements, initialRequirementForm]);
        setInitialRequirementForm({ category: "", description: "" });
        setIsInitialModalOpen(false);
    };

    const handleSavePreliminaryRequirement = () => {
        setPreliminaryRequirements([...preliminaryRequirements, preliminaryRequirementForm]);
        setPreliminaryRequirementForm({ category: "", description: "" });
        setIsPreliminaryModalOpen(false);
    };

    const handleSavePostRequirement = () => {
        setPostRequirements([...postRequirements, postRequirementForm]);
        setPostRequirementForm({ category: "", description: "" });
        setIsPostModalOpen(false);
    };

    // Filtering Function
    const filterData = (data, search) =>
        data.filter(item => item.category.toLowerCase().includes(search.toLowerCase()));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Document Requirements
                </h2>
            }
        >
            <Head title="Document Requirement" />
            <Card className="bg-nuetral border-none">
                <CardHeader>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="dark:bg-white-900">
                            <TabsTrigger value="initial">Initial Requirements</TabsTrigger>
                            <TabsTrigger value="pre">Preliminary Requirements</TabsTrigger>
                            <TabsTrigger value="post">Post Requirements</TabsTrigger>
                        </TabsList>


                        {/* Initial Tab */}
                        <TabsContent value="initial">
                            <CardContent className="p-0 mt-4">
                                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                                    <div className="relative w-full sm:w-1/3">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search requirement..."
                                            value={initialSearch}
                                            onChange={(e) => setInitialSearch(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                    <Button
                                        onClick={() => setIsInitialModalOpen(true)}
                                        className="bg-blue-900 hover:bg-blue-700 text-white flex items-center"
                                    >
                                        <PlusCircle className="w-4 h-4 mr-2" /> Add Initial Requirement
                                    </Button>
                                </div>

                                {/* Initial Requirements Table */}
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead className="w-20 text-center">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {initialRequirements.length > 0 ? (
                                            filterData(initialRequirements, initialSearch).map((req, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>{req.category}</TableCell>
                                                    <TableCell>{req.description}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                                                            <Pencil className="w-4 h-4" /> Edit
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center text-gray-500">
                                                    No requirements found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </TabsContent>

                        {/* Preliminary Tab */}
                        <TabsContent value="pre">
                            <CardContent className="p-0 mt-4">
                                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                                    <div className="relative w-full sm:w-1/3">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search requirement..."
                                            value={preliminarySearch}
                                            onChange={(e) => setPreliminarySearch(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                    <Button
                                        onClick={() => setIsPreliminaryModalOpen(true)}
                                        className="bg-blue-900 hover:bg-blue-700 text-white flex items-center"
                                    >
                                        <PlusCircle className="w-4 h-4 mr-2" /> Add Preliminary Requirement
                                    </Button>
                                </div>

                                {/* Preliminary Requirements Table */}
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead className="w-20 text-center">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {preliminaryRequirements.length > 0 ? (
                                            filterData(preliminaryRequirements, preliminarySearch).map((req, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>{req.category}</TableCell>
                                                    <TableCell>{req.description}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                                                            <Pencil className="w-4 h-4" /> Edit
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center text-gray-500">
                                                    No requirements found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </TabsContent>

                        {/* Post Tab */}
                        <TabsContent value="post">
                            <CardContent className="p-0 mt-4">
                                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                                    <div className="relative w-full sm:w-1/3">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search requirement..."
                                            value={postSearch}
                                            onChange={(e) => setPostSearch(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                    <Button
                                        onClick={() => setIsPostModalOpen(true)}
                                        className="bg-blue-900 hover:bg-blue-700 text-white flex items-center"
                                    >
                                        <PlusCircle className="w-4 h-4 mr-2" /> Add Post Requirement
                                    </Button>
                                </div>

                                {/* Post Requirements Table */}
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead className="w-20 text-center">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {postRequirements.length > 0 ? (
                                            filterData(postRequirements, postSearch).map((req, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>{req.category}</TableCell>
                                                    <TableCell>{req.description}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                                                            <Pencil className="w-4 h-4" /> Edit
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center text-gray-500">
                                                    No requirements found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </TabsContent>

                    </Tabs>
                </CardHeader>
            </Card>

            {/* Modals for Adding Requirements */}
            {/* Initial Requirement Modal */}
            <Dialog open={isInitialModalOpen} onOpenChange={setIsInitialModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Initial Requirement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                placeholder="Category"
                                value={initialRequirementForm.category}
                                onChange={(e) =>
                                    setInitialRequirementForm({
                                        ...initialRequirementForm,
                                        category: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                placeholder="Description"
                                value={initialRequirementForm.description}
                                onChange={(e) =>
                                    setInitialRequirementForm({
                                        ...initialRequirementForm,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsInitialModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveInitialRequirement}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Preliminary Requirement Modal */}
            <Dialog open={isPreliminaryModalOpen} onOpenChange={setIsPreliminaryModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Preliminary Requirement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                placeholder="Category"
                                value={preliminaryRequirementForm.category}
                                onChange={(e) =>
                                    setPreliminaryRequirementForm({
                                        ...preliminaryRequirementForm,
                                        category: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                placeholder="Description"
                                value={preliminaryRequirementForm.description}
                                onChange={(e) =>
                                    setPreliminaryRequirementForm({
                                        ...preliminaryRequirementForm,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPreliminaryModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSavePreliminaryRequirement}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Post Requirement Modal */}
            <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Post Requirement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                placeholder="Category"
                                value={postRequirementForm.category}
                                onChange={(e) =>
                                    setPostRequirementForm({
                                        ...postRequirementForm,
                                        category: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                placeholder="Description"
                                value={postRequirementForm.description}
                                onChange={(e) =>
                                    setPostRequirementForm({
                                        ...postRequirementForm,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPostModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSavePostRequirement}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
