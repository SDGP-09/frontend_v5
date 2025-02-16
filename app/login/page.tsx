"use client";

import {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {


        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }


        try {
            const requestBody = {username, password};
            console.log("Request Body:", requestBody);

            const response = await axios.post(
                `http://34.56.198.54:9090/api/v1/users/login?username=${username}&password=${password}`,
                null, // No request body
                {
                    headers: {"Content-Type": "application/json"},
                }
            );

            console.log("Login Response:", response.data);

            if (!response.data.access_token) {
                throw new Error("Invalid response: No token received.");
            }

            // Store token securely
            Cookies.set("auth_token", response.data.access_token, {
                expires: 1,
                path: "/",
                sameSite: "strict",
            });







            const token = response.data.access_token;
            const decodedToken: any = jwtDecode(token);
            const userRoles: string[] = decodedToken?.realm_access?.roles || [];

            if (userRoles.includes("genaral")) {
                await router.push("/application");
            }else{
                await router.push("/login");
            }

        }catch (error){

            console.error("Login failed:", error instanceof Error ? error.message : error);
            alert("Invalid credentials. Please try again.");

        }
    }

    return (

        <>

            <div className="w-full h-full flex justify-center items-center text-black">
                <div className="w-1/5 h-1/3 border border-black bg-gray-50 flex flex-col p-2 shadow">
                    <p className="text-xl font-bold">Login</p>
                    <div className="w-full h-auto p-2 mt-2">
                        <label htmlFor="uname">User Name</label>
                        <input type="text" className="w-full h-8 rounded-none border border-gray-500 pl-2" id="uname" placeholder="Enter user name"
                               onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="w-full h-auto  p-2 mt-2">
                        <label htmlFor="pword">Password</label>
                        <input type="password" className="w-full h-8 rounded-none border border-gray-500 pl-2" id="pword" placeholder="Enter password"
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="w-full h-auto p-2 mt-2 flex justify-end">
                        <button className="border border-black text-white bg-black p-2">Cancel</button>
                        <button onClick={handleLogin} className="border border-amber-300 p-2 bg-amber-300  text-black hover:text-white ml-2">Login</button>
                    </div>
                </div>
            </div>



        </>

    );

}