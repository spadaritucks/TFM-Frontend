import { RecurrenceFrequency } from "../../Enums/RecurrenceFrequency"
import { TransactionTypeEnum } from "../../Enums/TransactionTypeEnum"

export type TransactionRequestDTO = {
    userId: string
    subCategoryId: string
    transactionType: TransactionTypeEnum
    transactionValue : number
    description: string
    transactionDate: string
    recurrent: boolean
    recurrenceFrequency : RecurrenceFrequency
}