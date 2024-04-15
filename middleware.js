export { default } from "next-auth/middleware"
import { NextResponse } from "next/server"
export function middleware(req){
    // console.log(req.cookies)
    // const sessionToken = req.cookies.get('next-auth.session-token')?.value
    // if (!sessionToken) return NextResponse.redirect(new URL('/auth', req.url))
    return 
}
// export const config = { matcher: ["/profile/:path*"] }