import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware()

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webmanifest|ttf|woff2?|png|jpg|jpeg|gif|svg|svgz|ico|tif|tiff|bmp|webp)).*)",

        "/(api|trpc)(.*)",
    ]
}
