'use client';

import React from 'react';
import MessageBubble from './MessageBubble';
import {Message} from "@/app/types";

// interface Message {
//     id: number;
//     text: string;
//     sent: boolean;
//     time: string;
//     seen?: boolean;
// }

interface MessagesListProps {
    messages: Message[];
}

export default function MessagesList({ messages }: MessagesListProps) {
    return (
        <>
            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}
        </>
    );
}