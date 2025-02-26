"use client";

import { Building2, X } from "lucide-react";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import api from "@/app/util/api";


interface LoginProps {
    onClose: () => void;
    onLoginSuccess: () => void;
}

export default function Login({ onClose, onLoginSuccess }: LoginProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            const params = new URLSearchParams({
                username: formData.username,
                password: formData.password,
            });

            const response = await api.post(
                `http://35.193.219.136:4040/api/v1/users/login`,
                params.toString(),
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded","X-Require-Auth": "false", }

                }
            );

            const data = response.data;
            Cookies.set("token", data.access_token, { expires: 7 });




            onLoginSuccess();
            onClose();


            const decodedPayload = JSON.parse(atob(data.access_token.split(".")[1]));
            const userRoles = decodedPayload.realm_access?.roles || [];
            router.push(userRoles.includes("group_member") ? "/application" : "/");
        } catch (error) {
            setErrors({ username: "Invalid credentials"});
            console.log(error)
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors">
                    <X className="h-6 w-6" />
                </button>

                <div className="p-8">
                    <div className="flex items-center justify-center space-x-2 mb-8">
                        <Building2 className="h-10 w-10 text-green-500" />
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                            CiviLink
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-200 focus:border-green-500"
                            />
                            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-200 focus:border-green-500"
                            />
                        </div>

                        <button type="submit" className="w-full py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02]">
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
