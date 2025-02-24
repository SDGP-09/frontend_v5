'use client';
/*
  The 'use client' directive ensures this component
  runs in the browser, letting us use React state,
  window events, etc.
*/

import React, { useState, useEffect, useRef } from 'react';
import { Building2 } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import {Conversation} from "@/app/types/conversation.messenger";

// Example messages data (moved here for convenience)
const dummyMessages = [
    {
        id: 1,
        text: "Hi, I've reviewed the project timeline",
        sent: true,
        time: "10:15 AM",
        seen: true,
    },
    {
        id: 2,
        text: "Great! What do you think about the deadlines?",
        sent: false,
        time: "10:20 AM",
    },
    {
        id: 3,
        text: "They look achievable. I've added some notes to the document.",
        sent: true,
        time: "10:25 AM",
        seen: true,
    },
    {
        id: 4,
        text: "The project timeline looks good",
        sent: false,
        time: "10:30 AM",
    },
];

/*
  We'll define a TypeScript type for the conversation
  just so it's clearer. (Optional if you're not using TS.)
*/
// interface Conversation {
//     id: number;
//     name: string;
//     lastMessage: string;
//     time: string;
//     unread: number;
//     avatar: string;
// }

interface MessengerInterfaceProps {
    initialConversations: Conversation[]; // from SSR
}

export default function MessengerInterface({
                                               initialConversations,
                                           }: MessengerInterfaceProps) {
    // 1) State for conversations (SSR-provided)
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

    // 2) Currently selected conversation
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

    // 3) State for sidebar width (drag to resize)
    const [sidebarWidth, setSidebarWidth] = useState(384); // initial 384px
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startWidth = useRef(0);

    // 4) State for detecting mobile (less than 768px)
    const [isMobileView, setIsMobileView] = useState(false);

    // 5) On mount, detect if the screen is mobile; also handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };
        handleResize(); // check immediately
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 6) Drag logic: sidebar resize
    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startX.current = e.pageX;
        startWidth.current = sidebarWidth;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        const delta = e.pageX - startX.current;
        const newWidth = Math.min(Math.max(startWidth.current + delta, 320), 480);
        setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    // 7) Show/hide conversation list + message window depending on mobile
    const showConversationList = !isMobileView || !selectedConversation;
    const showMessageInterface = !isMobileView || selectedConversation;

    // 8) "NavBar" could be here or in a global layout
    //    We'll replicate the old nav for completeness:
    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Navigation Bar */}
            {/*<nav className="bg-white shadow-lg flex-none">*/}
            {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/}
            {/*        <div className="flex justify-between h-16 items-center">*/}
            {/*            <div className="flex items-center">*/}
            {/*                <Building2 className="h-8 w-8 text-green-500" />*/}
            {/*                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">*/}
            {/*    BuildConnect*/}
            {/*  </span>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center space-x-4">*/}
            {/*                <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">*/}
            {/*                    Login*/}
            {/*                </button>*/}
            {/*                <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition-all">*/}
            {/*                    Sign Up*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</nav>*/}

            {/* Main Messaging Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar (conversation list) */}
                {showConversationList && (
                    <Sidebar
                        width={isMobileView ? '100%' : `${sidebarWidth}px`}
                        conversations={conversations}
                        onSelectConversation={(conv) => setSelectedConversation(conv)}
                    />
                )}

                {/* Resizer bar (only if not mobile & if both side & chat are displayed) */}
                {!isMobileView && showConversationList && showMessageInterface && (
                    <div
                        className="w-1 bg-gray-200 hover:bg-green-500 cursor-col-resize transition-colors"
                        onMouseDown={handleMouseDown}
                    />
                )}

                {/* Chat window */}
                {showMessageInterface && (
                    <ChatWindow
                        conversation={selectedConversation}
                        messages={dummyMessages}
                        onBack={() => setSelectedConversation(null)}
                    />
                )}
            </div>
        </div>
    );
}