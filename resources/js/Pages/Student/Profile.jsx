import { Head } from "@inertiajs/react";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/Layouts/StudentNavigation/Navbar";
import Sidebar from "@/Layouts/StudentNavigation/Sidebar";
import { Plus, Edit2, Trash2, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Profile({ user }) {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const [studentInfo, setStudentInfo] = useState({
        name: user?.name || "Student Name",
        email: user?.email || "N/A",
        contact: "N/A",
        sex: "Male",
        birthday: "N/A",
        age: "N/A",
        address: "N/A",
        department: "College of Information and Technology Education",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(studentInfo);

    const [skills, setSkills] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" },
        { id: 3, name: "JavaScript" },
        { id: 4, name: "React" },
        { id: 5, name: "Laravel" },
    ]);
    const [newSkill, setNewSkill] = useState("");
    const [editingSkill, setEditingSkill] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const skillsPerPage = 5;

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const addSkill = () => {
        if (newSkill.trim() === "") return;
        const newItem = { id: Date.now(), name: newSkill };
        setSkills([...skills, newItem]);
        setNewSkill("");
    };

    const deleteSkill = (id) => setSkills(skills.filter((s) => s.id !== id));

    const startEdit = (skill) => {
        setEditingSkill(skill.id);
        setEditValue(skill.name);
    };

    const saveEdit = (id) => {
        setSkills(skills.map((s) => (s.id === id ? { ...s, name: editValue } : s)));
        setEditingSkill(null);
        setEditValue("");
    };

    const handleEditInfo = () => {
        setFormData(studentInfo);
        setIsModalOpen(true);
    };

    const handleSaveInfo = () => {
        setStudentInfo(formData);
        setIsModalOpen(false);
    };

    const filteredSkills = useMemo(() => {
        return skills.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [skills, searchTerm]);

    const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);
    const startIndex = (currentPage - 1) * skillsPerPage;
    const paginatedSkills = filteredSkills.slice(startIndex, startIndex + skillsPerPage);

    return (
        <div
            className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
                }`}
        >
            <Head title="Profile" />

            <Navbar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                isMobileSidebarOpen={isMobileSidebarOpen}
                setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />

            <div className="flex flex-1 pt-[70px]">
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                    darkMode={darkMode}
                />

                <main
                    className={`flex-1 min-h-screen px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "ml-0"
                        }`}
                >
                    {/* ✅ Responsive Row Layout */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* ✅ Student Information Card */}
                        <section className="flex-1 p-6 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Student Information</h3>
                                <Button onClick={handleEditInfo} variant="outline" size="sm">
                                    <Edit2 className="w-4 h-4 mr-1" /> Edit
                                </Button>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                <img
                                    src="/storage/profile.jpg"
                                    alt="Profile"
                                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-blue-500 object-cover shadow-md"
                                />
                                <div className="overflow-x-auto w-full">
                                    <table className="w-full text-sm border-collapse">
                                        <tbody>
                                            {Object.entries(studentInfo).map(([key, value]) => (
                                                <tr
                                                    key={key}
                                                    className="border-b border-gray-200 dark:border-gray-700"
                                                >
                                                    <td className="p-2 capitalize font-semibold w-1/3">
                                                        {key.replace("_", " ")}
                                                    </td>
                                                    <td className="p-2 break-words">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        {/* ✅ Skills Management Card */}
                        <section className="flex-1 p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Skills</h3>

                            {/* ✅ Search + Add Inputs */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                                <div className="relative w-full sm:w-auto">
                                    <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
                                    <Input
                                        type="text"
                                        placeholder="Search skill..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="pl-8 w-full sm:w-56"
                                    />
                                </div>
                                <div className="flex w-full sm:w-auto gap-2">
                                    <Input
                                        type="text"
                                        placeholder="Add new skill..."
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        className="w-full sm:w-56"
                                    />
                                    <Button onClick={addSkill}>
                                        <Plus className="w-4 h-4 mr-1" /> Add
                                    </Button>
                                </div>
                            </div>

                            {/* ✅ Skills Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-md text-sm">
                                    <thead
                                        className={`${darkMode
                                            ? "bg-gray-700 text-gray-100"
                                            : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        <tr>
                                            <th className="px-4 py-3 text-left font-medium">Skill</th>
                                            <th className="px-4 py-3 text-center font-medium w-32">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedSkills.length > 0 ? (
                                            paginatedSkills.map((skill) => (
                                                <tr
                                                    key={skill.id}
                                                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                >
                                                    <td className="px-4 py-3">
                                                        {editingSkill === skill.id ? (
                                                            <Input
                                                                value={editValue}
                                                                onChange={(e) =>
                                                                    setEditValue(e.target.value)
                                                                }
                                                            />
                                                        ) : (
                                                            skill.name
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        {editingSkill === skill.id ? (
                                                            <Button
                                                                size="sm"
                                                                onClick={() => saveEdit(skill.id)}
                                                            >
                                                                Save
                                                            </Button>
                                                        ) : (
                                                            <div className="flex justify-center gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => startEdit(skill)}
                                                                >
                                                                    <Edit2 className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() =>
                                                                        deleteSkill(skill.id)
                                                                    }
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="2"
                                                    className="text-center py-4 text-gray-500 dark:text-gray-400"
                                                >
                                                    No skills found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* ✅ Pagination */}
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm gap-2">
                                <p>
                                    Page {currentPage} of {totalPages || 1}
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((p) => p - 1)}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        onClick={() => setCurrentPage((p) => p + 1)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* ✅ Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-4">
                    <div
                        className={`p-6 rounded-lg shadow-lg w-full max-w-md ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
                            }`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Edit Student Information</h3>
                            <button onClick={() => setIsModalOpen(false)}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {Object.entries(formData).map(([key, value]) => (
                            <div key={key} className="mb-3">
                                <label className="block text-sm font-medium capitalize mb-1">
                                    {key.replace("_", " ")}
                                </label>
                                <Input
                                    value={value}
                                    onChange={(e) =>
                                        setFormData({ ...formData, [key]: e.target.value })
                                    }
                                />
                            </div>
                        ))}

                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveInfo}>Save</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
