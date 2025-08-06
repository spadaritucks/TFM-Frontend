import { RecurrenceFrequency } from "../../Enums/RecurrenceFrequency"
import { TransactionStatus } from "../../Enums/TransactionStatus"
import { TransactionTypeEnum } from "../../Enums/TransactionTypeEnum"

export type TransactionRequestDTO = {
    userId: string
    subCategoryId: string
    transactionType: TransactionTypeEnum
    transactionValue : number
    description: string
    transactionDate: string
    recurrent: boolean
    transactionStatus : TransactionStatus
    recurrenceFrequency : RecurrenceFrequency
}