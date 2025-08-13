import { GoalContentDTO } from "@/@types/DTOs/Goals/GoalResponseDTO"
import './styles.css'
import GoalDetails from "../goal-details/component"
import { useModal } from "@/context/modal"

interface GoalsItem {
    goals: GoalContentDTO
}

export default function GoalsItem({ goals }: GoalsItem) {

    const {openModal} = useModal()

    return (
        <div className="goal-item-container"  onClick={() => openModal("Detalhes da Transação",
            <GoalDetails
                goals={goals}
            />
        )}>
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