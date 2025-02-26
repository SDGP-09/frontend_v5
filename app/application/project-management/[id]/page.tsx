'use client';

import { usePathname } from 'next/navigation';
import { TaskDetailsWrapper } from '@/app/application/project-management/components/TaskDetailsWrapper';

export default function ProjectPage() {
    const pathname = usePathname();
    const segments = pathname.split('/');
    const projectId = segments.pop() || segments[segments.length - 1]; // Get last segment

    if (!projectId) {
        return <div>Error: Project ID not found</div>;
    }

    return <TaskDetailsWrapper projectId={projectId} />;
}
