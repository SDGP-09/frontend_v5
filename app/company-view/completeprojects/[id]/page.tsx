// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "next/navigation";
//
// import CompletedProjectDetails from "../components/CompletedProjectDetails";
//
// // Dummy data for completed projects
// const dummyCompletedProjects = [
//     {
//         id: "1",
//         title: "Urban Renewal District",
//         description:
//             "Revitalization of downtown area with mixed-use developments, pedestrian-friendly streets, and green spaces, completed under budget.",
//         status: "Completed",
//         imageUrl:
//             "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1470&q=80",
//         duration: "18 months",
//         completedDate: "March 15, 2024",
//         privacy: "Public",
//         visibility: "Visible",
//     },
//     {
//         id: "2",
//         title: "Riverside Park Renovation",
//         description:
//             "Complete overhaul of the riverside park including new recreational facilities, landscaping, and flood protection measures.",
//         status: "Completed",
//         imageUrl:
//             "https://images.unsplash.com/photo-1584967918940-a7d51b064268?auto=format&fit=crop&w=1470&q=80",
//         duration: "12 months",
//         completedDate: "January 10, 2024",
//         privacy: "Public",
//         visibility: "Visible",
//     },
//     // ... add more projects as needed
// ];
//
// export default function CompletedProjectProfilePage() {
//     // Retrieve the dynamic "id" parameter from the URL
//     const { id } = useParams();
//     const projectId = id ? id.toString() : "1"; // default to "1" if none provided
//
//     // State for project data, loading, and editing
//     const [projectData, setProjectData] = useState<any>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState<any>(null);
//     const isInitialMount = useRef(true);
//
//     // Simulate fetching dummy data for the project using useEffect
//     useEffect(() => {
//         setIsLoading(true);
//         const timer = setTimeout(() => {
//             const project = dummyCompletedProjects.find((p) => p.id === projectId);
//             if (project) {
//                 setProjectData(project);
//                 setFormData(project);
//             } else {
//                 setProjectData(null);
//             }
//             setIsLoading(false);
//         }, 1000); // Simulated network delay
//         return () => clearTimeout(timer);
//     }, [projectId]);
//
//     // Simulate saving updated data (skip on initial mount)
//     useEffect(() => {
//         if (isInitialMount.current) {
//             isInitialMount.current = false;
//         } else {
//             console.log("Saving updated project data for id:", projectId, projectData);
//             // Here you would call your API to save the data once your backend is ready.
//         }
//     }, [projectData, projectId]);
//
//     // Handle changes in the edit form inputs
//     const handleInputChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         const { name, value } = e.target;
//         setFormData((prev: any) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };
//
//     // Handle form submission to update the project data
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         setProjectData(formData);
//         setIsEditing(false);
//     };
//
//     if (isLoading) return <div>Loading...</div>;
//     if (!projectData) return <div>No project found for id: {projectId}</div>;
//
//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <div className="max-w-7xl mx-auto space-y-6">
//                 {/* Display project details using the CompletedProjectDetails component */}
//                 <CompletedProjectDetails project={projectData} />
//
//             </div>
//         </div>
//     );
// }
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import CompletedProjectDetails from "../components/CompletedProjectDetails";

// Define an interface for your completed project data
interface CompletedProject {
    id: string;
    title: string;
    description: string;
    status: string;
    imageUrl: string;
    duration: string;
    completedDate: string;
    privacy: string;
    visibility: string;
}

// Dummy data for completed projects
const dummyCompletedProjects: CompletedProject[] = [
    {
        id: "1",
        title: "Urban Renewal District",
        description:
            "Revitalization of downtown area with mixed-use developments, pedestrian-friendly streets, and green spaces, completed under budget.",
        status: "Completed",
        imageUrl:
            "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1470&q=80",
        duration: "18 months",
        completedDate: "March 15, 2024",
        privacy: "Public",
        visibility: "Visible",
    },
    {
        id: "2",
        title: "Riverside Park Renovation",
        description:
            "Complete overhaul of the riverside park including new recreational facilities, landscaping, and flood protection measures.",
        status: "Completed",
        imageUrl:
            "https://images.unsplash.com/photo-1584967918940-a7d51b064268?auto=format&fit=crop&w=1470&q=80",
        duration: "12 months",
        completedDate: "January 10, 2024",
        privacy: "Public",
        visibility: "Visible",
    },
    // ... add more dummy projects as needed
];

export default function CompletedProjectProfilePage() {
    const { id } = useParams();
    const projectId = id ? id.toString() : "1"; // Default to "1" if none provided

    // Type the project data using CompletedProject
    const [projectData, setProjectData] = useState<CompletedProject | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isInitialMount = useRef<boolean>(true);

    // Simulate fetching dummy data based on the project id
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const project = dummyCompletedProjects.find((p) => p.id === projectId);
            setProjectData(project || null);
            setIsLoading(false);
        }, 1000); // Simulated network delay
        return () => clearTimeout(timer);
    }, [projectId]);

    // Simulate saving updated data (if editing were enabled) – not used here
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            console.log("Saving updated project data for id:", projectId, projectData);
        }
    }, [projectData, projectId]);

    if (isLoading) return <div>Loading...</div>;
    if (!projectData)
        return <div className="min-h-screen p-6">No project found for id: {projectId}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* View-only Completed Project Details */}
                <CompletedProjectDetails project={projectData} />
            </div>
        </div>
    );
}
