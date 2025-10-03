import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useRef } from 'react';
import jsPDF from "jspdf";
import { Printer, FileText } from "lucide-react"; // icons
import { Button } from "@/components/ui/button";
export default function Report() {
    const [activeTab, setActiveTab] = useState("annexC");
    const printRef = useRef(null);

    const handlePrint = () => {
        if (printRef.current) {
            const printContents = printRef.current.innerHTML;
            const originalContents = document.body.innerHTML;

            document.body.innerHTML = `
                <div style="text-align:center; margin-bottom:20px;">
                    <h2>Urdaneta City University</h2>
                    <h3>${activeTab.toUpperCase()} Report</h3>
                    <hr style="margin: 10px 0;" />
                </div>
                ${printContents}
            `;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload();
        }
    };

    const handleExportPDF = () => {
        if (printRef.current) {
            const doc = new jsPDF("p", "pt", [612, 936]);
            const wrapper = document.createElement("div");
            wrapper.innerHTML = `
                <div style="text-align:center; margin-bottom:20px;">
                    <h2>Urdaneta City University</h2>
                    <h3>${activeTab.toUpperCase()} Report</h3>
                    <hr style="margin: 10px 0;" />
                </div>
            `;
            wrapper.appendChild(printRef.current.cloneNode(true));

            doc.html(wrapper, {
                callback: (doc) => {
                    doc.save(`${activeTab}-report.pdf`);
                },
                margin: [40, 40, 40, 40],
                autoPaging: "text",
                x: 20,
                y: 20,
                width: 550,
                windowWidth: 900,
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Reports
                </h2>
            }
        >
            <Head title="Report" />

            <div className="p-6">
                <Tabs
                    defaultValue="annexC"
                    className="w-full"
                    onValueChange={setActiveTab}
                >
                    {/* Tabs + Buttons in one row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <TabsList className="flex flex-wrap gap-2">
                            <TabsTrigger value="annexC">Annex C</TabsTrigger>
                            <TabsTrigger value="annexD">Annex D</TabsTrigger>
                            <TabsTrigger value="deployed">Deployed Interns</TabsTrigger>
                            <TabsTrigger value="completed">Completed Interns</TabsTrigger>
                            <TabsTrigger value="allInterns">List of All Interns</TabsTrigger>
                            <TabsTrigger value="companies">List of All Companies</TabsTrigger>
                        </TabsList>
                        <div className="flex gap-2">
                            <Button
                                onClick={handlePrint}
                                className="bg-blue-900 hover:bg-blue-700 text-white flex items-center justify-center w-full sm:w-auto"
                            >
                                <Printer className="w-4 h-4 mr-2" />
                                Print
                            </Button>
                            <Button
                                onClick={handleExportPDF}
                                className="bg-blue-900 hover:bg-blue-700 text-white flex items-center justify-center w-full sm:w-auto"
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                Export PDF
                            </Button>
                        </div>
                    </div>

                    {/* Tabs Content */}
                    <div ref={printRef}>
                        <TabsContent value="annexC">
                            <div className="mt-4 p-4 border rounded-lg dark:border-gray-700">
                                <h3 className="text-lg font-semibold mb-2">Annex C</h3>
                                <p>Content for Annex C reports will go here...</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="annexD">
                            <div className="mt-4 p-4 border rounded-lg dark:border-gray-700">
                                <h3 className="text-lg font-semibold mb-2">Annex D</h3>
                                <p>Content for Annex D reports will go here...</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="deployed">
                            <div className="mt-4 p-4 border rounded-lg dark:border-gray-700">
                                <h3 className="text-lg font-semibold mb-2">Deployed Interns</h3>
                                <p>Content for deployed interns will go here...</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="completed">
                            <div className="mt-4 p-4 border rounded-lg dark:border-gray-700">
                                <h3 className="text-lg font-semibold mb-2">Completed Interns</h3>
                                <p>Content for completed interns will go here...</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="allInterns">
                            <div className="mt-4 p-4 border rounded-lg dark:border-gray-700">
                                <h3 className="text-lg font-semibold mb-2">List of All Interns</h3>
                                <p>Content for all interns will go here...</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="companies">
                            <div className="mt-4 p-4 border rounded-lg dark:border-gray-700">
                                <h3 className="text-lg font-semibold mb-2">List of All Companies</h3>
                                <p>Content for all companies will go here...</p>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </AuthenticatedLayout>
    );
}
