'use server'

import { cookies } from "next/headers"

export async function GetCurrentUser () {
    const cookiesStore = await cookies()
    const cookiesUser =  cookiesStore.get("user")?.value
    if(!cookiesUser){
        throw new Error("Não foi possivel localizar os dados do usuario logado")
    }

    const user = JSON.parse(cookiesUser)

    return user 

    
}