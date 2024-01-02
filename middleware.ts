
import { NextRequest, NextResponse } from 'next/server';
const isUndefined = require("is-undefined");



export function middleware(request:NextRequest) {

  const token = request.cookies.get('token');
  
if (!token) {
    
    console.log('Unauthorized');
    return NextResponse.redirect(new URL('/', request.url));
  }

  if(token.value.toString() == 'undefined'){
    console.log('undefined token');
    return NextResponse.redirect(new URL('/', request.url));
  }

  
  return NextResponse.next();
}

export const config = {
  
  matcher: '/home',
};









    







  

 



