
//
// import React from "react";
// import NavBar from "@/app/components/NavBar";
// import { LoadingProvider } from "@/app/context/LoadingContext";
// import LoadingScreen from "@/app/components/LoadingScreen";
// import Footer from "@/app/components/Footer"
//
// export const metadata = {
//     title: "CiviLink - Connecting Contractors",
//     description: "CiviLink helps contractors and subcontractors find partnerships.",
// };
//
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//     return (
//         <html lang="en">
//         <body className="bg-white text-black">
//         <LoadingProvider>
//             <LoadingScreen/>
//                 <NavBar />
//                 <div className="w-screen min-h-screen">{children}</div>
//
//             <Footer/>
//         </LoadingProvider>
//         </body>
//         </html>
//     );
// }
import React from "react";
import { LoadingProvider } from "@/app/context/LoadingContext";
import LoadingScreen from "@/app/components/LoadingScreen";
import { Inter } from 'next/font/google';
import "./globals.css";

// Initialize Inter font
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap'
});

export const metadata = {
    title: "CiviLink - Connecting Contractors and Clients",
    description: "CiviLink helps contractors and subcontractors find partnerships.",
    keywords: ["contractors", "construction", "partnerships", "subcontractors"],
    authors: [{ name: "CiviLink Team" }],
    openGraph: {
        title: "CiviLink - Connecting Contractors and Clients",
        description: "CiviLink helps contractors and subcontractors find partnerships.",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable}`}>
        <body
            className={`
          bg-white 
          text-black 
          font-sans 
          antialiased 
          selection:bg-yellow-500 
          selection:text-black
        `}
        >
        <LoadingProvider>
            <LoadingScreen />
            <main className="w-full min-h-screen overflow-x-hidden">
                {children}
            </main>
        </LoadingProvider>
        </body>
        </html>
    );
}