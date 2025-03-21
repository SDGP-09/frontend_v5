"use client"

import { useSearchParams, useParams } from "next/navigation";
import {useRouter} from "next/navigation";



export default function Task (){
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const task = {
        id: searchParams.get("id"),
        name: searchParams.get("name"),
        start: searchParams.get("start"),
        end: searchParams.get("end"),
        progress: searchParams.get("progress"),
        dependencies: searchParams.get("dependencies"),
        description: searchParams.get("description"),
    };

    return(
       <div className=" w-full h-full ">
           <div className="w-full h-10 flex">
               <div className="w-full text-xl ml-5">
                   <p>Project Overview: {task.name ?? "Task View"}</p>
               </div>
               <div className="flex gap-4">
                   <button
                       className="py-1 px-5 border border-white rounded-full flex items-center gap-2 cursor-pointer"
                       onClick={() => router.push("/application/main-console/project/addtask")}
                   >
                       <i className="ri-pencil-line"></i>
                       <span>Update</span>
                   </button>

                   <button
                       className="py-1 px-5 border border-white rounded-full flex items-center gap-2 cursor-pointer"
                       onClick={() => router.push("/application/main-console/project/component/Gantt-chart")}
                   >
                       <i className="ri-delete-bin-7-line"></i>
                       <span>Delete</span>
                   </button>
               </div>

           </div>
           <div className="  flex w-full h-1/6">
               <div className="  flex-1 flex h-full text-2xl items-center pl-5">
                   <div className="mr-4"><p>id:</p></div>
                   <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>{task.id ?? "N/A"}</p></div>
               </div>
               <div className="  flex-1 flex h-full text-2xl items-center pl-5">
                   <div className="mr-4"><p>name:</p></div>
                   <p className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full">{task.name ?? "N/A"}</p>
               </div>
           </div>

           <div className="   flex w-full h-1/6">
               <div className=" 0 flex-1 flex h-full text-2xl items-center pl-5">
                   <div className="mr-4"> <p> start:</p> </div>
                   <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>{task.start ?? "N/A"}</p></div>
               </div>
               <div className="  flex-1 flex h-full text-2xl items-center pl-5">
                   <div className="mr-4"><p>end:</p></div>
                   <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>{task.end ?? "N/A"}</p></div>
               </div>
           </div>

           <div className="  flex w-full h-1/6">
               <div className=" 0 flex-1 flex h-full text-2xl items-center pl-5">
                   <div className="mr-4"><p>progress:</p></div>
                   <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>{task.progress ?? "N/A"}</p></div>
               </div>
               <div className=" flex-1 flex h-full text-2xl items-center pl-5">
                   <div className="mr-4"><p> dependencies:</p></div>
                   <div className="flex-1 bg-gray-700 px-10 py-2 mr-2 rounded-full"><p>{task.dependencies ?? "None"}</p></div>
               </div>
           </div>

           <div className=" flex flex-col w-full h-[250px]">
               <div className=" flex h-10 text-2xl items-center pl-5">
                   <div className="mr-4"><p>description:</p></div>
               </div>
               <div className=" bg-gray-700 flex-1 flex h-[400px] text-2xl items-center pl-5 rounded-xl">{task.description ?? "No Description Available"}</div>
           </div>

       </div>
    );
}