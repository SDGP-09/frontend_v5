"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import { X, Upload } from "lucide-react";
import { Ad } from "@/app/types/advertisement.hot-deals";

const DESCRIPTION_MAX_LENGTH = 120;

interface ManageAdModalProps {
    ad: Ad;
    onClose: () => void;
    onUpdateAd: (ad: Ad) => void;
    onCreateAd: (ad: Omit<Ad, "id">) => void;
}

export default function ManageAdModal({
                                          ad,
                                          onClose,
                                          onUpdateAd,
                                          onCreateAd,
                                      }: ManageAdModalProps) {
    // Keep local copy of the ad
    const [editedAd, setEditedAd] = useState<Ad>({ ...ad });
    const [formTouched, setFormTouched] = useState(false);
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Check required fields
    const isFormValid =
        editedAd.title.trim() &&
        editedAd.description.trim() &&
        editedAd.fullDescription.trim() &&
        editedAd.images.length > 0;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
            onClose();
        }
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));

        setEditedAd((prev) => ({
            ...prev,
            images: [...prev.images, ...imageUrls],
        }));
        setFormTouched(true);
    };

    const handleRemoveImage = (index: number) => {
        const newImages = editedAd.images.filter((_, i) => i !== index);
        setEditedAd({ ...editedAd, images: newImages });
        setFormTouched(true);
    };

    const handleSubmit = () => {
        if (!isFormValid) return;

        if (editedAd.id === 0) {
            // Creating new
            const { id, ...rest } = editedAd;
            onCreateAd(rest);
        } else {
            // Updating
            onUpdateAd(editedAd);
        }
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 modal-overlay"
            onClick={handleOverlayClick}
        >
            <div className="relative w-[70vw] max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-y-auto animate-modal-in">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-6">
                    <input
                        type="text"
                        value={editedAd.title}
                        onChange={(e) => {
                            setEditedAd({ ...editedAd, title: e.target.value });
                            setFormTouched(true);
                        }}
                        placeholder="Ad Title"
                        className="w-full text-2xl font-bold mb-6 p-2 border-b border-gray-200 focus:outline-none focus:border-blue-500"
                    />

                    {/* Images */}
                    <div className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {editedAd.images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={image}
                                        alt="Ad Visual"
                                        className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-200"
                                        onClick={() => setEnlargedImage(image)}
                                    />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors duration-200"
                            >
                                <Upload className="w-8 h-8 text-gray-400" />
                            </button>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </div>

                    {/* Description fields */}
                    <div className="mb-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Short Description
                            </label>
                            <div className="relative">
                <textarea
                    value={editedAd.description}
                    onChange={(e) => {
                        const text = e.target.value;
                        // Only allow up to 120 chars
                        if (text.length <= DESCRIPTION_MAX_LENGTH) {
                            setEditedAd({ ...editedAd, description: text });
                            setFormTouched(true);
                        }
                    }}
                    placeholder="Brief description (max 120 characters)"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                />
                                <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                  {DESCRIPTION_MAX_LENGTH - editedAd.description.length} characters left
                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Description
                            </label>
                            <textarea
                                value={editedAd.fullDescription}
                                onChange={(e) => {
                                    setEditedAd({ ...editedAd, fullDescription: e.target.value });
                                    setFormTouched(true);
                                }}
                                placeholder="Detailed description"
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                            />
                        </div>
                    </div>

                    {/* Pricing Grid */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Pricing</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {["hour", "day", "week", "month", "year"].map((interval) => (
                                <div key={interval} className="flex flex-col">
                                    <label className="text-sm text-gray-600 mb-1">
                                        Per {interval}
                                    </label>
                                    <input
                                        type="number"
                                        value={editedAd.prices[interval as keyof Ad["prices"]] || ""}
                                        onChange={(e) => {
                                            const val = e.target.value ? Number(e.target.value) : undefined;
                                            setEditedAd((prev) => ({
                                                ...prev,
                                                price: { ...prev.prices, [interval]: val },
                                            }));
                                            setFormTouched(true);
                                        }}
                                        placeholder="Price"
                                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={!formTouched || !isFormValid}
                        className={`w-full px-6 py-3 rounded-lg text-white text-lg font-semibold transition-all duration-300 ${
                            formTouched && isFormValid
                                ? "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
                                : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                        {editedAd.id === 0 ? "Create Ad" : "Save Changes"}
                    </button>
                </div>

                {/* Enlarged Image Modal */}
                {enlargedImage && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50 cursor-default image-modal-overlay"
                        onClick={(e) => {
                            if ((e.target as HTMLElement).classList.contains("image-modal-overlay")) {
                                setEnlargedImage(null);
                            }
                        }}
                    >
                        <div className="relative animate-modal-in">
                            <button
                                onClick={() => setEnlargedImage(null)}
                                className="absolute left-4 top-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                            <img
                                src={enlargedImage}
                                alt="Enlarged"
                                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
