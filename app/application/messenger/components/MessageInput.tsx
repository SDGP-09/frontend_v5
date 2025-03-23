'use client';

import React, { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';

export default function MessageInput() {
    const [newMessage, setNewMessage] = useState('');

    // Example: you might pass `onSendMessage` as a prop from parent
    // For now, just log it:
    const handleSend = () => {
        console.log('Sending message:', newMessage);
        setNewMessage(''); // clear input
    };

    return (
        <div className="bg-white p-4 flex items-center space-x-4 flex-none">
            <button className="text-gray-500 hover:text-gray-700">
                <Paperclip className="h-6 w-6" />
            </button>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
                className="text-green-500 hover:text-green-600"
                onClick={handleSend}
            >
                <Send className="h-6 w-6" />
            </button>
        </div>
    );
}