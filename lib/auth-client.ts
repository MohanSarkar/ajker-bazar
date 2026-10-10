import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" 
    ? window.location.origin 
    : process.env.BETTER_AUTH_URL || "https://ajker-bazar-4k76.vercel.app",
});

export const { signIn, signOut, useSession } = authClient;