import GanttChart from "@/app/application/main-console/project/component/Gantt-Chart";

export default function Project(){
    return (
        <div className="w-full h-full  flex flex-col">
            <div className="w-full h-14 ">
                <div className= "w-full h-full  flex">
                    <div className="h-full flex-1  flex items-center">
                        <p className= "text-4xl font-bold"> Task Manager</p>
                    </div>
                    <div className="h-full flex-1  text-xl flex justify-end items-center" >
                        <button className= "py-1 px-10 border border-white rounded-full mr-5 cursor-pointer">
                            <i className="ri-sticky-note-add-line"></i>
                            <span >add task</span>
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
