import lucia from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import { sveltekit } from "lucia-auth/middleware";
import { dev } from "$app/environment";
import { prismaClient } from "$lib/server/prisma";

export const auth = lucia({
  adapter: prisma(prismaClient),
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      username: userData.username,
      name: userData.name,
    };
  },
});

export type Auth = typeof auth;
