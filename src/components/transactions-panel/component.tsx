"use client"
import { TransactionResponseDTO } from "@/@types/DTOs/Transactions/TransactionResponseDTO"
import dayjs from "dayjs"
import { useMemo, useState } from "react"
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
import { TransactionAmountDTO } from "@/@types/DTOs/Transactions/TransactionAmountDTO"

interface TransactionPanel {
    transactions: TransactionResponseDTO
    subcategories: SubcategoryResponseDTO[]
    userId: string
    amount : TransactionAmountDTO
}



export default function TransactionPanel({ transactions, subcategories, userId, amount }: TransactionPanel) {

    const month = dayjs().format("MMMM")
    const year = dayjs().year()
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const params = new URLSearchParams(searchParams.toString())

    const [transactionDate, setTransactionDate] = useState<string | null>(null)
    const [maxValue, setMaxValue] = useState<string | null>(null)
    const [minValue, setMinValue] = useState<string | null>(null)
    const [subcategory, setSubcategory] = useState<string | null>(null)


    const page = z.coerce
        .number()
        .transform(page => page - 1)
        .safeParse(searchParams.get('page') ?? "1").data ?? 0



    function Paginate(newPage: number) {
        params.set("page", (newPage + 1).toString())
        router.replace(`${pathname}?${params.toString()}`)

    }

    function filters() {
        if (transactionDate) params.set("transactionDate", transactionDate)
        if (maxValue) params.set("maxValue", maxValue)
        if (minValue) params.set("minValue", minValue)
        if (subcategory) params.set("subcategory", subcategory)
        router.replace(`${pathname}?${params.toString()}`)
    }

    function clearFilters() {
        params.delete("transactionDate")
        params.delete("maxValue")
        params.delete("minValue")
        params.delete("subcategory")

        setTransactionDate("")
        setMaxValue("")
        setMinValue("")
        setSubcategory(null)
        router.push("?" + params.toString());
    }



    const { openModal } = useModal()

    return (
        <div className="transaction-panel">
            <div className="transaction-panel-content">
                <div className="transaction-panel-header">
                    <h2>Transações</h2>
                    <Button variant="default" name="Adicionar transação"
                        onClick={() => openModal("Cadastrar Transação", <TransactionsForm userId={userId} subcategories={subcategories} />)} />
                </div>

                <div className="transaction-summary">
                    <TransactionsAmountCounter
                        counter={amount.income}
                        Icon={<CircleArrowUp color="#00875F" />}
                        title={`Entrada (${month} de ${year})`}
                    />
                    <TransactionsAmountCounter
                        counter={amount.expense}
                        title={`Saida (${month} de ${year})`}
                        Icon={<CircleArrowDown color="#f43f5e" />}
                    />
                    <TransactionsAmountCounter
                        counter={amount.total}
                        title={`Total (${month} de ${year})`}
                        Icon={<SquareSigma color="#3b82f6" />}
                    />
                </div>

                <div className="transaction-data-list">
                    <div className="transaction-data-list-filters">
                        <div className="transaction-filters">
                            <Input
                                type="date"
                                value={transactionDate ?? ""}
                                onChange={(e) => setTransactionDate(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Por Valor Minimo"
                                value={minValue ?? ""}
                                onChange={(e) => setMinValue(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Por Valor Maximo"
                                value={maxValue ?? ""}
                                onChange={(e) => setMaxValue(e.target.value)}
                            />
                            <Select
                                onChange={(e) => setSubcategory(e.target.value)}
                                value={subcategory ?? "0"}
                            >
                                <option value="0" disabled >Por Subcategoria</option>
                                {subcategories && subcategories.map((subcategory, index) =>
                                    <option
                                        key={index}
                                        value={subcategory.subcategoryName}>
                                        {subcategory.subcategoryName}
                                    </option>)}
                            </Select>
                            <div className="transaction-filters-buttons">
                                <Button variant="default" name="Filtrar" onClick={filters} />
                                <Button variant="destructive" name="Limpar" onClick={clearFilters} />
                            </div>
                        </div>
                    </div>
                    <div className="transaction-itens-container">
                        {transactions.content && transactions.content.length > 0 ? transactions.content.map((transaction) =>
                            <TransactionsItem
                                transactions={transaction}
                                key={transaction.id}
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