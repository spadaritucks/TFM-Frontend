'use server'
import { cookies } from "next/headers";

export async function getToken (): Promise<string> {

    const cookiesStore = await cookies()
    const cookieToken = cookiesStore.get("token")

    if(!cookieToken){
        throw new Error("Não foi possivel localizar o token")
    }

    const token = String(cookieToken)

    return token

}