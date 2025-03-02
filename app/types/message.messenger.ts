export interface Message{
    id: number;
    time: Date;
    message: string;
    reference?: number;
    viewed: boolean;
    edited: boolean;
    viewedTime?: Date | null;
    editedTime?: Date | null;
    conversationId: number;
}