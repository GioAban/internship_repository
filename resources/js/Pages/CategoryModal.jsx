import { useDataStore } from '@/Context/DataStoreContext'
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { router } from "@inertiajs/react";

const CategoryModal = ({ id }) => {
	const { categoryModalIsOpen, setCategoryModalIsOpen } = useDataStore();
	const deleteCategory = async () => {
		try {
			const { data } = await axios.delete("/api/categoryDelete/" + id);
			if (data) {
				toast.success(data.message);
				router.visit("/categories");
				setCategoryModalIsOpen(false);
			}
		} catch (error) {
			console.error(error);
		}
	}
	return (
		< dialog id="my_modal_1" className={`modal ${categoryModalIsOpen ? "modal-open" : ""}`} >
			<div className="modal-box bg-slate-200 text-black">
				<h3 className="font-bold text-lg">Delete Confirmation.</h3>
				<div className="divider"></div>
				<div className="flex justify-center gap-2">
					<button className="btn btn-error btn-sm w-1/2" onClick={deleteCategory}>Delete</button>
					<button className="btn btn-warning btn-sm w-1/2" onClick={() => setCategoryModalIsOpen(false)}>Cancel</button>
				</div>
			</div>
		</dialog >
	)
}

export default CategoryModal