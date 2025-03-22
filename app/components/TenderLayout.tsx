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
        <div className="w-full h-full flex flex-col">
            {/* Header */}
            <div className="w-full py-4 px-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50 shadow-sm flex items-center justify-between">
                <div className="flex items-center">
                    {backLink && (
                        <button
                            onClick={() => router.push(backLink)}
                            className="mr-4 p-2 rounded-full hover:bg-white hover:shadow-sm transition-all duration-200"
                            title={backText}
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-500" />
                        </button>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 font-sans">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-sm text-gray-500 mt-1 font-sans">
                                {subtitle}
                            </p>
                        )}
                        {status && (
                            <div className="mt-1">
                                <span className={`text-xs px-2 py-1 rounded-full ${status.color} font-medium font-sans`}>
                                    {status.text}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {actions && (
                    <div className="flex items-center space-x-3">
                        {actions}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default TenderLayout;