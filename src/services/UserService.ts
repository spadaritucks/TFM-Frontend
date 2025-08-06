'use server'
import { UserRequestDTO } from "@/@types/DTOs/Users/UserRequestDTO"
import { UserResponseDTO } from "@/@types/DTOs/Users/UserResponseDTO"
import { api } from "@/config/axios"
import { getToken } from "@/utils/GetToken";




export async function GetAllUsersService(page: string, size: string): Promise<UserResponseDTO[]> {

    const token = await getToken()

    const response = await api.get("/users", {
        params: {
            page,
            size
        },
        headers : {
            "Authorization" : `Bearer ${token}`
        },
    })

    if (response.status !== 200) {
        throw new Error("Erro no servidor")
    }

    return response.data
}

export async function CreateUserService(formdata: FormData): Promise<void> {


    const response = await api.post("/users", formdata)

    if (response.status !== 201) {
        if (Array.isArray(response.data) && response.data[0]?.message) {
            throw new Error(response.data.map((e: {message : string}) => e.message).join("\n"));
        }
        throw new Error(response.data.message)
    }
    return response.data

}