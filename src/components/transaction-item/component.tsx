import { TransactionsContentDTO } from "@/@types/DTOs/Transactions/TransactionResponseDTO"
import './styles.css'
import { TransactionTypeEnum } from "@/@types/Enums/TransactionTypeEnum"

interface TransactionsItem {
    transactions: TransactionsContentDTO
}

export default function TransactionsItem({ transactions }: TransactionsItem) {

    const transactionValue = transactions.transactionType === TransactionTypeEnum.INCOME ?
        transactions.transactionValue : - transactions.transactionValue

    const valueColor = transactions.transactionType === TransactionTypeEnum.INCOME ?
    "#00875F" : "#f43f5e"

    return (
        <div className="transaction-item-container">
            <div className="transaction-item-header">
                <span>{transactions.description}</span>
                <p style={{color : valueColor}}>{transactionValue.toLocaleString('pt-br', {
                    style: "currency",
                    currency: "BRL"
                })}</p>
            </div>
            <div className="transaction-item-content">
                <span>{transactions.subcategory.subcategoryName}</span>
                <p>{new Date(transactions.transactionDate).toLocaleDateString("pt-br")}</p>
            </div>
        </div>
    )
}