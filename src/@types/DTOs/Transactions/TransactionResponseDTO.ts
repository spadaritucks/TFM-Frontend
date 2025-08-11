import { RecurrenceFrequency } from "../../Enums/RecurrenceFrequency"
import { TransactionStatus } from "../../Enums/TransactionStatus"
import { TransactionTypeEnum } from "../../Enums/TransactionTypeEnum"
import { SubcategoryContentDTO } from "../Subcategory/SubcategoryResponseDTO"

export type TransactionResponseDTO = {

    page: number
    size: number
    totalPages:number
    totalElements : number
    last : boolean

    content: TransactionsContentDTO[]
}

export type TransactionsContentDTO = {
    id: string
    userId: string
    subcategoryId: string
    transactionType: TransactionTypeEnum
    transactionValue: number
    description: string
    transactionDate: string
    recurrent: boolean
    recurrenceFrequency: RecurrenceFrequency
    createdAt: string
    updatedAt: string
    subcategory : SubcategoryContentDTO
}