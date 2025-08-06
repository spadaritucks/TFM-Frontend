import { GoalRequestDTO } from "@/@types/DTOs/Goals/GoalRequestDTO";
import { GoalResponseDTO } from "@/@types/DTOs/Goals/GoalResponseDTO";
import { api } from "@/config/axios";
import { getToken } from "@/utils/GetToken";



export class GoalService {

    static async getAllGoals(page: string, size: string): Promise<GoalResponseDTO[]> {

        const token = await getToken()
       
        const response = await api.get("/goals", {
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

    static async getGoalsByUserId(userId: string | null, page: number, size: number): Promise<GoalResponseDTO[]> {

        const token = await getToken()
       
        const response = await api.get("/goals/by-user", {
            params: {
                userId,
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



    static async createGoal(goalRequestDTO: GoalRequestDTO) {

        const token = await getToken()
      
        const response = await api.post("/goals", goalRequestDTO,{
            headers : {
                "Authorization" : `Bearer ${token}`
            },
            
        })

        if (response.status !== 201) {
            if (Array.isArray(response.data) && response.data[0]?.message) {
                throw new Error(response.data.map((e: { message : string}) => e.message).join("\n"));
            }
            throw new Error(response.data.message)
        }
        return response.data

    }
}