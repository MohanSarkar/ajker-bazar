import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://ajker-bazar-4k76.vercel.app", 
});

export const { signIn, signOut, useSession } = authClient;