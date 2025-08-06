"use server"
import { AuthRequestDTO } from "@/@types/DTOs/Auth/AuthRequestDTO";
import { AuthResponseDTO } from "@/@types/DTOs/Auth/AuthResponseDTO";
import { api } from "@/config/axios";
import { cookies } from "next/headers";

export async function AuthService (authRequestDTO : AuthRequestDTO) : Promise<AuthResponseDTO> {
    
    const response = await api.post("/auth", authRequestDTO)
    
    if(response.status !== 200){
        throw new Error(response.data.message)
    }

    const cookiesStore = await cookies()
    cookiesStore.set("token", response.data.token)
    cookiesStore.set("user", JSON.stringify(response.data.user))

    return response.data
}

