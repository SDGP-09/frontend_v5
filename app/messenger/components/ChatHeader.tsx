'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import {ConversationHeader} from "@/app/types/conversation.messenger";
import {imageToURL} from "@/app/helpers";


interface ChatHeaderProps {
    conversation: ConversationHeader;
    onBack: () => void;
}

export default function ChatHeader({ conversation, onBack }: ChatHeaderProps) {
    return (
        <div className="bg-white p-4 shadow flex items-center space-x-4 flex-none">
            {/* "Back" button for mobile (or if you want always) */}
            <button
                onClick={onBack}
                className="p-1 hover:bg-gray-100 rounded-full"
            >
                <ArrowLeft className="h-6 w-6" />
            </button>

            <img
                src={imageToURL(conversation.profilePicture)}
                alt={conversation.name}
                className="w-10 h-10 rounded-full"
            />
            <div className="font-medium">{conversation.name}</div>
        </div>
    );
}