'use client';

import React from 'react';
import MessageBubble from './MessageBubble';
import {Message} from "@/app/types";


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