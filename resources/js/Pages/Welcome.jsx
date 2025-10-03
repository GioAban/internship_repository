import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, Instagram, Facebook, Linkedin, Phone, Mail, MapPin, Menu } from "lucide-react";
import axios from 'axios';
import { Button } from "@/components/ui/button";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        industry: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., send data to the backend)
        console.log(formData);
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');





    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-gray-800 dark:bg-black dark:text-white scroll-smooth">
                {/* ✅ Top Nav */}
                <nav className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow z-50">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="font-bold text-lg">UCU Internship</div>

                        {/* Desktop Menu */}
                        <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
                            <li>
                                <a href="#home" className="hover:text-blue-700 transition-colors">Home</a>
                            </li>
                            <li>
                                <a href="#stats" className="hover:text-blue-700 transition-colors">Stats</a>
                            </li>
                            <li>
                                <a href="#colleges" className="hover:text-blue-700 transition-colors">Colleges</a>
                            </li>
                            <li>
                                <a href="#coordinators" className="hover:text-blue-700 transition-colors">Coordinators</a>
                            </li>
                            <li>
                                <a href="#partners" className="hover:text-blue-700 transition-colors">Partners</a>
                            </li>
                            <li>
                                <a href="/become-a-partner" className="hover:text-blue-700 transition-colors">Become a partner</a>
                            </li>
                            <li>
                                <Link href="/login">
                                    <Button className="bg-white text-blue-900 border border-blue-900 hover:bg-blue-700 hover:text-white px-4 py-2 rounded-md transition-colors">
                                        LOG IN
                                    </Button>
                                </Link>
                            </li>
                        </ul>


                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden text-white"
                            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                        >
                            <Menu />
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileNavOpen && (
                        <ul className="lg:hidden bg-blue-900 text-white text-sm font-medium p-4 space-y-4">
                            <li>
                                <a href="#home" className="block hover:text-blue-300 transition-colors">Home</a>
                            </li>
                            <li>
                                <a href="#stats" className="block hover:text-blue-300 transition-colors">Stats</a>
                            </li>
                            <li>
                                <a href="#colleges" className="block hover:text-blue-300 transition-colors">Colleges</a>
                            </li>
                            <li>
                                <a href="#coordinators" className="block hover:text-blue-300 transition-colors">Coordinators</a>
                            </li>
                            <li>
                                <a href="#partners" className="block hover:text-blue-300 transition-colors">Partners</a>
                            </li>
                            <li>
                                <a href="/become-a-partner" className="hover:text-blue-700 transition-colors">Become a partner</a>
                            </li>
                            <li>
                                <Link href="/login">
                                    <Button className="w-full bg-white text-blue-900 font-semibold hover:bg-blue-700 hover:text-white rounded-md transition-colors">
                                        LOG IN
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    )}

                </nav>

                {/* Hero Section */}
                <section id="home" className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-blue-900 text-white pb-10">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl text-center">

                        {/* Wrapper for two logos */}
                        <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-2">
                            <motion.img
                                src="/images/ucu_logo.png"
                                alt="University Logo"
                                className="hidden sm:block h-[220px] w-[160px] object-contain"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            />

                            <motion.img
                                src="/images/internship_logo.png"
                                alt="Internship Logo"
                                className="h-[220px] sm:h-[130px] w-auto object-contain"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            />
                        </div>

                        <motion.h1
                            className="text-2xl font-bold sm:text-4xl lg:text-6xl"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: false, amount: 0.2 }}
                        >
                            Welcome to University City University Student Internship Programs
                        </motion.h1>

                        <motion.p
                            className="mt-4 text-lg max-w-2xl mx-auto text-gray-200"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: false, amount: 0.2 }}
                        >
                            Connecting Students, Coordinators, and Partner Companies
                        </motion.p>

                        <div className="mt-8 mb-2 flex flex-wrap justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 shadow hover:bg-gray-200"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="login-container flex flex-col sm:flex-row gap-4">

                                </div>
                            )}
                        </div>
                        {error && <div className="error text-red-700">{error}</div>}
                    </div>
                </section>
                {/* Scroll Down Indicator */}
                <motion.div
                    id="stats"
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer"
                    initial={{ y: 0 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.div>

                {/* Stats Section */}
                <motion.section
                    className="py-20 bg-gray-100 dark:bg-gray-900"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[{ number: "12", label: "Colleges" }, { number: "4,500+", label: "Students Successful in OJT" }, { number: "35+", label: "Coordinators" }, { number: "80+", label: "Partner Companies" }].map((item, idx) => (
                            <motion.div
                                key={idx}
                                className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
                                whileHover={{ scale: 1.05 }}
                            >
                                <h2 className="text-3xl font-bold text-blue-600">{item.number}</h2>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">{item.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Colleges Section */}
                <motion.section
                    id="colleges"
                    className="py-20 max-w-6xl mx-auto px-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <h2 className="text-3xl font-bold text-center mb-12">Our Colleges</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            "College of IT",
                            "College of Business",
                            "College of Engineering",
                            "College of Education",
                            "College of Nursing",
                            "College of Arts",
                        ].map((college, idx) => (
                            <motion.div
                                key={idx}
                                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                                whileHover={{ y: -10 }}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                                viewport={{ once: false }}
                            >
                                <h3 className="text-xl font-semibold text-blue-700">{college}</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Learn more about {college} programs and coordinators.
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Coordinators Section */}
                <motion.section
                    id="coordinators"
                    className="py-20 bg-gray-50 dark:bg-gray-900"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-12">Coordinators</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: "Prof. Juan Dela Cruz", college: "College of IT" },
                                { name: "Prof. Maria Santos", college: "College of Business" },
                                { name: "Prof. Jose Rizal", college: "College of Engineering" },

                            ].map((coord, idx) => (
                                <motion.div
                                    key={idx}
                                    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                                    viewport={{ once: false }}
                                >
                                    <h3 className="text-xl font-semibold text-blue-700">{coord.name}</h3>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">{coord.college}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Partner Companies Section */}
                <motion.section
                    id="partners"
                    className="py-20 max-w-6xl mx-auto px-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <h2 className="text-3xl font-bold text-center mb-12">Our Partner Companies</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center">
                        {[
                            "/images/company1.png",
                            "/images/company2.png",
                            "/images/company3.png",
                            "/images/company4.png",
                        ].map((logo, idx) => (
                            <motion.img
                                key={idx}
                                src={logo}
                                alt="Company Logo"
                                className="h-16 mx-auto grayscale hover:grayscale-0 transition"
                                whileHover={{ scale: 1.1 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                                viewport={{ once: false }}
                            />
                        ))}
                    </div>
                </motion.section>
                <motion.footer
                    className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false }}
                >
                    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">

                        {/* Logo and tagline */}
                        <div>
                            <img
                                src="/images/ucu_logo.png"
                                alt="University Logo"
                                className="h-16 w-auto mx-auto md:mx-0 mb-4"
                            />
                            <p className="text-sm">Bright future starts here.</p>
                            <div className="flex justify-center md:justify-start gap-4 mt-4 text-gray-600 dark:text-gray-400">
                                <a href="#" aria-label="Website" className="hover:text-blue-600">
                                    <Globe size={20} />
                                </a>
                                <a href="#" aria-label="Instagram" className="hover:text-pink-500">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" aria-label="Facebook" className="hover:text-blue-700">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" aria-label="LinkedIn" className="hover:text-blue-500">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Website */}
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Website</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-blue-600">About</a></li>
                                <li><a href="#" className="hover:text-blue-600">Admissions</a></li>
                                <li><a href="#" className="hover:text-blue-600">Academics</a></li>
                            </ul>
                        </div>

                        {/* Careers */}
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Careers</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-blue-600">Apply</a></li>
                                <li><a href="#" className="hover:text-blue-600">Job Openings</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Contact Us</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2 justify-center md:justify-start">
                                    <MapPin size={18} />
                                    1 San Vicente West, Urdaneta City, Pangasinan 2428
                                </li>
                                <li className="flex items-center gap-2 justify-center md:justify-start">
                                    <Phone size={18} /> (075) 529-5223
                                </li>
                                <li className="flex items-center gap-2 justify-center md:justify-start">
                                    <Mail size={18} /> officeofthepresident@ucu.edu.ph
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Banda-like bottom strip */}
                    <div className="bg-blue-900 text-gray-200 text-center py-3 text-sm">
                        © {new Date().getFullYear()} University OJT Portal. All rights reserved.
                    </div>
                </motion.footer>

            </div>
        </>
    );
}
