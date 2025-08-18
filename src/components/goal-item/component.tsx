import { GoalContentDTO } from "@/@types/DTOs/Goals/GoalResponseDTO"
import './styles.css'
import GoalDetails from "../goal-details/component"
import { useModal } from "@/context/modal"

interface GoalsItem {
    goals: GoalContentDTO
}

export default function GoalsItem({ goals }: GoalsItem) {

    const { openModal } = useModal()

    return (
        <div className="goal-item-container" onClick={() => openModal("Detalhes da Transação",
            <GoalDetails
                goals={goals}
            />
        )}>
            <div className="goal-item-header">
                <span className="goal-item-title">{goals.goalName}</span>
                <p className="goal-item-targetValue">{goals.targetValue.toLocaleString('pt-br', {
                    style: "currency",
                    currency: "BRL"
                })}/ <span className="goal-item-currentValue">{goals.currentAmount.toLocaleString('pt-br', {
                    style: "currency",
                    currency: "BRL"
                }) || 0}</span> </p>
            </div>
            <div className="goal-item-content">
                <span>{goals.subcategory.subcategoryName}</span>
                <p> Expira em : {new Date(goals.endDate).toLocaleDateString("pt-br")}</p>
            </div>
        </div>
    )
}