import { TransactionResponseDTO } from "@/@types/DTOs/Transactions/TransactionResponseDTO"
import { TransactionTypeEnum } from "@/@types/Enums/TransactionTypeEnum"
import dayjs from "dayjs"
import { useMemo } from "react"
import { TransactionsAmountCounter } from "../transactions-amount-counter/component"
import { CircleArrowDown, CircleArrowUp, SquareSigma } from "lucide-react"
import './styles.css'
import Separator from "../separator/component"
import TransactionsItem from "../transaction-item/component"
import Button from "../button/component"
import Input from "../input/component"
import Select from "../select/component"
import { SubcategoryResponseDTO } from "@/@types/DTOs/Subcategory/SubcategoryResponseDTO"

interface TransactionPanel {
    transactions: TransactionResponseDTO[] | undefined
    subcategories: SubcategoryResponseDTO[] | undefined
}


export default function TransactionPanel({ transactions, subcategories }: TransactionPanel) {

    const month = dayjs().format("MMMM")
    const year = dayjs().year()


    const income = useMemo(() => {
        const incomeValues = transactions ?
            transactions.filter(transaction => transaction.transactionType == TransactionTypeEnum.INCOME) : undefined
        const incomeSum = incomeValues ? incomeValues.reduce((acc, curr) => acc + curr.transactionValue, 0) : 0
        return incomeSum
    }, [transactions])

    const expense = useMemo(() => {
        const expenseValues = transactions ?
            transactions.filter(transaction => transaction.transactionType == TransactionTypeEnum.EXPENSE) : undefined
        const expenseSum = expenseValues ? expenseValues.reduce((acc, curr) => acc + curr.transactionValue, 0) : 0
        return expenseSum
    }, [transactions])

    const total = useMemo(() => {
        const transactionsTotal = transactions ? transactions.reduce((acc, curr) => acc + curr.transactionValue, 0) : 0
        return transactionsTotal
    }, [transactions])

    return (
        <div className="panel">
            <div className="panel-content">
                <div className="panel-header">
                    <h2>Transações</h2>
                    <Button variant="default" name="Adicionar transação" />
                </div>

                <div className="summary">
                    <TransactionsAmountCounter
                        counter={income}
                        Icon={<CircleArrowUp color="#00875F" />}
                        title={`Entrada (${month} de ${year})`}
                    />
                    <TransactionsAmountCounter
                        counter={expense}
                        title={`Saida (${month} de ${year})`}
                        Icon={<CircleArrowDown color="#f43f5e" />}
                    />
                    <TransactionsAmountCounter
                        counter={total}
                        title={`Total (${month} de ${year})`}
                        Icon={<SquareSigma color="#3b82f6" />}
                    />
                </div>

                <div className="data-list">
                    <div className="data-list-filters">
                        <div className="filters">
                            <Input type="date" />
                            <Input type="text" placeholder=" Por Valor Minimo" />
                            <Input type="text" placeholder=" Por Valor Maximo" />
                            <Select defaultValue={"0"}> 
                                <option value="0" disabled > Por Subcategoria</option>
                                {subcategories && subcategories.map((subcategory, index) =>
                                    <option
                                        key={index}
                                        value={subcategory.categoryId}>
                                        {subcategory.subcategoryName}
                                    </option>)}
                            </Select>
                            <Button variant="default" name="Filtrar" />
                            <Button variant="destructive" name="Limpar" />
                        </div>
                    </div>
                    <div className="itens-container">
                        {transactions && transactions.length > 0 ? transactions.map((transaction, index) =>
                            <TransactionsItem
                                transactions={transaction}
                                subcategory="Compra"
                                key={index}
                            />) : <p>Não há transações nesses mês</p>}
                    </div>
                </div>
            </div>

        </div>




    )
}