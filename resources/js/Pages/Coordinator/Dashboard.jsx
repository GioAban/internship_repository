import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

import { Users, Building2, UserCheck, Download } from "lucide-react";
import * as htmlToImage from 'html-to-image';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';


export default function Dashboard() {
    const [data] = useState([
        { name: "For Approval", value: 40 },
        { name: "On Going", value: 10 },
        { name: "Completed", value: 34 },
    ]);

    const [gender_data] = useState([
        { name: "Male", value: 40 },
        { name: "Female", value: 25 },
    ]);

    const COLORS = ["#2045A2", "#e8eb68ff"];

    // refs for charts
    const statusChartRef = useRef(null);
    const genderChartRef = useRef(null);

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

    return (
        <AuthenticatedLayout
            header={
                <h2
                    className="font-semibold leading-tight text-gray-800 dark:text-gray-200 text-base sm:text-sm md:text-sm break-words text-center sm:text-left"
                >
                    Dashboard
                </h2>

            }
        >

            <Head title="Dashboard" />

            {/* Stats Cards */}
            <div className="mx-auto w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-2 sm:p-4">
                    {/* Enrolled Interns */}
                    <Card className="bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs sm:text-sm font-semibold">Enrolled Interns</CardTitle>
                            <div className="p-2 bg-white/20 rounded-full">
                                <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl sm:text-2xl font-bold">12</div>
                            <p className="text-xs opacity-80">View details</p>
                        </CardContent>
                    </Card>

                    {/* Total HTE */}
                    <Card className="bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs sm:text-sm font-semibold">Total HTE</CardTitle>
                            <div className="p-2 bg-white/20 rounded-full">
                                <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl sm:text-2xl font-bold">8</div>
                            <p className="text-xs opacity-80">View details</p>
                        </CardContent>
                    </Card>

                    {/* Midterm Evaluated */}
                    <Card className="bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs sm:text-sm font-semibold">Midterm Evaluated</CardTitle>
                            <div className="p-2 bg-white/20 rounded-full">
                                <UserCheck className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl sm:text-2xl font-bold">245</div>
                            <p className="text-xs opacity-80">View details</p>
                        </CardContent>
                    </Card>

                    {/* Final Evaluated */}
                    <Card className="bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs sm:text-sm font-semibold">Final Evaluated</CardTitle>
                            <div className="p-2 bg-white/20 rounded-full">
                                <UserCheck className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl sm:text-2xl font-bold">180</div>
                            <p className="text-xs opacity-80">View details</p>
                        </CardContent>
                    </Card>
                </div>
            </div>



            <div className="mt-6 bg-white dark:bg-gray-900 rounded-md shadow-md p-2 sm:p-4" ref={statusChartRef}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        OJT Status
                    </h3>
                    <div className="flex flex-wrap gap-2">
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
                <div className="w-full h-[250px] sm:h-[300px]">
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
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                {item.name}: {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>


            {/* Pie Chart - OJT Genders */}
            <div className="mt-6 bg-white dark:bg-gray-900 rounded-md shadow-md p-2 sm:p-3" ref={genderChartRef}>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                        OJT Genders
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => exportAsImage(genderChartRef, "OJT_Genders")}
                            className="p-1 rounded bg-blue-600 text-white text-xs flex items-center"
                        >
                            <Download className="h-4 w-4 mr-1" /> PNG
                        </button>
                        <button
                            onClick={() => exportAsExcel(gender_data, "OJT_Genders")}
                            className="p-1 rounded bg-emerald-600 text-white text-xs flex items-center"
                        >
                            <Download className="h-4 w-4 mr-1" /> Excel
                        </button>
                        <button
                            onClick={() => exportAsPDF(genderChartRef, "OJT_Genders")}
                            className="p-1 rounded bg-rose-600 text-white text-xs flex items-center"
                        >
                            <Download className="h-4 w-4 mr-1" /> PDF
                        </button>
                    </div>
                </div>
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={gender_data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                innerRadius={60}
                                label
                            >
                                {gender_data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#2045A2",
                                    borderRadius: "8px",
                                    border: "none",
                                    color: "#fff", // text color ng wrapper
                                }}
                                labelStyle={{ color: "#fff" }}
                                itemStyle={{ color: "#fff" }}
                            />

                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* ✅ Custom Legend */}
                <div className="flex justify-center gap-6 mb-6">
                    {gender_data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></span>
                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                {item.name}: {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
