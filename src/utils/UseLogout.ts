'use server'

import { cookies } from "next/headers"
import { redirect, RedirectType } from "next/navigation"


export async function useLogout() : Promise<void> {
    const cookiesStore = await cookies()
    cookiesStore.delete("token")
    cookiesStore.delete("user")
    

    redirect("/", RedirectType.push)
    

     
}