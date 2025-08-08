"use client"
import { TransactionResponseDTO } from "@/@types/DTOs/Transactions/TransactionResponseDTO"
import { TransactionTypeEnum } from "@/@types/Enums/TransactionTypeEnum"
import dayjs from "dayjs"
import { useMemo } from "react"
import { TransactionsAmountCounter } from "../transactions-amount-counter/component"
import { CircleArrowDown, CircleArrowUp, SquareSigma } from "lucide-react"
import './styles.css'
import TransactionsItem from "../transaction-item/component"
import Button from "../button/component"
import Input from "../input/component"
import Select from "../select/component"
import { SubcategoryResponseDTO } from "@/@types/DTOs/Subcategory/SubcategoryResponseDTO"
import { Pagination } from "../pagination/component"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import z from "zod"
import { useModal } from "@/context/modal"
import TransactionsForm from "../forms/transaction-form/component"

interface TransactionPanel {
    transactions: TransactionResponseDTO
    subcategories: SubcategoryResponseDTO
    userId : string
}



export default function TransactionPanel({ transactions, subcategories, userId }: TransactionPanel) {

    const month = dayjs().format("MMMM")
    const year = dayjs().year()
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const page = z.coerce
        .number()
        .transform(page => page - 1)
        .parse(searchParams.get('page') ?? "1")

    const income = useMemo(() => {
        const incomeValues = transactions.content ?
            transactions.content.filter(transaction => transaction.transactionType == TransactionTypeEnum.INCOME) : undefined
        const incomeSum = incomeValues ? incomeValues.reduce((acc, curr) => acc + curr.transactionValue, 0) : 0
        return incomeSum
    }, [transactions])

    const expense = useMemo(() => {
        const expenseValues = transactions.content ?
            transactions.content.filter(transaction => transaction.transactionType == TransactionTypeEnum.EXPENSE) : undefined
        const expenseSum = expenseValues ? expenseValues.reduce((acc, curr) => acc + curr.transactionValue, 0) : 0
        return expenseSum
    }, [transactions])

    const total = useMemo(() => {
        const transactionsTotal = transactions.content ? transactions.content.reduce((acc, curr) => acc + curr.transactionValue, 0) : 0
        return transactionsTotal
    }, [transactions])

    function Paginate(newPage : number) {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", (newPage + 1).toString())
        router.replace(`${pathname}?${params.toString()}`)

    }

    const {openModal} = useModal()

    return (
        <div className="panel">
            <div className="panel-content">
                <div className="panel-header">
                    <h2>Transações</h2>
                    <Button variant="default" name="Adicionar transação" 
                    onClick={() => openModal("Cadastrar Transação", <TransactionsForm userId={userId} subcategories={subcategories.content}/>)  } />
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
                            <Input type="text" placeholder="Por Valor Minimo" />
                            <Input type="text" placeholder="Por Valor Maximo" />
                            <Select defaultValue={"0"}>
                                <option value="0" disabled > Por Subcategoria</option>
                                {subcategories.content && subcategories.content.map((subcategory, index) =>
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
                        {transactions.content && transactions.content.length > 0 ? transactions.content.map((transaction, index) =>
                            <TransactionsItem
                                transactions={transaction}
                                subcategory="Compra"
                                key={index}
                            />) : <p>Não há transações nesses mês</p>}
                    </div>
                    <Pagination
                        page={page}
                        size={transactions.size}
                        totalElements={transactions.totalElements}
                        onPageChange={Paginate}
                    />

                </div>
            </div>


        </div>




    )
}