"use client"

import { useState } from "react"
import { editWatch } from "../server-action/editWatch";

export default function EditWatch({ watch }) {
    const [formModal, setFormModal] = useState({
        model: watch.model,
        brand: watch.brand,
        reference_number: watch.reference_number
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormModal({
            ...formModal,
            [name]: value
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const loading = window[`my_modal_loading`]
        window[`my_modal_edit${watch.id}`].close()

        loading.showModal()

        const formData = new FormData(e.target);
        try {
            await editWatch(formData)
        } catch (error) {
            console.error('Error saat menambahkan data:', error);
        } finally {
            loading.close()
        }
    }

    return (
        <div>
            <button onClick={() => window[`my_modal_edit${watch.id}`].showModal()} className="p-2 bg-blue-500 hover:bg-blue-700 active:scale-95 rounded-md">Edit</button>
            <dialog id={`my_modal_edit${watch.id}`} className="modal p-6">
                <div className="w-full">
                    <div className="md:w-[340px] p-4 shadow shadow-slate-700 bg-blue-500 rounded-md mx-auto">
                        <h1 className="text-white">Edit List</h1>
                        <form className="space-y-2" onSubmit={(e) => handleSubmitForm(e)}>
                            <input type="hidden" name="id" value={watch.id} id={watch.id} />
                            <div>
                                <label className="text-white" htmlFor="model">Model</label>
                                <input type="text" className="border-[2px] w-full rounded-sm capitalize" id="model" name="model" required placeholder="Model" value={formModal.model} onChange={(e) => handleInputChange(e)} />
                            </div>
                            <div>
                                <label className="text-white" htmlFor="brand">Brand</label>
                                <input type="text" className="border-[2px] w-full rounded-sm capitalize" id="brand" name="brand" required placeholder="Brand" value={formModal.brand} onChange={(e) => handleInputChange(e)} />
                            </div>
                            <div>
                                <label className="text-white" htmlFor="reference_number">Reference Number</label>
                                <input type="text" className="border-[2px] w-full rounded-sm capitalize" id="reference_number" name="reference_number" required placeholder="Reference Number" value={formModal.reference_number} onChange={(e) => handleInputChange(e)} />
                            </div>
                            <button type="submit" className="bg-green-400 p-2 rounded-md font-semibold active:scale-95 hover:bg-green-500 w-full">
                                Edit
                            </button>
                        </form>
                        <form method="dialog">
                            <button onClick={() => setFormModal({
                                model: watch.model,
                                brand: watch.brand,
                                reference_number: watch.reference_number

                            })} className="btn mt-2 bg-red-500 rounded-md font-semibold active:scale-95 hover:bg-red-600 w-full border-none">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

