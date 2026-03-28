import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// This makes the homepage protected, forcing users to log in before using the agent
const isProtectedRoute = createRouteMatcher(['/']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // <--- This is the magic fix right here!
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};