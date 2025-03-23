
'use client';

import dynamic from 'next/dynamic';

// Dynamically import the content component with SSR disabled.
const TaskContent = dynamic(() => import('./TaskContent'), {
    ssr: false,
});

export default function AddTaskClient() {
    return <TaskContent />;
}
