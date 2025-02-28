'use client';

import { SubTaskDetails } from '@/app/application/project-management/components/SubTaskDetails';

interface SubTaskDetailsWrapperProps {
    taskId: string;
}

export function SubTaskDetailsWrapper({ taskId }: SubTaskDetailsWrapperProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <SubTaskDetails taskId={taskId} />
        </div>
    );
}