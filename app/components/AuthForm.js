"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function AuthForm() {
    const supabase = createClientComponentClient()
    return (
        <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="evenDarker"
            showLinks={false}
            view="magic_link"
            providers={["google"]}
            redirectTo="http://localhost:3000/auth/callback"
        />
    )
}