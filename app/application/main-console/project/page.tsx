"use client"
import GanttChart from "@/app/application/main-console/project/component/Gantt-Chart";
import {useRouter} from "next/navigation";

export default function Project(){
    const router = useRouter();
    return (
        <div className="w-full h-full  f()lex flex-col">
            <div className="w-full h-14 ">
                <div className= "w-full h-full  flex">
                    <div className="h-full flex-1  flex items-center">
                        <p className= "text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text"> Task Manager</p>
                    </div>
                    <div className="h-full flex-1  text-xl flex justify-end items-center" >
                        <button className= "py-1 px-10   rounded-full mr-5 cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 text-white" onClick={()=>router.push("/application/main-console/project/addtask")}>
                            <i className="ri-sticky-note-add-line"></i>
                            <span >Add Task</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-4/5  flex flex-col mt-4">
                <div className="w-full h-2/3 ">
                    <GanttChart/>
                </div>

            </div>
        </div>
    );
}
