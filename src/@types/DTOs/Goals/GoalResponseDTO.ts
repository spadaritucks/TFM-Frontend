import { GoalStatus } from "../../Enums/GoalStatus"

export type GoalResponseDTO = {
    id: string
    userId: string
    subCategoryId: string
    goalName : string
    targetValue : string
    startDate : string
    endDate: string
    goalStatus : GoalStatus
    createdAt: string
    updatedAt:string
}