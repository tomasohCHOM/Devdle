import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import type { Handle } from "@sveltejs/kit";
import { redirect, error } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const createClient: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  });

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    return session;
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    },
  });
};

const protectRoutes: Handle = async ({ event, resolve }) => {
  // protect requests to all routes that start with /protected-routes
  if (event.url.pathname.startsWith("/protected-routes")) {
    const session = await event.locals.getSession();
    if (!session) {
      // the user is not signed in
      throw redirect(303, "/");
    }
  }

  // protect POST requests to all routes that start with /protected-posts
  if (
    event.url.pathname.startsWith("/protected-posts") &&
    event.request.method === "POST"
  ) {
    const session = await event.locals.getSession();
    if (!session) {
      // the user is not signed in
      throw error(303, "/");
    }
  }

  return resolve(event);
};

const handleTheme = (async ({ event, resolve }) => {
  const theme = event.cookies.get("theme");

  if (theme) {
    return await resolve(event, {
      transformPageChunk: ({ html }) =>
        html.replace('data-theme=""', `data-theme="${theme}"`),
    });
  }
  return await resolve(event);
}) satisfies Handle;

export const handle = sequence(createClient, protectRoutes, handleTheme);
