import { RecurrenceFrequency } from "../../Enums/RecurrenceFrequency"
import { TransactionStatus } from "../../Enums/TransactionStatus"
import { TransactionTypeEnum } from "../../Enums/TransactionTypeEnum"

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
    transactionStatus: TransactionStatus
    recurrenceFrequency: RecurrenceFrequency
    createdAt: string
    updatedAt: string
}