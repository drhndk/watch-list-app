import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import AddWatch from "../components/AddWatch"
import DeleteWatchForm from "../components/DeleteWatchForm"
import EditWatch from "../components/EditWatch"

export default async function WatchList() {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user

    const { data: watches, error } = await supabase.from("watches")
        .select("*")
        .eq("user_id", user.id)
        .order("brand", { ascending: true })

    if (error) {
        console.log("your fetch data is Error!");
    }

    return (
        <div className="w-full md:p-8 p-6 bg-slate-800 min-h-screen">
            <div className="w-full flex justify-between">
                <h1 className="text-green-500">Watch List</h1>
                <form action="https://watch-list-app.vercel.app/auth/signout" method="POST" className="space-y-2">
                    <div className="flex items-center gap-2 break-all w-[180px]">
                        <img className="rounded-full" width={40} src={user.user_metadata.avatar_url} alt="" />
                        <h1 className="text-white">{user.user_metadata.name}</h1>
                    </div>
                    <h2 className="text-slate-500">{user.email}</h2>
                    <button className="bg-red-400 p-2 w-full rounded-md hover:text-slate-700 active:scale-95" type="submit">Sign Out</button>
                </form>
            </div>
            <AddWatch />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {watches?.map((watch) => (
                    <div key={watch.id}>
                        <div className="rounded-sm shadow shadow-green-500 p-4 mt-4">
                            <div className="flex gap-2 text-green-500 break-all">
                                <h1 className="capitalize">{watch.model}</h1>
                                <h2>-</h2>
                                <h3 className="capitalize">{watch.brand}</h3>
                            </div>
                            <div className="flex gap-2">
                                <DeleteWatchForm watchId={watch.id} />
                                <EditWatch watch={watch}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 