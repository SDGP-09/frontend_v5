

import React from "react";
import NavBar from "@/app/components/NavBar";
import { LoadingProvider } from "@/app/context/LoadingContext";
import LoadingScreen from "@/app/components/LoadingScreen";
import Footer from "@/app/components/Footer"

export const metadata = {
    title: "CiviLink - Connecting Contractors",
    description: "CiviLink helps contractors and subcontractors find partnerships.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="bg-white text-black">
        <LoadingProvider>
            <LoadingScreen/>
                <NavBar />
                <div className="w-screen min-h-screen">{children}</div>

            <Footer/>
        </LoadingProvider>
        </body>
        </html>
    );
}
