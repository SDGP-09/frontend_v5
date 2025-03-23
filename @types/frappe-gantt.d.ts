declare module 'frappe-gantt' {
    export class Gantt {
        constructor(
            container: HTMLElement,
            tasks: Array<{
                id: string;
                name: string;
                start: string;
                end: string;
                progress: number;
                dependencies?: string;
                custom_class?: string;
            }>,
            options?: {
                view_mode?: 'Quarter Day' | 'Half Day' | 'Day' | 'Week' | 'Month';
                language?: string;
            }
        );
    }
}