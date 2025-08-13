import { TransactionsContentDTO } from "@/@types/DTOs/Transactions/TransactionResponseDTO"
import './styles.css'
import { TransactionTypeEnum } from "@/@types/Enums/TransactionTypeEnum"
import { useModal } from "@/context/modal"
import TransactionsDetails from "../transaction-details/component"

interface TransactionsItem {
    transactions: TransactionsContentDTO
}

export default function TransactionsItem({ transactions }: TransactionsItem) {

    const transactionValue = transactions.transactionType === TransactionTypeEnum.INCOME ?
        transactions.transactionValue : - transactions.transactionValue

    const valueColor = transactions.transactionType === TransactionTypeEnum.INCOME ?
        "#00875F" : "#f43f5e"




    const { openModal } = useModal()

    return (
        <div className="transaction-item-container" onClick={() => openModal("Detalhes da Transação",

            <TransactionsDetails
                transactions={transactions}
                transactionValue={transactionValue}
                valueColor={valueColor}
            />
        )}>
            <div className="transaction-item-header">
                <span>{transactions.description}</span>
                <p style={{ color: valueColor }}>{transactionValue.toLocaleString('pt-br', {
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