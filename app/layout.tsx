import React from "react";
import NavBar from "@/app/components/NavBar";


export const metadata = {
    title: "CiviLink - Connecting Contractors",
    description: "CiviLink helps contractors and subcontractors find partnerships.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return(
        <>

            <html>
            <body>
                     <NavBar/>
                    {children}
            </body>
            </html>


        </>
    );
}
