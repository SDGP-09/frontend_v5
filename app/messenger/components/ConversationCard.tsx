'use client';

import React from 'react';
import {Conversation} from "@/app/types/conversation.messenger";
import {formatDate, imageToURL} from "@/app/helpers/messenger.helper";

// interface Conversation {
//     id: number;
//     name: string;
//     lastMessage: string;
//     time: string;
//     unread: number;
//     avatar: string;
// }

interface ConversationCardProps {
    conversation: Conversation;
    onClick: () => void;
}

// function formatDate(date: Date | null): string {
//     if (!date) return "";
//
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//
//     return `${year}/${month}/${day}`;
// }



export default function ConversationCard({
                                             conversation,
                                             onClick,
                                         }: ConversationCardProps) {
    // const time: string = formatDate(conversation.updatedAt);

    // const imgSrc: string = URL.createObjectURL(conversation.profilePicture);


    return (
        <div
            onClick={onClick}
            className="p-4 border-b hover:bg-gray-50 cursor-pointer grid grid-cols-[auto,1fr,auto] gap-4"
        >
            <img
                src={imageToURL(conversation.profilePicture)}
                alt={conversation.name}
                className="w-12 h-12 rounded-full row-span-2"
            />
            <div className="font-medium truncate">{conversation.name}</div>
            <div className="text-sm text-gray-500">{formatDate(conversation.updatedAt)}</div>
            <div className="text-sm text-gray-600 truncate">
                {conversation.lastMessage}
            </div>
            {conversation.unreadMessageCount != null && (
                <div className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {conversation.unreadMessageCount}
                </div>
            )}
        </div>
    );
}