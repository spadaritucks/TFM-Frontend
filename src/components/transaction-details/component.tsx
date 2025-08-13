import { TransactionsContentDTO } from "@/@types/DTOs/Transactions/TransactionResponseDTO"
import "./styles.css"
import { RecurrenceFrequency } from "@/@types/Enums/RecurrenceFrequency"
import dayjs from "dayjs"
import { TransactionTypeEnum } from "@/@types/Enums/TransactionTypeEnum"

interface TransactionsDetailsProps {
    transactions: TransactionsContentDTO
    transactionValue: number
    valueColor: string
}

export default function TransactionsDetails({ transactions, transactionValue, valueColor }: TransactionsDetailsProps) {

    const recurrenceFrequency =
        transactions.recurrenceFrequency === RecurrenceFrequency.DAILY ? "Diario" :
            transactions.recurrenceFrequency === RecurrenceFrequency.WEEKLY ? "Semanal" :
                transactions.recurrenceFrequency === RecurrenceFrequency.MONTHLY ? "Mensal" :
                    transactions.recurrenceFrequency === RecurrenceFrequency.YEARLY ? "Anual" : null

    const transactionType =
        transactions.transactionType === TransactionTypeEnum.INCOME ? "Entrada"
            : transactions.transactionType === TransactionTypeEnum.EXPENSE ? "Saida" : null

    const transactionDate = dayjs(new Date(transactions.transactionDate)).format("DD [de] MMMM [de] YYYY")

    return (
        <div className="transaction-details">
            <div className="info">
                <span>Data da Transação : </span>
                <p>{transactionDate}</p>
            </div>
            <div className="info">
                <span>Tipo da transação : </span>
                <p>{transactionType}</p>
            </div>
            <div className="info">
                <span>Valor da Transação : </span>
                <p style={{ color: valueColor }}>{transactionValue.toLocaleString('pt-br', {
                    style: "currency",
                    currency: "BRL"
                })}</p>
            </div>
            <div className="info">
                <span>Categoria: </span>
                <p>{transactions.subcategory.category.categoryName}</p>
            </div>
            <div className="info">
                <span>Subcategoria: </span>
                <p>{transactions.subcategory.subcategoryName}</p>
            </div>
            <div className="info">
                <span>Recorrencia: </span>
                <p>{transactions.recurrent ? "Sim" : "Não Consta"}</p>
            </div>
            {transactions.recurrent ?
                <div className="info">
                    <span>Frequencia: </span>
                    <p>{recurrenceFrequency}</p>
                </div> : null}
        </div>
    )
}