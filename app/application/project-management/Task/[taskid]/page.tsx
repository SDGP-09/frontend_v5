'use client';

import { usePathname } from 'next/navigation';
import { SubTaskDetailsWrapper } from '@/app/application/project-management/components/SubTaskDetailsWrapper';

export default function TaskPage() {
    const pathname = usePathname();
    const segments = pathname.split('/');
    const taskId = segments.pop() || segments[segments.length - 1]; // Get last segment

    if (!taskId) {
        return <div>Error: Task ID not found</div>;
    }

    return <SubTaskDetailsWrapper taskId={taskId} />;
}