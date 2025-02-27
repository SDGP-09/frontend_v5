'use client';

import React from 'react';
import { Check } from 'lucide-react';
import {Message} from "@/app/types";
import {formatDate} from "@/app/helpers";

// interface Message {
//     id: number;
//     text: string;
//     sent: boolean;
//     time: string;
//     seen?: boolean;
// }

interface MessageBubbleProps {
    message: Message;
}


//Make sure to engineer the function or you are done.
function isSent(message: Message){
    // Logic to check whether sent


    return true;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const bubbleAlignment = isSent(message) ? 'justify-end' : 'justify-start';
    const bubbleStyle = isSent(message)
        ? 'bg-green-500 text-white'
        : 'bg-white text-gray-800';

    const time: string = formatDate(message.time);

    return (
        <div className={`flex ${bubbleAlignment}`}>
            <div
                className={`max-w-[70%] p-3 rounded-lg ${bubbleStyle}`}
            >
                <p>{message.message}</p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                    <span className="text-xs opacity-75">{time}</span>
                    {isSent(message) && (
                        <Check
                            className={`h-4 w-4 ${
                                message.viewed ? 'text-blue-400' : 'opacity-75'
                            }`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}