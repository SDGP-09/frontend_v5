"use client";


import { useLoading } from "@/app/context/LoadingContext";
import { useEffect } from "react";

export default function Home() {
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000); // Simulate loading delay
    }, [setLoading]);

    return (
        <div className="bg-amber-300 text-black p-5">
            <p className="text-xl font-bold">Home Page</p>
        </div>
    );
}