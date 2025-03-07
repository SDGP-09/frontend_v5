export interface FetchedConversation{
    firstName: string;
    lastName?: string;
    profilePicture: Blob;

}


//last message
export interface RetrievedConversation{
    id: number;
    sender: string;
    lastMessage: string;
    updatedAt: Date | null;
    unreadMessageCount?: number | null;

}

export interface Conversation{
    id: number;
    name: string;
    sender: string;
    profilePicture: Blob;
    lastMessage: string;
    updatedAt: Date | null;
    unreadMessageCount?: number | null;

}

export interface ConversationHeader{
    name: string;
    profilePicture: Blob;

}