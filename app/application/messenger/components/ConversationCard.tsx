'use client';

import React, {useEffect, useState} from 'react';
import {Conversation} from "@/app/types/conversation.messenger";
import {formatDate, imageToURL} from "@/app/helpers/messenger.helper";
import DeleteConversationModal from "@/app/messenger/components/DeleteConversationModal";



interface ConversationCardProps {
    conversation: Conversation;
    onClick: () => void;
}




export default function ConversationCard({
                                             conversation,
                                             onClick,
                                         }: ConversationCardProps) {
    // const time: string = formatDate(conversation.updatedAt);

    // const imgSrc: string = URL.createObjectURL(conversation.profilePicture);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        // Prevent the browser default menu

        window.dispatchEvent(new MouseEvent('click'));
        // Store the click position, so we can position the custom menu
        setMenuPosition({ x: e.pageX, y: e.pageY });
        setShowContextMenu(true);
    };


    useEffect(() => {
        const handleGlobalClick = () => {
            setShowContextMenu(false);
        };
        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, []);


    // hides the menu if the user clicks elsewhere
    const handleDeleteClick = () => {
        setShowContextMenu(false);

        setShowDeleteModal(true);

    };


    const handleConfirmDelete = async () =>{



        //Sockets
        //HTTP call if required.

        setShowDeleteModal(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };


    return (
        <div
            onClick={onClick}
            onContextMenu={handleContextMenu}
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

            {showContextMenu && (
                <div
                    className="absolute bg-white border rounded shadow-lg z-50 p-2"
                    style={{
                        top: menuPosition.y,
                        left: menuPosition.x,
                    }}
                >
                    <button
                        onClick={handleDeleteClick}
                        className="block px-2 py-1 text-left hover:bg-red-50 text-red-600 min-w-[50px]"
                    >
                        Delete
                    </button>
                </div>
            )}

            {/* 8) The "Are you sure?" modal */}
            {showDeleteModal && (
                <DeleteConversationModal
                    conversationName={conversation.name}
                    onDelete={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}


        </div>
    );
}