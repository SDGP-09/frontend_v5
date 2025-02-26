'use client';

import { TaskDetails } from '@/app/application/project-management/components/TaskDetails';

interface TaskDetailsWrapperProps {
    projectId: string;
}

export function TaskDetailsWrapper({ projectId }: TaskDetailsWrapperProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <TaskDetails projectId={projectId} />
        </div>
    );
}

