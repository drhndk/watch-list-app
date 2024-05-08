"use client"
import { createBrowserClient } from "@supabase/ssr";
import AuthForm from "./components/AuthForm";

export default function Home() {
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  // const signInOauth = async () => {
  //   const { data } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: `${location.origin}/auth/callback`
  //     }
  //   })

  //   console.log(data);
  // }

  return (
    <div className="w-full p-8 md:p-10 flex justify-center items-center">
  <div className="w-full md:w-1/2">
    <div className="">
      <div className="flex items-center gap-2">
        <h1 className="text-green-500 text-xl font-semibold">WATCH LIST</h1>
        <h2 className="text-4xl">🎞️</h2>
      </div>
      <div className="flex items-center">
        <h2>Selamat datang di watch-list, Kamu bisa loh bikin list watch yang kamu mau</h2>
        <h3 className="text-4xl">🫵🏼</h3>
      </div>
    </div>
    <div className="w-full mt-10 shadow-sm shadow-slate-500 p-3 rounded-md">
      <p className="text-sm text-slate-500">Login menggunakan email kamu atau google di bawah, nanti akan kami kirim pesan ke email kamu untuk kamu verifikasi loginnya, good luck</p>

      <AuthForm />
    </div>
  </div>
</div>

  );
}
