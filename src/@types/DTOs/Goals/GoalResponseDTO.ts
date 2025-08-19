import { GoalStatus } from "../../Enums/GoalStatus"

export type GoalResponseDTO = {

    page: number
    size: number
    totalPages:number
    totalElements : number
    last : boolean

    content: GoalContentDTO[]
}


export type GoalContentDTO = {
    id: string
    userId: string
    subCategoryId: string
    goalName : string
    goalType : string
    targetValue : number
    startDate : string
    endDate: string
    goalStatus : GoalStatus
    createdAt: string
    updatedAt:string
    subcategory : SubcategoryContentDTO
    currentAmount: number
}

