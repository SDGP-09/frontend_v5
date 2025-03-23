'use client';

import dynamic from 'next/dynamic';

// Dynamically import the content component with SSR disabled.
const AddTenderContent = dynamic(() => import('./AddTenderContent'), {
    ssr: false,
});

export default function AddTaskClient() {
    return <AddTenderContent />;
}
