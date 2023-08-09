import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  register: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      return fail(400, {
        message: "Passwords do not match.",
        success: false,
        email,
      });
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
      return fail(500, {
        message: "Server error. Try again later.",
        success: false,
        email,
      });
    }

    return {
      message: "Successfully signed up.",
      success: true,
    };
  },
};
