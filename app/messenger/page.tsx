import {Conversation} from "@/app/types/conversation.messenger";
import MessengerInterface from "@/app/messenger/MessengerInterface";

// Example: Suppose we fetch conversation data from some API or database.
async function fetchConversations() {
    // In a real app, you’d do a fetch or DB call here.
    // For now, we'll return the same dummy data used before:


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
            updatedAt: null, // No update time provided
            // unreadMessageCount is optional and can be omitted if not needed.
        },
    ];
    return dummyConversations;
}

export default async function MessengerPage() {
    // 1) Fetch data on the server
    const conversations = await fetchConversations();

    // 2) Render a client component, passing in SSR data
    return (
        <MessengerInterface initialConversations={conversations} />
    );
}