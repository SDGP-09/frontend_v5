"use client"
import {useRouter} from "next/navigation";

export default function MainConsole(){
    const router = useRouter();
    return(
       <div className="w-full flex-1  flex flex-col">

           <div className= "w-full h-1/3  text-6xl flex flex-col justify-center items-center">
               <p className="font-bold">SriLankas Largest Construction Platform</p>
               <p className="font-light text-5xl" >Manage your project with confidence</p>
           </div>

           <div className= "w-full flex-1  flex">
               <div className="h-full flex-1  flex justify-center items-center text-8xl">
                   <button className= "w-auto h-auto cursor-pointer " onClick={()=>router.push("/application/main-console/project")}>
                       <div>
                           <i className="ri-presentation-line"></i>
                           <p className= "underline text-2xl">Manage projects</p>
                       </div>
                   </button>


               </div>
               <div className="h-full flex-1  flex justify-center items-center text-8xl">
                   <button className="w-auto h-auto cursor-pointer">
                       <div>
                           <i className="ri-todo-line"></i>
                           <p className="underline text-2xl"onClick={()=>router.push("/application/main-console/tender-management")}>Manage Tenders</p>
                       </div>
                   </button>
               </div>
               <div className="h-full flex-1  flex justify-center items-center text-8xl ">
                   <button className="w-auto h-auto cursor-pointer">
                       <div>
                           <i className="ri-money-dollar-circle-line"></i>
                           <p className="underline text-2xl">Manage Payments</p>
                       </div>
                   </button>
               </div>
           </div>
       </div>


    );
}

