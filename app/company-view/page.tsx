
"use client";
import { redirect } from "next/navigation";

// Redirect automatically to the default company (id "1")
export default function CompanyViewIndexPage() {
    redirect("/company-view/1");
    return null; // The redirect happens before any UI is rendered
}
