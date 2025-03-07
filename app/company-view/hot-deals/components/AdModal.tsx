// "use client";
//
//
// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { Ad } from "@/app/types";
//
// interface AdModalProps {
//     ad: Ad;
//     onClose: () => void;             // Close the modal
//     onImageClick: (imageUrl: string) => void; // Enlarge an image
// }
//
// export default function AdModal({ ad, onClose, onImageClick }: AdModalProps) {
//
//
//     // 1) Add a "isClosing" state to detect when we should play the zoom-out animation.
//     const [isClosing, setIsClosing] = useState(false);
//
//     // 2) Instead of calling onClose() directly, call this to trigger the zoom-out first:
//     const handleClose = () => {
//         setIsClosing(true);
//     };
//
//     // 3) When the zoom-out animation finishes, we actually do "onClose()"
//     const handleAnimationEnd = () => {
//         if (isClosing) {
//             onClose();
//         }
//     };
//
//     // This state is just for the "per hour / per day" dropdown
//     const [pricingInterval, setPricingInterval] = useState("hour");
//
//     // This closes the modal if the user clicks the black overlay
//     const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
//         if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
//             handleClose();
//         }
//     };
//
//     return (
//         <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 modal-overlay"
//             onClick={handleOverlayClick}
//         >
//             <div className="relative w-[70vw] max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-y-auto animate-modal-in">
//                 {/* Close button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
//                 >
//                     <X className="w-6 h-6" />
//                 </button>
//
//                 {/* Modal Content */}
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold mb-6">{ad.title}</h2>
//
//                     {/* Images Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                         {ad.images.map((image, index) => (
//                             <img
//                                 key={index}
//                                 src={image}
//                                 alt={`${ad.title} ${index + 1}`}
//                                 className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-200"
//                                 onClick={() => onImageClick(image)}
//                             />
//                         ))}
//                     </div>
//
//                     {/* Description */}
//                     <div className="mb-6">
//                         <h3 className="text-xl font-semibold mb-2">Description</h3>
//                         <p className="text-gray-600">{ad.fullDescription}</p>
//                     </div>
//
//                     {/* Pricing Section */}
//                     <div className="mb-6">
//                         <h3 className="text-xl font-semibold mb-2">Pricing</h3>
//                         <div className="flex items-center space-x-4">
//                             <span className="text-2xl font-bold">${ad.price}</span>
//                             <select
//                                 className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 value={pricingInterval}
//                                 onChange={(e) => setPricingInterval(e.target.value)}
//                             >
//                                 <option value="hour">Per hour</option>
//                                 <option value="day">Per day</option>
//                                 <option value="week">Per week</option>
//                                 <option value="month">Per month</option>
//                                 <option value="year">Per year</option>
//                             </select>
//                         </div>
//                     </div>
//
//                     {/* Action Button */}
//                     <button className="w-full px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 text-lg font-semibold">
//                         Let's make a deal
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );}
"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { Ad } from "@/app/types";
import Image from "next/image";

interface AdModalProps {
    ad: Ad;
    onClose: () => void; // Close the modal
    onImageClick: (imageUrl: string) => void; // Enlarge an image
}

export default function AdModal({ ad, onClose, onImageClick }: AdModalProps) {
    // 1) Add a "isClosing" state to detect when we should play the zoom-out animation.
    const [isClosing, setIsClosing] = useState(false);

    // 2) Instead of calling onClose() directly, call this to trigger the zoom-out first:
    const handleClose = () => {
        setIsClosing(true);
    };

    // This state is just for the "per hour / per day" dropdown
    const [pricingInterval, setPricingInterval] = useState("hour");

    // This closes the modal if the user clicks the black overlay
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
            handleClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 modal-overlay"
            onClick={handleOverlayClick}
        >
            <div className="relative w-[70vw] max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-y-auto animate-modal-in">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Modal Content */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">{ad.title}</h2>

                    {/* Images Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {ad.images.map((image, index) => (
                            <div key={index} className="relative w-full h-48">
                                <Image
                                    src={image}
                                    alt={`${ad.title} ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-200"
                                    onClick={() => onImageClick(image)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Description</h3>
                        <p className="text-gray-600">{ad.fullDescription}</p>
                    </div>

                    {/* Pricing Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Pricing</h3>
                        <div className="flex items-center space-x-4">
                            <span className="text-2xl font-bold">${ad.price}</span>
                            <select
                                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={pricingInterval}
                                onChange={(e) => setPricingInterval(e.target.value)}
                            >
                                <option value="hour">Per hour</option>
                                <option value="day">Per day</option>
                                <option value="week">Per week</option>
                                <option value="month">Per month</option>
                                <option value="year">Per year</option>
                            </select>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 text-lg font-semibold">
                        Let&apos;s make a deal
                    </button>
                </div>
            </div>
        </div>
    );
}
