import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
export default function IssuesConcern() {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Issues Concern
                </h2>
            }
        >
            <Head title="Issues Concern" />



        </AuthenticatedLayout>
    );
}
