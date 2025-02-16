import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import axios from "axios"; // ✅ Use jose instead of jsonwebtoken

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value;
    const pathname = req.nextUrl.pathname;
    const protectedPaths = ["/application"];

    if (protectedPaths.includes(pathname) && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        let requiredRole = "";
        if (pathname.startsWith("/application")) {
            requiredRole = "genaral"; // Fix the typo if "general" was intended
        }

        // ✅ Decode JWT using jose (works in Edge Runtime)
        const decodedToken = token ? decodeJwt(token) : null;

        if (!decodedToken) {
            console.error("Invalid token format");
            return NextResponse.redirect(new URL("/login", req.url));
        }


        const response = await axios.post(
            'http://34.56.198.54:9090/api/v1/users/verify',
            null, // No request body
            {
                params: {
                    authToken: `Bearer ${token}` // Sending token as a query parameter
                }
            }
        );


        if (response.data === true) {
            return NextResponse.next();
        }else{
            // Redirect to login if validation fails
            return NextResponse.redirect(new URL('/login', req.url));
        }

        console.log("Required role:", requiredRole);
        console.log("Current path:", pathname);

        // ✅ Safely extract roles with a fallback
        const userRoles: string[] = (decodedToken as any)?.realm_access?.roles || [];
        console.log("User roles:", userRoles);

        if (!userRoles.includes(requiredRole)) {
            console.error("User lacks required role:", requiredRole);
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/application/:path*"], // Define the paths that should trigger this middleware
};
