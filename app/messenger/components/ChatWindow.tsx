'use client';

import React, {useRef, useEffect, useState} from 'react';
import ChatHeader from './ChatHeader';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import {Conversation} from "@/app/types/conversation.messenger";
import {Message} from "@/app/types";
import {Socket} from "socket.io-client";


// interface Conversation {
//     id: number;
//     name: string;
//     avatar: string;
// }



interface ChatWindowProps {
    conversation: Conversation | null; // null => no chat selected
    // messages: Message[];
    onBack: () => void; // for mobile "back" button
    socket: Socket | null;
}


//Message fetching function here
async function fetchMessages(conversationID: number){
    const conversationIdTempStore: number = conversationID;

    const messages: Message[] = [
        {
            id: 1,
            time: new Date('2025-02-22T10:15:00'),
            message: "Hello, this is a test message.",
            viewed: true,
            edited: false,
            viewedTime: new Date('2025-02-22T10:16:00'),
            editedTime: null,
        },
        {
            id: 2,
            time: new Date('2025-02-22T10:20:00'),
            message: "Hi there, thanks for your reply!",
            reference: 1,
            viewed: true,
            edited: true,
            viewedTime: new Date('2025-02-22T10:21:00'),
            editedTime: new Date('2025-02-22T10:22:00'),
        },
        {
            id: 3,
            time: new Date('2025-02-22T10:25:00'),
            message: "I haven't seen this one yet.",
            viewed: false,
            edited: false,
            viewedTime: null,
            editedTime: null,
        },
    ];


    return messages;
}



export default function ChatWindow({
                                       conversation,
                                       // messages,
                                       onBack,
                                       socket
                                   }: ChatWindowProps) {
    // 1) ref for auto-scrolling to bottom
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const [messages,setMessages] = useState<Message[]>([])


    useEffect(()=>{
        async function loadMessage(){
            if (!conversation){
                return;
            }
            try{
                const fetched = await fetchMessages(conversation.id)
                setMessages(fetched);
            }catch (error){
                console.log(error);
            }
        }
        loadMessage();



    },[conversation]);






    // 2) scroll to bottom whenever `conversation` changes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);



    useEffect(() =>{
        if (!socket) return;

        const handleNewMessage = (newMessage: Message) => {

            //Optional console log statement (will comment later)
            console.log(newMessage);

            setMessages((prev)=>[...prev, newMessage])
        }

        socket.on('message', handleNewMessage);


    }, [socket]);


    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);



    if (!conversation) {
        // 3) Placeholder view if no conversation is selected
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50">
                <img
                    src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624"
                    alt="Select a conversation"
                    className="w-48 h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">whatsdfsafjsfdjklsfdjklsfdajklsfda;jklsfda;jklsfda
                    Select a Conversation
                </h3>
                <p className="text-gray-500 mt-2">
                    Choose a conversation from the list to start messaging
                </p>
            </div>
        );
    }

    //Message fetching function call here.

    // const fetchedMessages: Message[] = await fetchMessages(conversation.id)



    // 4) If a conversation is selected, render the chat UI
    return (
        <div className="flex-1 flex flex-col bg-gray-50 min-w-[320px]">
            {/* Chat header */}
            <ChatHeader conversation={conversation} onBack={onBack} />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <MessagesList messages={messages} />
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <MessageInput />
        </div>
    );
}