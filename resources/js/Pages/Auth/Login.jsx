
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-white bg-blue-800 rounded-md px-4 py-2">
                    {status}
                </div>
            )}

            <form
                onSubmit={submit}
                className="w-full bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            >
                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-white" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-md border border-white/40 bg-transparent px-3 py-2 text-white placeholder-blue-100 focus:border-blue-300 focus:ring focus:ring-blue-200"
                        placeholder="Enter your email"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2 text-red-300" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-white" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={data.password}
                        className="mt-1 block w-full rounded-md border border-white/40 bg-transparent px-3 py-2 text-white placeholder-blue-100 focus:ring focus:ring-blue-200"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2 text-red-300" />
                </div>
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-blue-100 underline hover:text-white"
                        >
                            Forgot your password?
                        </Link>
                    )}
                    <PrimaryButton
                        className="w-full sm:w-auto text-blue-700 hover:bg-gray-100 font-semibold px-6 py-3 rounded-md shadow transition"
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
