import React from "react";

export default function ConsoleLayout(  {children,}: Readonly<{children: React.ReactNode;}>){
    return (
            <div className="w-screen h-screen bg-gray-200 flex flex-col text-white justify-center items-center p-10">
                <div className="w-full h-full  flex flex-col">
                    {children}
                    <div className= "w-full h-20  text-2xl flex justify-end items-center">
                        <button className= "mr-10 cursor-pointer">
                            <i className="ri-logout-circle-line"></i>
                            <span className= "ml-3">log out</span>
                        </button>
                    </div>
                </div>
            </div>

    );
}
