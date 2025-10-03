import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, UserCheck, Briefcase, Download } from "lucide-react";
import {
    Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer,
    AreaChart, Area
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
const data_status = [
    { name: "For Approval", value: 40 },
    { name: "Deployed", value: 55 },
    { name: "Completed", value: 75 },
];
const data_gender = [
    { name: "Male", value: 40 },
    { name: "Female", value: 55 },
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


export default function Dashboard() {
    const statusChartRef = useRef(null); // ✅ moved inside component
    const internshipStatusChartRef = useRef(null);
    const genderChartRef = useRef(null);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200 
        text-base sm:text-lg md:text-xl lg:text-2xl">
                    Dashboard
                </h2>
            }
        >

            <Head title="Dashboard" />

            {/* Stats Cards */}
            <div className="mx-auto px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Coordinators */}
                    <Card className="bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-semibold">COORDINATORS</CardTitle>
                            <div className="p-2 bg-white/20 rounded-full">
                                <Users className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">12</div>
                            <p className="text-xs opacity-80">View details</p>
                        </CardContent>
                    </Card>

                    {/* HTE */}
                    <Card className="bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-semibold">HTE</CardTitle>
                            <div className="p-2 bg-white/20 rounded-full">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">8</div>
                            <p className="text-xs opacity-80">View details</p>
                        </CardContent>
                    </Card>

                    {/* Interns */}
                    <Card className="bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-semibold">INTERNS</CardTitle>
                            <div className="p-2 bg-white/20 rounded-full">
                                <UserCheck className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">245</div>
                            <p className="text-xs opacity-80">View details</p>
                        </CardContent>
                    </Card>

                    {/* For Approval */}
                    <Card className="bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-semibold">FOR APPROVAL</CardTitle>
                            <div className="p-2 bg-white/20 rounded-full">
                                <Briefcase className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">180</div>
                            <p className="text-xs opacity-80">View details</p>
                        </CardContent>
                    </Card>

                    {/* Deployed */}
                    <Card className="bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-semibold">DEPLOYED</CardTitle>
                            <div className="p-2 bg-white/20 rounded-full">
                                <Briefcase className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">80</div>
                            <p className="text-xs opacity-80">View details</p>
                        </CardContent>
                    </Card>
                </div>
            </div>


            {/* Wave Area Chart - Enrolled Students */}
            <div
                className="mt-6 bg-white dark:bg-gray-900 rounded-md shadow-md p-2 sm:p-3"
                ref={statusChartRef}
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Students
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => exportAsImage(statusChartRef, "OJT_Status")}
                            className="p-1 rounded bg-blue-600 text-white text-xs flex items-center"
                        >
                            <Download className="h-4 w-4 mr-1" /> PNG
                        </button>
                        <button
                            onClick={() => exportAsExcel(data, "OJT_Status")}
                            className="p-1 rounded bg-emerald-600 text-white text-xs flex items-center"
                        >
                            <Download className="h-4 w-4 mr-1" /> Excel
                        </button>
                        <button
                            onClick={() => exportAsPDF(statusChartRef, "OJT_Status")}
                            className="p-1 rounded bg-rose-600 text-white text-xs flex items-center"
                        >
                            <Download className="h-4 w-4 mr-1" /> PDF
                        </button>
                    </div>
                </div>

                <div style={{ width: "100%", height: 800 }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={data}
                            layout="vertical" // ✅ makes it horizontal
                            margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                        >
                            {/* X-axis is numeric */}
                            <XAxis type="number" stroke="#888" tick={{ fontSize: 12 }} />
                            {/* Y-axis is categories */}
                            <YAxis
                                dataKey="name"
                                type="category"
                                stroke="#888"
                                tick={{ fontSize: 12 }}
                                width={80}
                            />
                            <Tooltip
                                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                                contentStyle={{
                                    backgroundColor: "#1f2937",
                                    borderRadius: "8px",
                                    border: "none",
                                    color: "#fff",
                                }}
                            />
                            <Bar
                                dataKey="value"
                                fill="#2045A2"
                                radius={[0, 6, 6, 0]} // rounded right corners
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* ✅ Custom Legend with Labels + Values */}
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                                {item.name}: {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Wave Area Chart - Deployed Students */}
            <div className="mt-6 bg-white dark:bg-gray-900 rounded-md shadow-md p-2 sm:p-3" ref={statusChartRef}>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Deployed Students
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => exportAsImage(statusChartRef, "OJT_Status")}
                            className="p-1 rounded bg-blue-600 text-white text-xs flex items-center"
                        >
                            <Download className="h-4 w-4 mr-1" /> PNG
                        </button>
                        <button
                            onClick={() => exportAsExcel(data, "OJT_Status")}
                            className="p-1 rounded bg-emerald-600 text-white text-xs flex items-center"
                        >
                            <Download className="h-4 w-4 mr-1" /> Excel
                        </button>
                        <button
                            onClick={() => exportAsPDF(statusChartRef, "OJT_Status")}
                            className="p-1 rounded bg-rose-600 text-white text-xs flex items-center"
                        >
                            <Download className="h-4 w-4 mr-1" /> PDF
                        </button>
                    </div>
                </div>
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="waveColor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2045A2" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#2045A2" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#888" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                                contentStyle={{
                                    backgroundColor: "#1f2937",
                                    borderRadius: "8px",
                                    border: "none",
                                    color: "#fff",
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#2045A2"
                                strokeWidth={2}
                                fill="url(#waveColor)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* ✅ Custom Legend with Labels + Values */}
                <div className="flex flex-wrap justify-center gap-3">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2"
                        >
                            <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                                {item.name}: {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>



            <div className="mt-6 flex flex-col lg:flex-row gap-6">



                {/* Gender */}
                <div className="bg-white dark:bg-gray-900 rounded-md shadow-md p-3 flex-1" ref={genderChartRef}>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Gender
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => exportAsImage(genderChartRef, "Gender")}
                                className="p-1 rounded bg-blue-600 text-white text-xs flex items-center"
                            >
                                <Download className="h-4 w-4 mr-1" /> PNG
                            </button>
                            <button
                                onClick={() => exportAsExcel(data_gender, "Gender")}
                                className="p-1 rounded bg-emerald-600 text-white text-xs flex items-center"
                            >
                                <Download className="h-4 w-4 mr-1" /> Excel
                            </button>
                            <button
                                onClick={() => exportAsPDF(genderChartRef, "Gender")}
                                className="p-1 rounded bg-rose-600 text-white text-xs flex items-center"
                            >
                                <Download className="h-4 w-4 mr-1" /> PDF
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-60">
                        <ResponsiveContainer>
                            <BarChart data={data_gender}>
                                <XAxis dataKey="name" stroke="#888" />
                                <YAxis />
                                <Tooltip
                                    cursor={false}
                                    contentStyle={{
                                        backgroundColor: "#1f2937",
                                        borderRadius: "8px",
                                        border: "none",
                                        color: "#fff"
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="#2045A2"
                                    fillOpacity={0.9}   // 0 = transparent, 1 = solid
                                    radius={[4, 4, 0, 0]}
                                    isAnimationActive={true}
                                    animationDuration={1000}
                                    animationBegin={0}
                                    animationEasing="ease"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {/* ✅ Labels */}
                    <div className="flex justify-center gap-6">
                        {data_gender.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                    {item.name}: {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Internship Status */}
                <div className="bg-white dark:bg-gray-900 rounded-md shadow-md p-3 flex-1" ref={internshipStatusChartRef}>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Internship Status
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => exportAsImage(internshipStatusChartRef, "Internship_Status")}
                                className="p-1 rounded bg-blue-600 text-white text-xs flex items-center"
                            >
                                <Download className="h-4 w-4 mr-1" /> PNG
                            </button>
                            <button
                                onClick={() => exportAsExcel(data_status, "Internship_Status")}
                                className="p-1 rounded bg-emerald-600 text-white text-xs flex items-center"
                            >
                                <Download className="h-4 w-4 mr-1" /> Excel
                            </button>
                            <button
                                onClick={() => exportAsPDF(internshipStatusChartRef, "Internship_Status")}
                                className="p-1 rounded bg-rose-600 text-white text-xs flex items-center"
                            >
                                <Download className="h-4 w-4 mr-1" /> PDF
                            </button>
                        </div>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <div style={{ minWidth: `${data_status.length * 40}px`, height: 340 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data_status}>
                                    <XAxis dataKey="name" stroke="#888" interval={0} angle={-30} textAnchor="end" height={80} />
                                    <YAxis />
                                    <Tooltip
                                        cursor={false}
                                        contentStyle={{
                                            backgroundColor: "#1f2937",
                                            borderRadius: "8px",
                                            border: "none",
                                            color: "#fff",
                                        }}
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill="#2045A2"
                                        fillOpacity={0.9}   // 0 = transparent, 1 = solid
                                        radius={[4, 4, 0, 0]}
                                        isAnimationActive={true}
                                        animationDuration={1000}
                                        animationBegin={0}
                                        animationEasing="ease"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* ✅ Labels */}
                    <div className="flex justify-center gap-6 mt-3">
                        {data_status.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
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
