import { NextResponse,NextRequest } from "next/server";
import { verifySession } from "./lib/session";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

const protectedRoutes = ['/'];
const publicRoutes = ['/login']

export  default async  function middleware(req) {
    const path = req.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = cookies().get('session')?.value;
    const userID = await verifySession(cookie);



    if(userID && isPublicRoute)  {
        return NextResponse.redirect(new URL('/', req.nextUrl))

    }

    else if(!userID && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))

    }

    return NextResponse.next()




}