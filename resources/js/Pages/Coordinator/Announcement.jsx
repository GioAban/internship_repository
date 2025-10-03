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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Dummy data
const initialAnnouncements = [
    { id: 1, title: "School Holiday", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", date: "2025-09-21", files: [] },
    { id: 2, title: "Exam Schedule", message: "Midterm exams start next week.", date: "2025-09-22", files: [] },
];

export default function Announcement() {
    const [announcements, setAnnouncements] = useState(initialAnnouncements);
    const [openModal, setOpenModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ title: "", message: "", files: [] });
    const [errors, setErrors] = useState({});

    // Delete Confirmation Modal State
    const [deleteId, setDeleteId] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);

    // Add or Update Announcement
    const handleSaveAnnouncement = () => {
        let newErrors = {};
        if (!form.title.trim()) newErrors.title = "Title is required.";
        if (!form.message.trim()) newErrors.message = "Message is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (editingId) {
            setAnnouncements(prev =>
                prev.map(a => a.id === editingId ? { ...a, ...form } : a)
            );
        } else {
            setAnnouncements([...announcements, { ...form, id: Date.now(), date: new Date().toISOString().split("T")[0] }]);
        }

        setForm({ title: "", message: "", files: [] });
        setErrors({});
        setEditingId(null);
        setOpenModal(false);
    };

    // Edit Announcement
    const handleEdit = (announcement) => {
        setForm({ title: announcement.title, message: announcement.message, files: announcement.files });
        setEditingId(announcement.id);
        setOpenModal(true);
    };

    // Open Delete Modal
    const handleDelete = (id) => {
        setDeleteId(id);
        setOpenDelete(true);
    };

    // Confirm Delete
    const confirmDelete = () => {
        setAnnouncements(prev => prev.filter(a => a.id !== deleteId));
        setDeleteId(null);
        setOpenDelete(false);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">Announcement</h2>}
        >
            <Head title="Announcement" />

            <Card className="bg-neutral border-0">
                <CardHeader className="flex justify-between items-center p-2">

                    <Button
                        onClick={() => { setForm({ title: "", message: "", files: [] }); setEditingId(null); setOpenModal(true); }}
                        className="bg-blue-900 hover:bg-blue-700 text-white flex items-center justify-center"
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Announcement
                    </Button>
                </CardHeader>

                <CardContent className="space-y-4">
                    {announcements.length === 0 && <p className="text-gray-500 text-center">No announcements yet.</p>}

                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 shadow-sm">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-lg">{announcement.title}</h3>
                                <span className="text-sm text-gray-500">{announcement.date}</span>
                            </div>
                            <div
                                className="mt-2 text-gray-700 dark:text-gray-300"
                                dangerouslySetInnerHTML={{ __html: announcement.message }}
                            />
                            {announcement.files.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {announcement.files.map((file, i) => (
                                        <a
                                            key={i}
                                            href={URL.createObjectURL(file)}
                                            target="_blank"
                                            className="text-sm text-blue-900 bg-blue-100 dark:bg-blue-700 dark:text-white px-2 py-1 rounded"
                                        >
                                            {file.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                            <div className="mt-3 flex gap-2 justify-end">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(announcement)}>
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleDelete(announcement.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Add/Edit Announcement Modal */}
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Edit Announcement" : "Add New Announcement"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>
                        <div>
                            <Label>Message</Label>
                            <ReactQuill
                                theme="snow"
                                value={form.message}
                                onChange={(value) => setForm({ ...form, message: value })}
                                className="h-40"
                            />
                            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                        </div>
                        <div>
                            <Label>Attach Files</Label>
                            <Input
                                type="file"
                                multiple
                                onChange={(e) => setForm({ ...form, files: Array.from(e.target.files) })}
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            {form.files.length > 0 && (
                                <div className="mt-2 space-y-1">
                                    {form.files.map((file, i) => (
                                        <div key={i} className="text-sm">{file.name}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleSaveAnnouncement}
                            className="bg-blue-900 text-white hover:bg-blue-800 hover:text-gray-200 w-full sm:w-auto"
                        >
                            {editingId ? "Update" : "Add"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent className="max-w-md w-full">
                    <DialogHeader>
                        <DialogTitle>Delete Announcement</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 dark:text-gray-200">
                        Are you sure you want to delete this announcement? This action cannot be undone.
                    </div>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setOpenDelete(false)}>Cancel</Button>
                        <Button className="bg-red-600 text-white hover:bg-red-700" onClick={confirmDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
