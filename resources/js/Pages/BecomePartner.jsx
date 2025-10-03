import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function BePartner() {
    const [formData, setFormData] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        industry: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <>
            <Head title="Become a partner" />
            <div className="min-h-screen flex flex-col lg:flex-row">
                <main className="flex-1 flex items-center justify-center bg-neutral-90">
                    {/* Become a Partner Section */}
                    <motion.section
                        id="become-partner"
                        className="py-20 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md w-full"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <div className="max-w-6xl mx-auto px-6">
                            {/* Return Icon */}
                            <div className="mb-2">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    <span>Back</span>
                                </Link>
                            </div>

                            <h2 className="text-3xl font-bold text-center mb-12">Become a Partner</h2>
                            <p className="text-lg text-center mb-8 text-gray-600 dark:text-gray-300">
                                We are always looking for new partner companies to offer valuable On-the-Job Training (OJT)
                                opportunities for our students. If you're interested in becoming a partner, please fill out the form below:
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="companyName" className="block text-sm font-semibold text-gray-800 dark:text-gray-300">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-800 dark:text-gray-300">
                                            Contact Person
                                        </label>
                                        <input
                                            type="text"
                                            id="contactPerson"
                                            name="contactPerson"
                                            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                                            value={formData.contactPerson}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-800 dark:text-gray-300">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 dark:text-gray-300">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="industry" className="block text-sm font-semibold text-gray-800 dark:text-gray-300">
                                        Industry Type
                                    </label>
                                    <input
                                        type="text"
                                        id="industry"
                                        name="industry"
                                        className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.section>
                </main>
            </div>
        </>
    );
}
