'use server'
import { TransactionRequestDTO } from "@/@types/DTOs/Transactions/TransactionRequestDTO"
import { TransactionResponseDTO } from "@/@types/DTOs/Transactions/TransactionResponseDTO"
import { api } from "@/config/axios"
import { getToken } from "@/utils/GetToken";


export async function GetMonthCurrentTransactionAmountByUserIdService(userId: string | null, month: number, year: number, transactionType : string)
    : Promise<number> {
        const token = await getToken()

    const response = await api.get("/transactions/month-amount", {
        params: {
            userId,
            month,
            year,
            transactionType
        },
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })

    if (response.status !== 200) {
        throw new Error("Erro no servidor")
    }
  
    return response.data

}

export async function GetCurrentMonthTransactionsByUserIdService(
    userId: string | null, 
    month: number, 
    year: number,
    minValue : string | null,
    maxValue : string | null,
    subcategory : string | null,
    page: string, 
    size: number
)
    : Promise<TransactionResponseDTO> {
        const token = await getToken()

    const response = await api.get("/transactions/by-user", {
        params: {
            userId,
            month,
            year,
            minValue,
            maxValue,
            subcategory,
            page,
            size
        },
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })

    if (response.status !== 200) {
        throw new Error("Erro no servidor")
    }
  
    return response.data
}




export async function CreateTransactionService(transactionRequestDTO: TransactionRequestDTO) {
    const token = await getToken()

    const response = await api.post("/transactions", transactionRequestDTO, {
        headers : {
            "Authorization" : `Bearer ${token}`
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