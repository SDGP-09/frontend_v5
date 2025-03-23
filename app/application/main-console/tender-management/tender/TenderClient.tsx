'use client';

import dynamic from 'next/dynamic';

// Dynamically import the content component with SSR disabled.
const TenderContent = dynamic(() => import('./TenderContent'), {
    ssr: false,
});

export default function AddTaskClient() {
    return <TenderContent />;
}
