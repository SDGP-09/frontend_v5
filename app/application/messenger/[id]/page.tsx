import { Conversation } from "@/app/types/conversation.messenger";
import MessengerInterface from "../MessengerInterface";

type PageProps = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

// Reuse the same fetchConversations function (or import it if defined elsewhere)
async function fetchConversations(): Promise<Conversation[]>{
    const dummyConversations: Conversation[] = [
        {
            id: 1,
            name: "John Doe",
            sender: "John",
            profilePicture: new Blob(["dummy image data"], { type: "image/png" }),
            lastMessage: "Hey, how are you?",
            updatedAt: new Date("2023-01-01T12:00:00Z"),
            unreadMessageCount: 2,
        },
        {
            id: 2,
            name: "Jane Smith",
            sender: "Jane",
            profilePicture: new Blob(["another dummy image data"], { type: "image/jpeg" }),
            lastMessage: "I'll be there soon.",
            updatedAt: new Date("2023-01-02T09:00:00Z"),
            unreadMessageCount: null,
        },
        {
            id: 3,
            name: "Alice Johnson",
            sender: "Alice",
            profilePicture: new Blob(["more dummy image data"], { type: "image/png" }),
            lastMessage: "Thanks for the update!",
            updatedAt: null,
        },
    ];
    return dummyConversations;
}

export default async function MessengerWithIdPage(props: unknown): Promise<React.ReactNode> {
    const { params } = props as PageProps;
    const conversations = await fetchConversations();
    return (
        <MessengerInterface
            initialConversations={conversations}
            selectedId={params.id}
        />
    );
}
