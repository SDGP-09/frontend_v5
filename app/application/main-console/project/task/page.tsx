import {Text} from "lucide-react";

export default function Task (){
    return(
       <div className="bg-fuchsia-800 w-full h-full "><div className="text-xl ml-5"><p>task: task view</p></div>
           <div className=" bg-green-400 flex w-full h-1/6">
               <div className=" bg-amber-800 flex-1 flex h-full text-2xl items-center pl-5">
                   <div className="mr-4"><p>id:</p></div>
                   <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>6541</p></div>
               </div>
               <div className=" bg-fuchsia-800 flex-1 flex h-full text-2xl items-center pl-5">
                   <div className="mr-4"><p>name:</p></div>
                   <p className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full">huyvhuy</p>
               </div>
           </div>

           <div className=" bg-amber-300  flex w-full h-1/6">
               <div className=" bg-cyan-400 flex-1 flex h-full text-2xl items-center pl-5">
                   <div className="mr-4"> <p> start:</p> </div>
                   <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>78167</p></div>
               </div>
               <div className=" bg-green-700 flex-1 flex h-full text-2xl items-center pl-5">
                   <div className="mr-4"><p>end:</p></div>
                   <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>3541</p></div>
               </div>
           </div>

           <div className=" bg-blue-950 flex w-full h-1/6">
               <div className=" bg-fuchsia-400 flex-1 flex h-full text-2xl items-center pl-5">
                   <div className="mr-4"><p>progress:</p></div>
                   <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>jugbj</p></div>
               </div>
               <div className="bg-amber-300 flex-1 flex h-full text-2xl items-center pl-5">
                   <div className="mr-4"><p> dependencies:</p></div>
                   <div className="flex-1 bg-gray-700 pl-10 py-2 mr-2 rounded-full"><p>jugbj</p></div>
               </div>
           </div>

           <div className=" flex flex-col w-full h-[250px]">
               <div className="bg-cyan-400 flex h-10 text-2xl items-center pl-5">
                   <div className="mr-4"><p>description:</p></div>
               </div>
               <div className=" bg-amber-300 flex-1 flex h-[400px] text-2xl items-center pl-5"></div>
           </div>

       </div>
    );
}