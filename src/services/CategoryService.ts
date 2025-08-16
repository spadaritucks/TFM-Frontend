'use server'
import { CategoryRequestDTO } from "@/@types/DTOs/Category/CategoryRequestDTO"
import { CategoryResponseDTO } from "@/@types/DTOs/Category/CategoryResponseDTO"
import { api } from "@/config/axios"
import { getToken } from "@/utils/GetToken";




export async function GetAllCategoriesService(userId : string): Promise<CategoryResponseDTO[]> {
    
    const token = await getToken()

    const response = await api.get("/categories", {
        params: {
            userId
        },
        headers : {
            "Authorization" : `Bearer ${token}`
        },
    })
    console.log(response)

    if (response.status !== 200) {
        throw new Error("Erro no servidor")
    }

    return response.data

}



export async function CreateCategoryService(categoryRequestDTO: CategoryRequestDTO, userId : string) {

    const token = await getToken()

    const response = await api.post("/categories", categoryRequestDTO,{
        headers : {
            "Authorization" : `Bearer ${token}`
        },
        params: {
            userId
        }
        
    })

    if (response.status !== 201) {
        if (Array.isArray(response.data) && response.data[0]?.message) {
            throw new Error(response.data.map((e: {message : string}) => e.message).join("\n"));
        }
        throw new Error(response.data.message)
    }
    return response.data

}