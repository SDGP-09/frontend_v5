"use client";

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface TenderLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
    backLink?: string;
    backText?: string;
    actions?: ReactNode;
    status?: {
        text: string;
        color: string;
    };
}

const TenderLayout: React.FC<TenderLayoutProps> = ({
                                                       children,
                                                       title,
                                                       subtitle,
                                                       backLink = "/application/main-console/tender-management",
                                                       backText = "Back to Project",
                                                       actions,
                                                       status
                                                   }) => {
    const router = useRouter();

    return (
        <div className="w-full h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <div className="w-full py-3 px-5 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50 shadow-sm flex items-center justify-between">
                <div className="flex items-center">
                    {backLink && (
                        <button
                            onClick={() => router.push(backLink)}
                            className="mr-3 p-1.5 rounded-full hover:bg-white hover:shadow-sm transition-all duration-200 bg-gray-50"
                            title={backText}
                        >
                            <ArrowLeft className="h-4 w-4 text-gray-500" />
                        </button>
                    )}
                    <div>
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-800 font-sans truncate">
                                {title}
                            </h1>
                            {status && (
                                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${status.color} font-medium font-sans`}>
                                    {status.text}
                                </span>
                            )}
                        </div>
                        {subtitle && (
                            <p className="text-xs text-gray-500 mt-0.5 font-sans">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {actions && (
                    <div className="flex items-center space-x-2">
                        {actions}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    );
};

export default TenderLayout;