import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, UserCheck, Briefcase, Download } from "lucide-react";
import {
    Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer,
    Pie, PieChart, Cell, CartesianGrid
} from "recharts";


import * as htmlToImage from 'html-to-image';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';


// Sample chart data
const data = [
    { name: "BAComm", value: 40 },
    { name: "BCAE", value: 55 },
    { name: "BECEd", value: 75 },
    { name: "BEEd", value: 10 },
    { name: "BLIS", value: 40 },
    { name: "BPEd", value: 55 },
    { name: "BSA", value: 55 },
    { name: "BSArch", value: 30 },
    { name: "BSBA-FM", value: 40 },
    { name: "BSBA-HR", value: 55 },
    { name: "BSBA-MM", value: 75 },
    { name: "BSCE", value: 80 },
    { name: "BSCpE", value: 40 },
    { name: "BSCrim", value: 55 },
    { name: "BSECE", value: 75 },
    { name: "BSEd-Fil", value: 50 },
    { name: "BSEd-Fil", value: 40 },
    { name: "BSEd-GS", value: 55 },
    { name: "BSEd-Math", value: 75 },
    { name: "BSEd", value: 10 },
];
const data_gender = [
    { name: "Male", value: 40 },
    { name: "Female", value: 55 },
];
const stacked_data = [
    { name: "BAComm", Pending: 10, ForApproval: 10, Ongoing: 10, Deployed: 10, color: "#4F46E5" },
    { name: "BCAE", Pending: 11, ForApproval: 11, Ongoing: 17, Deployed: 16, color: "#60A5FA" },
    { name: "BECEd", Pending: 15, ForApproval: 15, Ongoing: 23, Deployed: 22, color: "#34D399" },
    { name: "BEEd", Pending: 2, ForApproval: 2, Ongoing: 3, Deployed: 3, color: "#FBBF24" },
    { name: "BLIS", Pending: 8, ForApproval: 8, Ongoing: 12, Deployed: 12, color: "#4F46E5" },
    { name: "BPEd", Pending: 11, ForApproval: 11, Ongoing: 17, Deployed: 16, color: "#60A5FA" },
    { name: "BSA", Pending: 11, ForApproval: 11, Ongoing: 17, Deployed: 16, color: "#34D399" },
    { name: "BSArch", Pending: 6, ForApproval: 6, Ongoing: 9, Deployed: 9, color: "#FBBF24" },
    { name: "BSBA-FM", Pending: 8, ForApproval: 8, Ongoing: 12, Deployed: 12, color: "#4F46E5" },
    { name: "BSBA-HR", Pending: 11, ForApproval: 11, Ongoing: 17, Deployed: 16, color: "#60A5FA" },
    { name: "BSBA-MM", Pending: 15, ForApproval: 15, Ongoing: 23, Deployed: 22, color: "#34D399" },
    { name: "BSCE", Pending: 16, ForApproval: 16, Ongoing: 24, Deployed: 24, color: "#FBBF24" },
    { name: "BSCpE", Pending: 8, ForApproval: 8, Ongoing: 12, Deployed: 12, color: "#4F46E5" },
    { name: "BSCrim", Pending: 11, ForApproval: 11, Ongoing: 17, Deployed: 16, color: "#60A5FA" },
    { name: "BSECE", Pending: 15, ForApproval: 15, Ongoing: 23, Deployed: 22, color: "#34D399" },
    { name: "BSEd-Fil", Pending: 10, ForApproval: 10, Ongoing: 15, Deployed: 15, color: "#FBBF24" },
    { name: "BSEd-GS", Pending: 11, ForApproval: 11, Ongoing: 17, Deployed: 16, color: "#4F46E5" },
    { name: "BSEd-Math", Pending: 15, ForApproval: 15, Ongoing: 23, Deployed: 22, color: "#60A5FA" },
    { name: "BSEd", Pending: 2, ForApproval: 2, Ongoing: 3, Deployed: 3, color: "#34D399" },
    { name: "CITE", Pending: 2, ForApproval: 3, Ongoing: 0, Deployed: 10, color: "#FBBF24" }
];



// Export Functions
const exportAsImage = async (ref, filename) => {
    if (ref.current) {
        const dataUrl = await htmlToImage.toPng(ref.current);
        const link = document.createElement('a');
        link.download = filename + '.png';
        link.href = dataUrl;
        link.click();
    }
};

const exportAsExcel = (dataset, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(dataset);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, filename + ".xlsx");
};

const exportAsPDF = async (ref, filename) => {
    if (ref.current) {
        const dataUrl = await htmlToImage.toPng(ref.current);
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename + ".pdf");
    }
};


export default function Analytic() {
    const statusChartRef = useRef(null); // ✅ moved inside component
    const internshipStatusChartRef = useRef(null);
    const genderChartRef = useRef(null);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200 
        text-base sm:text-lg md:text-xl lg:text-2xl">
                    Analytics
                </h2>
            }
        >

            <Head title="Analytics" />
            {/* Modern Horizontal Bar Chart */}
            <div
                className="mt-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg sm:p-6"
                ref={statusChartRef}
            >
                {/* Header with Export Buttons */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Status of Interns
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => exportAsImage(statusChartRef, "OJT_Enrollment")}
                            className="p-2 rounded bg-blue-600 text-white text-xs flex items-center gap-1 hover:bg-blue-700 transition"
                        >
                            <Download className="h-4 w-4" /> PNG
                        </button>
                        <button
                            onClick={() => exportAsExcel(data, "OJT_Enrollment")}
                            className="p-2 rounded bg-emerald-600 text-white text-xs flex items-center gap-1 hover:bg-emerald-700 transition"
                        >
                            <Download className="h-4 w-4" /> Excel
                        </button>
                        <button
                            onClick={() => exportAsPDF(statusChartRef, "OJT_Enrollment")}
                            className="p-2 rounded bg-rose-600 text-white text-xs flex items-center gap-1 hover:bg-rose-700 transition"
                        >
                            <Download className="h-4 w-4" /> PDF
                        </button>
                    </div>
                </div>

                {/* Chart */}
                <div style={{ width: "100%", height: 600 }}>
                    <ResponsiveContainer width="100%" height={600}>
                        <BarChart
                            data={stacked_data}
                            layout="vertical"
                            margin={{ top: 20, right: 40, left: 0, bottom: 60 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

                            <XAxis
                                type="number"
                                stroke="#888"
                                tick={{ fontSize: 12 }}
                                label={{
                                    value: "Total Number of Students",
                                    position: "insideBottom",
                                    offset: -10,
                                    fill: "#888",
                                    style: { fontWeight: "bold", fontSize: 14 },
                                }}
                            />

                            <YAxis
                                dataKey="name"
                                type="category"
                                stroke="#888"
                                tick={{ fontSize: 12 }}
                                width={140}
                                label={{
                                    value: "Programs",
                                    angle: -90,
                                    position: "insideLeft",
                                    offset: 10,
                                    fill: "#888",
                                    style: { fontWeight: "bold", fontSize: 14 },
                                }}
                            />

                            <Tooltip
                                cursor={{ fill: "rgba(0,0,0,0.1)" }}
                                contentStyle={{
                                    backgroundColor: "#1f2937",
                                    borderRadius: "8px",
                                    border: "none",
                                    color: "#fff",
                                    padding: "8px 12px",
                                }}
                            />

                            {/* Stacked bars */}
                            <Bar dataKey="Pending" stackId="a" fill="#FDE23B" />
                            <Bar dataKey="ForApproval" stackId="a" fill="#A2D844" />
                            <Bar dataKey="Ongoing" stackId="a" fill="#3D6091" />
                            <Bar dataKey="Deployed" stackId="a" fill="#507be0ff" />

                        </BarChart>
                    </ResponsiveContainer>

                </div>
                {/* Modern Legend */}
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {stacked_data.map((item, index) => {
                        const totalValue = item.Pending + item.ForApproval + item.Ongoing + item.Deployed;
                        const totalAll = stacked_data.reduce(
                            (acc, curr) => acc + curr.Pending + curr.ForApproval + curr.Ongoing + curr.Deployed,
                            0
                        );
                        const percentage = ((totalValue / totalAll) * 100).toFixed(1);
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm"
                            >
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color || "#4F46E5" }}
                                ></span>
                                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                                    {item.name}: {totalValue} ({percentage}%)
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* Charts Section */}
            <div className="mt-6 flex flex-col lg:flex-row gap-6">
                {/* Gender Section */}
                <div
                    className="bg-white dark:bg-gray-900 rounded-sm shadow-md p-4 flex-1 transition-all duration-300 hover:shadow-lg"
                    ref={genderChartRef}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Gender Distribution
                        </h3>

                        {/* Export Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => exportAsImage(genderChartRef, "Gender")}
                                className="p-1.5 rounded bg-blue-600 text-white text-xs flex items-center hover:bg-blue-700 transition"
                            >
                                <Download className="h-4 w-4 mr-1" /> PNG
                            </button>
                            <button
                                onClick={() => exportAsExcel(data_gender, "Gender")}
                                className="p-1.5 rounded bg-emerald-600 text-white text-xs flex items-center hover:bg-emerald-700 transition"
                            >
                                <Download className="h-4 w-4 mr-1" /> Excel
                            </button>
                            <button
                                onClick={() => exportAsPDF(genderChartRef, "Gender")}
                                className="p-1.5 rounded bg-rose-600 text-white text-xs flex items-center hover:bg-rose-700 transition"
                            >
                                <Download className="h-4 w-4 mr-1" /> PDF
                            </button>
                        </div>
                    </div>

                    {/* Donut Chart */}
                    <div className="w-full h-60 mb-4">
                        <ResponsiveContainer>
                            <PieChart>
                                <Tooltip
                                    cursor={false}
                                    contentStyle={{
                                        backgroundColor: "#1f2937",
                                        borderRadius: "8px",
                                        border: "none",
                                        color: "#fff",
                                    }}
                                />
                                <Pie
                                    data={data_gender}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius="60%"
                                    outerRadius="80%"
                                    isAnimationActive
                                    animationDuration={800}
                                    animationEasing="ease-out"
                                    labelLine={false}
                                    label={false}
                                >
                                    {data_gender.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index % 2 === 0 ? "#FDE23B" : "#2563eb"}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Labels */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {data_gender.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
                            >
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: index % 2 === 0 ? "#FDE23B" : "#2563eb",
                                    }}
                                ></span>
                                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                    {item.name}: {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
