'use client';

import React from 'react';
import SearchBar from './SearchBar';
import ConversationCard from './ConversationCard';
import {Conversation} from "@/app/types/conversation.messenger";
import {Socket} from "socket.io-client";



interface SidebarProps {
    width: string; // e.g. '384px' or '100%' for mobile
    conversations: Conversation[];
    onSelectConversation: (conv: Conversation) => void;
    socket: Socket | null
}

export default function Sidebar({
                                    width,
                                    conversations,
                                    onSelectConversation,
                                    socket
                                }: SidebarProps) {
    return (
        <div
            className="bg-white border-r flex flex-col"
            style={{ width }}
        >
            {/* The SearchBar + "New Chat" button */}
            <SearchBar
                socket={socket}
            />

            {/* List of conversation cards */}
            <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                    <ConversationCard
                        key={conversation.id}
                        conversation={conversation}
                        onClick={() => onSelectConversation(conversation)}
                    />
                ))}
            </div>
        </div>
    );
}