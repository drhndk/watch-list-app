"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addNewWatch(formData) {
    const model = formData.get("model")
    const brand = formData.get("brand")
    const reference_number = formData.get("reference_number")
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })

    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user

    if (user) {
        const {data, error } = await supabase.from("watches").insert([{
            model,
            brand,
            reference_number,
            user_id: user.id
        }        
        ])
        if (error) {
            console.log("isError your add data!");
            return
        }
    }else {
        console.log("user is not define");
        return
    }
    revalidatePath("/watch-list")
    return { message: "302" }
}