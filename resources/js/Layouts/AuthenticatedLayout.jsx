import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Building, Book, User, Calendar, Settings, GraduationCap, Megaphone, ClipboardMinus, Archive, Moon, Sun } from "lucide-react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Dark mode toggle
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : true;
    });

    const [form, setForm] = useState({
        schoolYear: "",
    });

    const [errors, setErrors] = useState({});

    const handleSchoolYearSubmit = (e) => {
        e.preventDefault();

        // Reset previous errors
        setErrors({});

        // Validation
        if (!form.schoolYear) {
            setErrors({ schoolYear: "Please select a school year." });
            return;
        }

        // Perform your submission logic here
        // Example: send to API or update state
        console.log("Selected School Year:", form.schoolYear);

        // Optionally reset form after submission
        // setForm({ schoolYear: "" });
    };


    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            {/* Sidebar */}
            <aside className="hidden sm:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                <div className="border-b border-gray-200 dark:border-gray-700 p-2 flex items-center justify-left">
                    <Link href="/">
                        <ApplicationLogo className="block h-8 w-auto fill-current text-gray-800 dark:text-gray-200" />
                    </Link>
                    <h1 className="font-black mx-3">INTERNSHIP MIS</h1>
                </div>
                <nav className="flex flex-col space-y-1">
                    {/* Start Admin Sidear */}
                    {user?.role_as == 1 && (
                        <NavLink href={route("admin.dashboard")} active={route().current("dashboard")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white ">
                            <Home className="mr-2 h-4 w-4" /> Dashboard
                        </NavLink>
                    )}
                    {user?.role_as == 1 && (
                        <NavLink href={route("admin.colleges")} active={route().current("admin.colleges")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <Building className="mr-2 h-4 w-4" /> Colleges
                        </NavLink>
                    )}
                    {user?.role_as == 1 && (
                        <NavLink href={route("admin.programs")} active={route().current("admin.programs")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <Book className="mr-2 h-4 w-4" /> Programs
                        </NavLink>
                    )}
                    {user?.role_as == 1 && (
                        <NavLink href={route("admin.users")} active={route().current("admin.users")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <User className="mr-2 h-4 w-4" /> Users
                        </NavLink>
                    )}
                    {user?.role == 1 && (
                        <NavLink href={route("admin.school_years")} active={route().current("admin.school_years")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <Calendar className="mr-2 h-4 w-4" /> School Years
                        </NavLink>
                    )}
                    {user?.role_as == 1 && (
                        <NavLink href={route("admin.reports")} active={route().current("admin.reports")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <Calendar className="mr-2 h-4 w-4" /> Reports
                        </NavLink>
                    )}
                    {user?.role_as == 1 && (
                        <NavLink href={route("admin.archives")} active={route().current("admin.archives")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <Calendar className="mr-2 h-4 w-4" /> Archives
                        </NavLink>
                    )}
                    {/* End Admin Sidebar */}
                    {/* Start Coordinator Sidebar */}
                    {user?.role_as == 2 && (
                        <NavLink href={route("coordinator.dashboard")} active={route().current("dashboard")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <Home className="mr-2 h-4 w-4" /> Dashboard
                        </NavLink>
                    )}
                    {user?.role_as == 2 && (
                        <NavLink href={route("coordinator.announcements")} active={route().current("coordinator.announcements")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <Megaphone className="mr-2 h-4 w-4" /> Announcements
                        </NavLink>
                    )}
                    {user?.role_as == 2 && (
                        <NavLink href={route("coordinator.documentRequirements")} active={route().current("coordinator.documentRequirements")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <Book className="mr-2 h-4 w-4" /> Document Requirements
                        </NavLink>
                    )}
                    {user?.role_as == 2 && (
                        <NavLink href={route("coordinator.listStudents")} active={route().current("coordinator.listStudents")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <GraduationCap className="mr-2 h-4 w-4" /> Students
                        </NavLink>
                    )}
                    {user?.role_as == 2 && (
                        <NavLink href={route("coordinator.hostTrainingEstablishments")} active={route().current("coordinator.hostTrainingEstablishments")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <Building className="mr-2 h-4 w-4" /> Host Training Establishments
                        </NavLink>
                    )}
                    {user?.role_as == 2 && (
                        <NavLink href={route("coordinator.evaluations")} active={route().current("coordinator.evaluations")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <Book className="mr-2 h-4 w-4" /> Evaluations
                        </NavLink>
                    )}

                    {user?.role_as == 2 && (
                        <NavLink href={route("coordinator.reports")} active={route().current("coordinator.reports")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <ClipboardMinus className="mr-2 h-4 w-4" /> Reports
                        </NavLink>
                    )}
                    {user?.role_as == 2 && (
                        <NavLink href={route("coordinator.archives")} active={route().current("coordinator.archives")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <Archive className="mr-2 h-4 w-4" /> Archives
                        </NavLink>
                    )}
                    {user?.role_as == 2 && (
                        <NavLink href={route("coordinator.schoolYears")} active={route().current("coordinator.schoolYears")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                            <Calendar className="mr-2 h-4 w-4" /> School Years
                        </NavLink>
                    )}
                    <NavLink href={route("profile.edit")} active={route().current("profile.edit")} className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700 text-sm hover:text-white">
                        <Settings className="mr-2 h-4 w-4" /> Profile
                    </NavLink>
                </nav>
            </aside>

            {/* Main content with top nav */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <nav className="border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex flex-wrap items-center justify-between h-auto px-4 sm:px-6 lg:px-8 py-2 gap-3">
                        {/* Mobile sidebar button */}
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-blue-800 dark:hover:bg-gray-700 hover:text-gray-500"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? "block" : "hidden"}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? "block" : "hidden"}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* School Year Form */}
                        <form
                            onSubmit={handleSchoolYearSubmit}
                            className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:ml-3"
                        >
                            <div className="flex flex-col gap-1 w-full sm:w-60">
                                <select
                                    id="schoolYear"
                                    value={form.schoolYear}
                                    onChange={(e) => setForm({ ...form, schoolYear: e.target.value })}
                                    className="h-[36px] w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-200"
                                >
                                    <option value="">-- Select School Year --</option>
                                    <option value="2025-2026">2nd Semester S.A 2025-2026</option>
                                    <option value="2024-2025">2nd Semester S.A 2024-2025</option>
                                    <option value="2023-2024">2nd Semester S.A 2023-2024</option>
                                </select>
                                {errors.schoolYear && (
                                    <p className="text-red-500 text-sm mt-1">{errors.schoolYear}</p>
                                )}
                            </div>
                        </form>

                        {/* Right side: Toggle + User Dropdown */}
                        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                            {/* Dark/Light mode toggle */}
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                />
                                <div className="w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 transition-colors duration-300">
                                    <div
                                        className={`absolute top-1 left-1 w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-7 bg-gray-800" : "translate-x-0 bg-yellow-300"
                                            } flex items-center justify-center text-sm`}
                                    >
                                        {darkMode ? <Moon /> : <Sun />}
                                    </div>
                                </div>
                            </label>

                            {/* User dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-100"
                                        >
                                            {user.name}
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route("logout")} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>


                    {/* Mobile Sidebar Dropdown */}
                    {showingNavigationDropdown && (
                        <div className="sm:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 space-y-2">
                            <ResponsiveNavLink href={route("dashboard")} active={route().current("dashboard")}>
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route("categories")} active={route().current("categories")}>
                                Categories
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route("profile.edit")}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route("logout")} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    )}
                </nav>


                {/* Page Header */}
                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="px-4 py-2 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">{header}</div>
                    </header>
                )}

                {/* Main Content */}
                <main className="flex-1 p-4 text-gray-900 dark:text-gray-100">{children}</main>
            </div>
        </div >
    );
}