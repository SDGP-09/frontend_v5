// "use client";
//
// import React, { useState } from "react";
//
// export default function ProjectPagination() {
//     const projects = [];
//
//     const projectsPerPage = 6;
//     const totalPages = Math.ceil(projects.length / projectsPerPage);
//     const [currentPage, setCurrentPage] = useState(1);
//
//     const indexOfLastProject = currentPage * projectsPerPage;
//     const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//     const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
//
//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };
//
//     return (
//         <div className="mt-8 flex flex-col items-center">
//             <div className="mt-8 flex space-x-2">
//                 <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 border rounded-md disabled:opacity-50"
//                 >
//                     1
//                 </button>
//                 {[...Array(totalPages)].map((_, i) => (
//                     <button
//                         key={i}
//                         onClick={() => handlePageChange(i + 1)}
//                         className={`px-4 py-2 border rounded-md ${currentPage === i + 1 ? "bg-emerald-500 text-white" : "bg-white"}`}
//                     >
//                         {i + 1}
//                     </button>
//                 ))}
//                 <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-2 border rounded-md disabled:opacity-50"
//                 >
//                     2
//                 </button>
//             </div>
//         </div>
//     );
// }
