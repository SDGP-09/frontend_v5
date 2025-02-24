'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sent: boolean;
    time: string;
    seen?: boolean;
}

interface MessageBubbleProps {
    message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const bubbleAlignment = message.sent ? 'justify-end' : 'justify-start';
    const bubbleStyle = message.sent
        ? 'bg-green-500 text-white'
        : 'bg-white text-gray-800';

    return (
        <div className={`flex ${bubbleAlignment}`}>
            <div
                className={`max-w-[70%] p-3 rounded-lg ${bubbleStyle}`}
            >
                <p>{message.text}</p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                    <span className="text-xs opacity-75">{message.time}</span>
                    {message.sent && (
                        <Check
                            className={`h-4 w-4 ${
                                message.seen ? 'text-blue-400' : 'opacity-75'
                            }`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}