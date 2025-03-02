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
import {Conversation, Message} from "@/app/types";
import {io, Socket} from "socket.io-client";

// Example messages data (moved here for convenience)


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

    const [socket, setSocket] = useState<Socket | null>(null);



    // 5) On mount, detect if the screen is mobile; also handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };
        handleResize(); // check immediately
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(()=>{
        const token: string = "This is a dummy token";


        const newSocket = io('http://localhost:3002', {
            auth: {
                token: `Bearer ${token}`
            }
        })

        newSocket.on('conversations', (updatedConversations: Conversation[])=>{
            setConversations(updatedConversations);
        });

        setSocket(newSocket);

    }, []);



    // useEffect(() => {
    //
    //     if (!socket) return;
    //
    //     const handleIncomingMessage = (newMessage: Message)=> {
    //         //console log just for now (will delete later)
    //         console.log("Message from main conversations: " + newMessage);
    //
    //         setConversations(prevConversations => prevConversations.map(conv => {
    //
    //
    //
    //
    //             return conv;
    //         }));
    //
    //
    //     }
    //
    //
    //
    //
    //
    //
    // });

    function lastIds(): number[] {
        if (conversations.length === 0) {
            return [];
        }
        if (conversations.length === 1) {
            return [conversations[0].id];
        }

        const lastIndex = conversations.length - 1;
        return [conversations[lastIndex - 1].id, conversations[lastIndex].id];
    }




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
                        // messages={dummyMessages}
                        onBack={() => setSelectedConversation(null)}
                        socket={socket}
                        lastConversations={lastIds()}
                    />
                )}
            </div>
        </div>
    );
}