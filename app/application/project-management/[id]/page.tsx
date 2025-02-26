import { TaskDetailsWrapper } from '@/app/application/project-management/components/TaskDetailsWrapper';


export default function ProjectPage({ params }: { params: { id?: string } }) {
    if (!params?.id) {
        return <div>Error: Project ID not found</div>;
    }

    return <TaskDetailsWrapper projectId={params.id} />;
}
