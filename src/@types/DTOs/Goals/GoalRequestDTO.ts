import { GoalStatus } from "../../Enums/GoalStatus"

export type GoalRequestDTO = {
    userId: string
    subCategoryId: string
    goalName : string
    goalType : string
    targetValue : number
    startDate : string
    endDate: string
    goalStatus : GoalStatus
}