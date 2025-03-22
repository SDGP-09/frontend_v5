import React from "react";

export default function ConsoleLayout(  {children,}: Readonly<{children: React.ReactNode;}>){
    return (
            <div className="w-screen h-screen bg-white flex flex-col text-gray-800 justify-center items-center p-0">
                <div className="w-full h-full  flex flex-col">
                    {children}
                    <div className= "w-full h-16  border-t border-gray-100 flex justify-end items-center px-10">
                        <button className= "flex items-center px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                            <i className="ri-logout-circle-line"></i>
                            <span className= "ml-2 font-medium">log out</span>
                        </button>
                    </div>
                </div>
            </div>

    );
}
