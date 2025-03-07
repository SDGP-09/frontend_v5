// import React, { useState } from "react";
//
// interface Project {
//     id: number;
//     title: string;
//     description: string;
//     status: string;
//     duration: string;
//     image: string;
//     visible: boolean;
//     private: boolean;
// }
//
// interface ProjectModalProps {
//     project: Project | null;
//     onClose: () => void;
//     onSave: (updatedProject: Project) => void;
//     onDelete: (id: number) => void;
// }
//
// const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSave, onDelete }) => {
//     if (!project) return null;
//
//     const [editedProject, setEditedProject] = useState({ ...project });
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setEditedProject((prev) => ({ ...prev, [name]: value }));
//     };
//
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-md w-96 shadow-lg">
//                 <h2 className="text-xl font-bold mb-4">Project Details</h2>
//
//                 <label className="block font-medium">Title:</label>
//                 <input
//                     type="text"
//                     name="title"
//                     value={editedProject.title}
//                     onChange={handleChange}
//                     className="border w-full p-2 mb-3 rounded-md"
//                 />
//
//                 <label className="block font-medium">Description:</label>
//                 <textarea
//                     name="description"
//                     value={editedProject.description}
//                     onChange={handleChange}
//                     className="border w-full p-2 mb-3 rounded-md"
//                 />
//
//                 <label className="block font-medium">Status:</label>
//                 <input
//                     type="text"
//                     name="status"
//                     value={editedProject.status}
//                     onChange={handleChange}
//                     className="border w-full p-2 mb-3 rounded-md"
//                 />
//
//                 <div className="flex justify-between mt-4">
//                     <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => onSave(editedProject)}>
//                         Save
//                     </button>
//                     <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => onDelete(editedProject.id)}>
//                         Delete
//                     </button>
//                     <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ProjectModal;
