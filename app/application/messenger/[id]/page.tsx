import { Conversation } from "@/app/types/conversation.messenger";
import MessengerInterface from "../MessengerInterface";
import axios from "axios";

type PageProps = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};


// The shape the Nest API returns
interface NestConversationApiData {
    id: number;
    sender: string;
    updatedAt: string | null;
    unreadMessageCount?: number | null;
    // Possibly there's a "recipient" if you have 2 participants in a conversation
    // Adjust to match your actual backend shape
    recipient?: string;
}

// The shape the Spring endpoint returns
interface ContractorNameAndPicture {
    id: number;
    name: string;
    profile: string; // The string URL or base64 for the profile image
}

// We'll create a small converter that merges everything into your "Conversation" shape
function mergeConversationData(
    conv: NestConversationApiData,
    contractor: ContractorNameAndPicture
): Conversation {
    return {
        id: conv.id,
        // The Nest API "sender" is presumably a userId.
        // We'll store the userId anyway if you want it.
        sender: conv.sender,
        // The "recipient" might also matter if your user is either sender or recipient
        // For now, let's store "name" and "profilePicture" from the contractor info:
        name: contractor.name,
        // The backend gives us .profile as a string.
        // If you want to store it as a Blob, you can do that or store as string
        profilePicture: new Blob([contractor.profile], { type: "text/plain" }),
        // or just keep it as a string if your front end uses <img src={profile} />
        // profilePicture: contractor.profile,
        lastMessage: "", // We might not have lastMessage from Nest (or you do?).
        // If you do, store it here. If not, you can fill in later.
        updatedAt: conv.updatedAt ? new Date(conv.updatedAt) : null,
        unreadMessageCount: conv.unreadMessageCount ?? null,
    };
}







// Reuse the same fetchConversations function (or import it if defined elsewhere)
async function fetchConversations(): Promise<Conversation[]>{
    // const dummyConversations: Conversation[] = [
    //     {
    //         id: 1,
    //         name: "John Doe",
    //         sender: "John",
    //         profilePicture: new Blob(["dummy image data"], { type: "image/png" }),
    //         lastMessage: "Hey, how are you?",
    //         updatedAt: new Date("2023-01-01T12:00:00Z"),
    //         unreadMessageCount: 2,
    //     },
    //     {
    //         id: 2,
    //         name: "Jane Smith",
    //         sender: "Jane",
    //         profilePicture: new Blob(["another dummy image data"], { type: "image/jpeg" }),
    //         lastMessage: "I'll be there soon.",
    //         updatedAt: new Date("2023-01-02T09:00:00Z"),
    //         unreadMessageCount: null,
    //     },
    //     {
    //         id: 3,
    //         name: "Alice Johnson",
    //         sender: "Alice",
    //         profilePicture: new Blob(["more dummy image data"], { type: "image/png" }),
    //         lastMessage: "Thanks for the update!",
    //         updatedAt: null,
    //     },
    // ];
    // return dummyConversations;

    try {
        const token = localStorage.getItem("myAppToken") || "";
        const bodyForNest = {};
        const nestResponse = await axios.post(
            "http://35.193.219.136:4040/api/messages/conversation/allConversations",
            bodyForNest,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const nestData = nestResponse.data.data || nestResponse.data;
        const userIdsSet = new Set<string>();
        nestData.forEach((c: NestConversationApiData) => {

            if (c.sender) {
                userIdsSet.add(c.sender);
            }

        });

        const userIdsArray = Array.from(userIdsSet).map((id) =>
            Number(id) ? Number(id) : 0
        );


        if (userIdsArray.length === 0) {

            return [];
        }

        const contractorRequestBody = {
            ids: userIdsArray, // must match IdPackBasedRequestDTO
        };
        const contractorResponse = await axios.post(
            "http://35.193.219.136:4040/api/contractors/get-contractor-name",
            contractorRequestBody,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // contractorResponse.data
        // {
        //    code: 200,
        //    message: "contractor cards",
        //    data: {
        //      contractorList: [
        //        { id, name, profile },
        //        ...
        //      ]
        //    }
        // }
        const contractorData = contractorResponse.data.data;
        const contractorList: ContractorNameAndPicture[] =
            contractorData.contractorList || [];


        const contractorMap = new Map<number, ContractorNameAndPicture>();
        contractorList.forEach((c) => {
            contractorMap.set(c.id, c);
        });


        const mergedResults: Conversation[] = nestData.map(
            (conv: NestConversationApiData) => {

                const relevantId = Number(conv.sender);



                let cData: ContractorNameAndPicture | undefined =
                    contractorMap.get(relevantId);


                if (!cData) {
                    cData = { id: relevantId, name: "Unknown", profile: "" };
                }


                return mergeConversationData(conv, cData);
            }
        );


        return mergedResults;
    } catch (error) {
        console.error("Error fetching conversations:", error);

        return [];
    }
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
