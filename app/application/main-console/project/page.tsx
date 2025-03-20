import GanttChart from "@/app/application/main-console/project/component/Gantt-Chart";

export default function Project(){
    return (
        <div className="w-full h-full bg-amber-300 flex flex-col">
            <div className="w-full h-1/5 bg-green-400"></div>
            <div className="w-full flex-1 bg-fuchsia-800">
                <div className="w-full h-full ">
                    <GanttChart/>
                </div>

            </div>
        </div>
    );
}