import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-hot-toast';

export default function ProductEdit() {
    const { product, categories, unit_measurements } = usePage().props;
    const [category_id, setCategoryId] = useState(product.category_id ?? '');
    const [name_description, setNameDescription] = useState(product.name_description);
    const [unit_measurement_id, setUnitMeasurementId] = useState(product.unit_measurement_id);
    const [selling_price, setSellingPrice] = useState(product.selling_price);
    const [cost_price, setCostPrice] = useState(product.cost_price);
    const [stock, setStock] = useState(product.stock);

    const handleSelectCategory = (e) => setCategoryId(e.target.value);
    const handleSelectUnit = (e) => setUnitMeasurementId(e.target.value);

    const handleProductUpdate = async (e) => {
        e.preventDefault();
        if (!category_id) return toast.error("Category is required.");
        if (!name_description.trim()) return toast.error("Product name/description is required.");
        if (!unit_measurement_id) return toast.error("Unit of measurement is required.");
        if (selling_price < 0) return toast.error("Selling price is required.");
        if (cost_price < 0) return toast.error("Cost is required.");
        if (stock < 0) return toast.error("Stock is required.");

        const { data } = await axios.patch("/api/productSave/" + product.id, {
            name_description: name_description,
            unit_measurement_id: unit_measurement_id,
            selling_price: selling_price,
            cost_price: cost_price,
            stock: stock,
            category_id: category_id,
        });
        if (data) {
            toast.success(data.message);
            router.visit("/products");
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Product</h2>}
        >
            <Head title="Edit Product" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleProductUpdate}>
                                <label className="text-sm block mb-2">
                                    Category
                                    <select
                                        value={category_id}
                                        onChange={handleSelectCategory}
                                        className="border border-black p-2 rounded w-full mt-1"
                                    >
                                        <option value="" disabled>Select a category</option>
                                        {categories?.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="text-sm block mb-2">
                                    Name/description
                                    <input
                                        type="text"
                                        placeholder="Enter product name/description"
                                        className="input border border-black w-full bg-transparent mt-1"
                                        value={name_description}
                                        onChange={(e) => setNameDescription(e.target.value)}
                                    />
                                </label>

                                <label className="text-sm block mb-2">
                                    Unit of measurement
                                    <select
                                        value={unit_measurement_id}
                                        onChange={handleSelectUnit}
                                        className="border border-black p-2 rounded w-full mt-1"
                                    >
                                        <option value="" disabled>Select unit</option>
                                        {unit_measurements.map((unit_measurement) => (
                                            <option key={unit_measurement.id} value={unit_measurement.id}>
                                                {unit_measurement.name} ({unit_measurement.abbreviation})
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="text-sm block mb-2">
                                    Selling price
                                    <input
                                        type="number"
                                        placeholder="Enter selling price"
                                        className="input border border-black w-full bg-transparent mt-1"
                                        value={selling_price}
                                        onChange={(e) => setSellingPrice(e.target.value)}
                                    />
                                </label>

                                <label className="text-sm block mb-2">
                                    Cost price
                                    <input
                                        type="number"
                                        placeholder="Enter cost price"
                                        className="input border border-black w-full bg-transparent mt-1"
                                        value={cost_price}
                                        onChange={(e) => setCostPrice(e.target.value)}
                                    />
                                </label>

                                <label className="text-sm block mb-2">
                                    Stock
                                    <input
                                        type="number"
                                        placeholder="Enter stock"
                                        className="input border border-black w-full bg-transparent mt-1"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </label>

                                <button
                                    className="btn btn-neutral btn-md w-full mt-4"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
