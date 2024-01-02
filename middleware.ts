import cookies from 'next-cookies';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request:NextRequest) {
//   const cookie = cookies({ req: request });
  const token = request.cookies.get('token');
  console.log(request.cookies.get('token'))
  if (!token) {
    //   console.log(request.cookies + request.nextUrl.pathname)
    console.log('Unauthorized');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Continue to the next middleware or route handler if the user is authenticated
  return NextResponse.next();
}

export const config = {
  // Specify the routes where this middleware should run
  matcher: '/home',
};



// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import Cookies from 'js-cookie';

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
    
//   const token = Cookies.get('token');
//   if (!token) {
//     // Redirect to the home route
//     console.log(token)
//     console.log('unAuthorised')
//     return NextResponse.redirect(new URL('/', request.url));
//   }
  
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/home',
//   }