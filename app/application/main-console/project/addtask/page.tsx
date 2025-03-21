"use client"
import {useRouter} from "next/navigation";

export default function Addtask() {
    //const router = useRouter();
    return (
        <div className=" w-full h-full ">
            <div className="w-full h-10 flex">
                <div className="w-full text-2xl font-bold ml-5 ">
                    <p>Project Overview</p>
                </div>
                <div className="w-full h-full flex justify-end">
                    <button className= "py-1 px-5 border border-white rounded-full mr-5 cursor-pointer" >
                        <i className="ri-sticky-note-add-line"></i>
                        <span>add subtask</span>
                    </button>
                </div>
            </div>
            <div className="  flex w-full h-1/6">
                <div className="  flex-1 flex h-full text-2xl items-center pl-5">
                    <div className="mr-4"><p>id:</p></div>
                    <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>6541</p></div>
                </div>
                <div className="  flex-1 flex h-full text-2xl items-center pl-5">
                    <div className="mr-4"><p>name:</p></div>
                    <p className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full">Project A</p>
                </div>
            </div>

            <div className="   flex w-full h-1/6">
                <div className=" 0 flex-1 flex h-full text-2xl items-center pl-5">
                    <div className="mr-4"><p> start:</p></div>
                    <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>11111</p></div>
                </div>
                <div className="  flex-1 flex h-full text-2xl items-center pl-5">
                    <div className="mr-4"><p>end:</p></div>
                    <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>3541</p></div>
                </div>
            </div>

            <div className="  flex w-full h-1/6">
                <div className=" flex-1 flex h-full text-2xl items-center pl-5">
                    <div className="mr-4"><p>progress:</p></div>
                    <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>New</p></div>
                </div>
                <div className=" flex-1 flex h-full text-2xl items-center pl-5">
                    <div className="mr-4"><p> dependencies:</p></div>
                    <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>xxx</p></div>
                </div>
            </div>

            <div className=" flex flex-col w-full h-[250px]">
                <div className=" flex h-10 text-2xl items-center pl-5">
                    <div className="mr-4"><p>description:</p></div>
                </div>
                <div className=" bg-gray-700 flex-1 flex h-[400px] text-2xl items-center pl-5 rounded-xl"></div>
            </div>

        </div>
    );
}
