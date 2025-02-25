import { TaskDetailsWrapper } from '@/app/application/project-management/components/TaskDetailsWrapper';

interface params {
    id:string;
}

// This function is required for static exports with dynamic routes
export function generateStaticParams() {

    return Array.from({ length: 10 }, (_, i) => ({
        id: String(i + 1),
    }));
}

export default function ProjectPage(params:params) {
    return <TaskDetailsWrapper projectId={params.id} />;
}


