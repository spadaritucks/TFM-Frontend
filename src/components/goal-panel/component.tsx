"use client"
import { GoalResponseDTO } from "@/@types/DTOs/Goals/GoalResponseDTO"
import { useState } from "react"
import './styles.css'
import GoalsItem from "../goal-item/component"
import Button from "../button/component"
import Input from "../input/component"
import Select from "../select/component"
import { SubcategoryResponseDTO } from "@/@types/DTOs/Subcategory/SubcategoryResponseDTO"
import { Pagination } from "../pagination/component"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import z from "zod"
import { useModal } from "@/context/modal"
import GoalsForm from "../forms/goal-form/component"
import { GoalStatus } from "@/@types/Enums/GoalStatus"
import { GoalsCounter } from "../goal-counter/component"
import { GoalCountDTO } from "@/@types/DTOs/Goals/GoalCountDTO"
import { CircleArrowDown, CircleArrowUp, SquareSigma } from "lucide-react"


interface GoalPanel {
    goals: GoalResponseDTO
    subcategories: SubcategoryResponseDTO[]
    userId: string
    goalsCount: GoalCountDTO

}



export default function GoalPanel({ goals, subcategories, userId, goalsCount }: GoalPanel) {


    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const params = new URLSearchParams(searchParams.toString())


    const [goalStatus, setGoalStatus] = useState<string | null>(null)
    const [goalName, setGoalName] = useState<string | null>(null)
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
        if (goalStatus) params.set("goalStatus", goalStatus)
        if (goalName) params.set("goalName", goalName)
        if (subcategory) params.set("subcategory", subcategory)
        router.replace(`${pathname}?${params.toString()}`)
    }

    function clearFilters() {
        params.delete("goalStatus")
        params.delete("goalName")
        params.delete("subcategory")

        setGoalStatus("")
        setGoalName("")
        setSubcategory(null)
        router.push("?" + params.toString());
    }


    const { openModal } = useModal()

    return (
        <div className="panel">
            <div className="panel-content">
                <div className="panel-header">
                    <h2>Metas</h2>
                    <Button variant="default" name="Adicionar Meta"
                        onClick={() => openModal("Cadastrar Metas", <GoalsForm userId={userId} subcategories={subcategories} />)} />
                </div>

                <div className="summary">
                    <GoalsCounter
                        counter={goalsCount.inProgress}
                        Icon={<CircleArrowUp color="#00875F" />}
                        title={`Em Progresso `}
                    />
                    <GoalsCounter
                        counter={goalsCount.completed}
                        title={`Completas`}
                        Icon={<CircleArrowDown color="#f43f5e" />}
                    />
                    <GoalsCounter
                        counter={goalsCount.expired}
                        title={`Expirada `}
                        Icon={<SquareSigma color="#3b82f6" />}
                    />
                </div>

                <div className="data-list">
                    <div className="data-list-filters">
                        <div className="filters">
                            <Input
                                type="text"
                                placeholder="Nome da Meta"
                                value={goalName ?? ""}
                                onChange={(e) => setGoalName(e.target.value)}
                            />
                            <Select
                                onChange={(e) => setGoalStatus(e.target.value)}
                                value={goalStatus ?? "0"}
                            >
                                <option value="0" disabled >Por Status</option>
                                <option value={GoalStatus.InProgress}>Em Progresso</option>
                                <option value={GoalStatus.Completed}>Completa</option>
                                <option value={GoalStatus.Expired}>Expirado</option>
                            </Select>
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
                            <div className="filters-buttons">
                                <Button variant="default" name="Filtrar" onClick={filters} />
                                <Button variant="destructive" name="Limpar" onClick={clearFilters} />
                            </div>
                        </div>
                    </div>
                    <div className="itens-container">
                        {goals.content && goals.content.length > 0 ? goals.content.map((goal) =>
                            <GoalsItem
                                goals={goal}
                                key={goal.id}
                            />) : <p>Metas não encontradas</p>}
                    </div>
                    <Pagination
                        page={page}
                        size={goals.size}
                        totalElements={goals.totalElements}
                        onPageChange={Paginate}
                    />

                </div>
            </div>


        </div>




    )
}