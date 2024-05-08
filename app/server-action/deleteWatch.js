"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteWatch(formData) {
    const watchId = formData.get("id")
    const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies:() => cookieStore})

    const {data:{session}} = await supabase.auth.getSession()
    const user = session?.user

    if (user) {
       const {data,error} =  await supabase.from("watches")
       .delete()
       .match({id: watchId, "user_id": user.id})
       if (error) {
        console.log("isError for delete your todo");
        return
       }
    }else {
        console.log("user is not define");
        return
    }
    revalidatePath("/watch-list")
    return {message: "succes"}
}