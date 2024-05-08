"use client"
import React, { useState, useRef, useEffect } from 'react';
import { addNewWatch } from "../server-action/AddNewWatch";
import LoadingModal from '../modals/LoadingModal';

export default function AddWatch() {
    const formRef = useRef(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        window[`my_modal_loading`].showModal()

        const formData = new FormData(e.target);
        try {
            await addNewWatch(formData);
            formRef.current.reset()
        } catch (error) {
            console.error('Error saat menambahkan data:', error);
        } finally {
            window[`my_modal_loading`].close()
        }
    };

    return (
        <div className="w-full mt-4 md:mt-3 xl:mt-0">
            <div className="md:w-1/2 p-4 shadow shadow-slate-700 rounded-md mx-auto">
                <h1 className="text-white">Add List</h1>
                <form ref={formRef} onSubmit={(e) => handleSubmit(e)} className="space-y-2">
                    <div>
                        <label className="text-white" htmlFor="model">Model</label>
                        <input type="text" className="border-[2px] w-full rounded-sm capitalize" id="model" name="model" required placeholder="Model" />
                    </div>
                    <div>
                        <label className="text-white" htmlFor="brand">Brand</label>
                        <input type="text" className="border-[2px] w-full rounded-sm capitalize" id="brand" name="brand" required placeholder="Brand" />
                    </div>
                    <div>
                        <label className="text-white" htmlFor="reference_number">Reference Number</label>
                        <input type="text" className="border-[2px] w-full rounded-sm capitalize" id="reference_number" name="reference_number" required placeholder="Reference Number" />
                    </div>
                    <button type="submit" className="bg-green-400 p-2 rounded-md flex items-center gap-1 font-semibold active:scale-95 hover:bg-green-500">
                        {'Add New List'}
                    </button>
                </form>
                <LoadingModal />
            </div>
        </div>
    );
}

