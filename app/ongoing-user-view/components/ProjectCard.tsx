// import React from "react";
//
// interface ProjectCardProps {
//     project: {
//         id: number;
//         name: string;
//         status: string;
//         description: string;
//         image: string;
//     };
//     isSelected: boolean;
//     onSelectProject: (id: number) => void;
// }
//
// const ProjectCard: React.FC<ProjectCardProps> = ({ project, isSelected, onSelectProject }) => {
//     return (
//         <div
//             className={`bg-white rounded-lg shadow overflow-hidden ${isSelected ? "ring-2 ring-emerald-500" : ""}`}
//         >
//             <div className="h-48 overflow-hidden">
//                 <img
//                     src={project.image}
//                     alt={project.name}
//                     className="w-full h-full object-cover"
//                 />
//             </div>
//             <div className="p-5">
//                 <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
//                     <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
//             {project.status}
//           </span>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
//                 <button
//                     className="w-full py-2 bg-emerald-50 text-emerald-700 rounded-md text-sm font-medium hover:bg-emerald-100 transition-colors"
//                     onClick={() => onSelectProject(project.id)}
//                 >
//                     View Details
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default ProjectCard;
import React from "react";
import Image from "next/image";

interface ProjectCardProps {
    project: {
        id: number;
        name: string;
        status: string;
        description: string;
        image: string;
    };
    isSelected: boolean;
    onSelectProject: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isSelected, onSelectProject }) => {
    return (
        <div className={`bg-white rounded-lg shadow overflow-hidden ${isSelected ? "ring-2 ring-emerald-500" : ""}`}>
            <div className="relative h-48">
                <Image
                    src={project.image}
                    alt={project.name}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {project.status}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                <button
                    className="w-full py-2 bg-emerald-50 text-emerald-700 rounded-md text-sm font-medium hover:bg-emerald-100 transition-colors"
                    onClick={() => onSelectProject(project.id)}
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
