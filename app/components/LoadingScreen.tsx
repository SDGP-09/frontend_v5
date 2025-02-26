"use client";



import {useLoading} from "@/app/context/LoadingContext";

export default function LoadingScreen() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (


        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="p-4 bg-white shadow-lg rounded-md">
                <p className="text-lg font-bold text-gray-700">Loading...</p>
            </div>
        </div>
    );
}
