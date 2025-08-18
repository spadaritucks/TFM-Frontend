'use client'
import { CategoryResponseDTO } from "@/@types/DTOs/Category/CategoryResponseDTO"
import { SubcategoryResponseDTO } from "@/@types/DTOs/Subcategory/SubcategoryResponseDTO"
import Button from "../button/component"
import { useModal } from "@/context/modal"
import CategorysForm from "../forms/category-form/component"
import SubcategorysForm from "../forms/subcategory-form/component"
import './styles.css'
import { CategoryCounter } from "../category-counter/component"
import { Activity } from "lucide-react"
import { TransactionsSubcategoriesAmount } from "@/@types/DTOs/Transactions/TransactionsAmountBySubcategory"
import dayjs from "dayjs"
import PieChartComponent from "../piechart/component"
import { useMemo } from "react"



interface CategoriesContentProps {
    categories: CategoryResponseDTO[]
    subcategories: SubcategoryResponseDTO[]
    subcategoriesAmount: TransactionsSubcategoriesAmount[]
    userId: string
}


export default function CategoriesContent({ categories, subcategories, userId, subcategoriesAmount }: CategoriesContentProps) {

    const { openModal } = useModal()

    const currentDate = dayjs().format("MMMM [/] YYYY")

    const expense = useMemo(()=>{
        return subcategoriesAmount
        .filter(item => item.transactionType === 'EXPENSE' && item.amount > 0)
        .map((item, index) => ({
            id: index,
            value: item.amount,
            label: item.subcategoryName
        }))

    },[subcategoriesAmount])

    const income = useMemo(() => {
        return subcategoriesAmount
            .filter(item => item.transactionType === 'INCOME' && item.amount > 0)
            .map((item, index) => ({
                id: index,
                value: item.amount,
                label: item.subcategoryName
            }))
    },[subcategoriesAmount])

    // Calcula os totais usando useMemo para evitar recálculos desnecessários
    const expenseTotal = useMemo(() => {
        return subcategoriesAmount
            .filter(item => item.transactionType === 'EXPENSE' && item.amount > 0)
            .reduce((sum, item) => sum + item.amount, 0);
    }, [subcategoriesAmount]);

    const incomeTotal = useMemo(() => {
        return subcategoriesAmount
            .filter(item => item.transactionType === 'INCOME' && item.amount > 0)
            .reduce((sum, item) => sum + item.amount, 0);
    }, [subcategoriesAmount]);

    // Funções reutilizáveis para formatação de porcentagem
    const formatExpensePercentage = (value: { value: number }) => {
        const percentage = ((value.value / expenseTotal) * 100).toFixed(1);
        return `${percentage}%`;
    };

    const formatIncomePercentage = (value: { value: number }) => {
        const percentage = ((value.value / incomeTotal) * 100).toFixed(1);
        return `${percentage}%`;
    };

    return (
        <div className="categories-container">

            <div className="categories-header">
                <h1>Categorias</h1>
                <div className="categories-header-buttons">
                    <Button name="Cadastrar Categoria" variant="success" onClick={() => openModal("Cadastrar Categoria",
                        <CategorysForm
                            userId={userId}
                        />)} />
                    <Button name="Cadastrar Subcategoria" variant="default" onClick={() => openModal("Cadastrar Subcategoria",
                        <SubcategorysForm
                            categories={categories}
                            userId={userId}
                        />)} />
                </div>

            </div>
            <div className="categories-counters">
                <CategoryCounter
                    counter={categories.length}
                    Icon={<Activity color="#00875F" />}
                    title={`N° de Categorias `}
                />
                <CategoryCounter
                    counter={subcategories.length}
                    title={`N° de Subcategorias`}
                    Icon={<Activity color="#1f83a7" />}
                />

            </div>
            <div className="categories-summary">
                <PieChartComponent
                    title={`Despesas | ${currentDate}`}
                    series={[
                        {
                            data: expense
                        },
                    ]}

                />
                <PieChartComponent
                    title={`Despesas em % | ${currentDate}`}
                    series={[
                        {
                            data: expense,
                            valueFormatter: formatExpensePercentage
                        },
                    ]}

                />
                <PieChartComponent
                    title={`Entradas | ${currentDate}`}
                    series={[
                        {
                            data: income
                        },
                    ]}

                />

                <PieChartComponent
                    title={`Entradas em % | ${currentDate}`}
                    series={[
                        {
                            data: income,
                            valueFormatter: formatIncomePercentage
                        },
                    ]}

                />
            </div>
            {/* <div className="categories-list">
                {categories && categories.length > 0 ? categories.map((category, index) => 
                <CategorysItem key={index} categories={category} subcategories={subcategories} />
                )  : <p>Não há categorias encontradas</p>}
            </div> */}

        </div>



    )
}

//Grafico de Pizza que exibe as transações do tipo saida de acordo com a sua categoria