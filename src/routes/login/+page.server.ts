import type { Provider } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  login: async ({ request, url, locals: { supabase } }) => {
    const provider = url.searchParams.get("provider") as Provider;

    if (provider) {
      const { data, error: err } = await supabase.auth.signInWithOAuth({
        provider: provider,
      });

      if (err) {
        console.error(err);
        return fail(400, {
          message: "Something went wrong.",
        });
      }
      throw redirect(303, data.url);
    }

    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback`,
      },
    });

    if (error) {
      return fail(500, {
        message: "Server error. Try again later.",
        success: false,
        email,
      });
    }

    return {
      message: "Successfully logged in.",
      success: true,
    };
  },
};
