import React from "react";

export default function ConsoleLayout(  {children,}: Readonly<{children: React.ReactNode;}>){
    return (
            <div className="w-screen h-screen bg-black flex flex-col text-white justify-center items-center p-10">
                <div className="w-full h-full bg-amber-300 flex flex-col">
                    {children}
                    <div className= "w-full h-20 bg-green-400"></div>
                </div>
            </div>

    );
}