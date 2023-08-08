import { fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, url, locals: { supabase } }: any) => {
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
      message: "Successful login.",
      success: true,
    };
  },
};
