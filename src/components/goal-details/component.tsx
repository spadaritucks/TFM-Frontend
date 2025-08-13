import "./styles.css"
import dayjs from "dayjs"
import { GoalContentDTO } from "@/@types/DTOs/Goals/GoalResponseDTO"
import { GoalType } from "@/@types/Enums/GoalType"

interface GoalsDetailsProps {
    goals: GoalContentDTO
}

export default function GoalDetails({ goals }: GoalsDetailsProps) {

    const goalType = goals.goalType === GoalType.INCOME ? "Entrada de Valores" :
        goals.goalType === GoalType.EXPENSE ? "Limite de gastos" : null

    const startDate = dayjs(new Date(goals.startDate)).format("DD [de] MMMM [de] YYYY ")

    const endDate = dayjs(new Date(goals.startDate)).format("DD [de] MMMM [de] YYYY ")

    return (
        <div className="goal-details">
            <div className="info">
                <span>Nome da Meta: </span>
                <p>{goals.goalName}</p>
            </div>
            <div className="info">
                <span>Tipo da meta: </span>
                <p>{goalType}</p>
            </div>
            <div className="info">
                <span>Valor da Meta : </span>
                <p>{goals.targetValue.toLocaleString('pt-br', {
                    style: "currency",
                    currency: "BRL"
                })}</p>
            </div>
            <div className="info">
                <span>Categoria: </span>
                <p>{goals.subcategory.category.categoryName}</p>
            </div>
            <div className="info">
                <span>Subcategoria: </span>
                <p>{goals.subcategory.subcategoryName}</p>
            </div>
            <div className="info">
                <span>Data de Inicio: </span>
                <p>{startDate}</p>
            </div>
            <div className="info">
                <span>Data Final: </span>
                <p>{endDate}</p>
            </div>

        </div>
    )
}