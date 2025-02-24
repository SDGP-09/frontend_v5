'use client';

import React, { useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import {Conversation} from "@/app/types/conversation.messenger";

// interface Conversation {
//     id: number;
//     name: string;
//     avatar: string;
// }

interface Message {
    id: number;
    text: string;
    sent: boolean;
    time: string;
    seen?: boolean;
}

interface ChatWindowProps {
    conversation: Conversation | null; // null => no chat selected
    messages: Message[];
    onBack: () => void; // for mobile "back" button
}

export default function ChatWindow({
                                       conversation,
                                       messages,
                                       onBack,
                                   }: ChatWindowProps) {
    // 1) ref for auto-scrolling to bottom
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // 2) scroll to bottom whenever `conversation` changes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

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