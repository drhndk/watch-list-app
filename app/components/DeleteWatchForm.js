"use client"

import { useRef } from "react";
import { deleteWatch } from "../server-action/deleteWatch";

export default function DeleteWatchForm({watchId}) {
    const formRef = useRef(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        window[`my_modal_loading`].showModal()

        const formData = new FormData(e.target);
        try {
            await deleteWatch(formData);
            formRef.current.reset()
        } catch (error) {
            console.error('Error saat menambahkan data:', error);
        } finally {
            window[`my_modal_loading`].close()
        }
    };

    return (
        <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
            <input type="hidden" name="id" value={watchId} />
            <button type="submit" className="p-2 bg-red-500 rounded-md hover:bg-red-600 active:scale-95">Delete</button>
        </form>
    )
}