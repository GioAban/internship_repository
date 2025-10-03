import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Card } from "@/components/ui/card"; // ✅ use Card

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="mx-auto space-y-4">
                <Card className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-950 p-4 shadow sm:rounded-lg sm:p-4 border-0">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl space-y-4 [&_input]:bg-white [&_input]:dark:bg-gray-800 [&_input]:text-gray-900 [&_input]:dark:text-gray-200 [&_input]:border [&_input]:border-gray-300 [&_input]:dark:border-gray-600"
                    />
                </Card>

                <Card className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-4 shadow sm:rounded-lg sm:p-4 border-0">
                    <UpdatePasswordForm
                        className="max-w-xl space-y-4 [&_input]:bg-white [&_input]:dark:bg-gray-800 [&_input]:text-gray-900 [&_input]:dark:text-gray-200 [&_input]:border [&_input]:border-gray-300 [&_input]:dark:border-gray-600"
                    />
                </Card>

                {/* <Card className="bg-neutral dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-4 shadow sm:rounded-lg sm:p-4 border-0">
                    <DeleteUserForm
                        className="max-w-xl space-y-4 [&_input]:bg-white [&_input]:dark:bg-gray-800 [&_input]:text-gray-900 [&_input]:dark:text-gray-200 [&_input]:border [&_input]:border-gray-300 [&_input]:dark:border-gray-600"
                    />
                </Card> */}
            </div>
        </AuthenticatedLayout>
    );
}
