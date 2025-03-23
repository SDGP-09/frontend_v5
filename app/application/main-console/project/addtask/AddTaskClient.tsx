// AddTaskClient.tsx
'use client';

import dynamic from 'next/dynamic';

// Dynamically import the content component with SSR disabled.
const AddTaskContent = dynamic(() => import('./AddTaskContent'), {
    ssr: false,
});

export default function AddTaskClient() {
    return <AddTaskContent />;
}
