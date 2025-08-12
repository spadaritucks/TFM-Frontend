import { GoalContentDTO } from "@/@types/DTOs/Goals/GoalResponseDTO"
import './styles.css'

interface GoalsItem {
    goals: GoalContentDTO
}

export default function GoalsItem({ goals }: GoalsItem) {



    return (
        <div className="goal-item-container">
            <div className="goal-item-header">
                <span>{goals.goalName}</span>
                <p>{goals.targetValue.toLocaleString('pt-br', {
                    style: "currency",
                    currency: "BRL"
                })}</p>
            </div>
            <div className="goal-item-content">
                <span>{goals.subcategory.subcategoryName}</span>
                <p> Expira em : {new Date(goals.endDate).toLocaleDateString("pt-br")}</p>
            </div>
        </div>
    )
}