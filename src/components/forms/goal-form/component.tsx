/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Input from "@/components/input/component"
import './styles.css'
import Button from "@/components/button/component"
import { useRouter } from "next/navigation"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Select from "@/components/select/component"
import { CreateGoalService } from "@/services/GoalService"
import { GoalStatus } from "@/@types/Enums/GoalStatus"
import { toast } from "sonner"
import { useEffect } from "react"
import { GoalType } from "@/@types/Enums/GoalType"
import { SubcategoryResponseDTO } from "@/@types/DTOs/Subcategory/SubcategoryResponseDTO"

interface GoalsFormProps {
    userId: string
    subcategories: SubcategoryResponseDTO[]
}



export const createGoalSchema = z.object({
    userId: z.string(),
    subCategoryId: z.string().min(1, "Subcategoria é obrigatória"),
    goalName: z.string().min(1, "Nome da meta é obrigatório"),
    goalType: z.string().min(1, "O Tipo da meta é obriagátorio"),
    targetValue: z.string().min(1, "Valor da meta é obrigatório"),
    startDate: z.string().min(1, "Data inicial é obrigatória"),
    endDate: z.string().min(1, "Data final é obrigatória"),
    goalStatus: z.string(),
});

type GoalsFormdata = z.infer<typeof createGoalSchema>

export default function GoalsForm({ userId, subcategories }: GoalsFormProps) {

    const { handleSubmit, register, formState: { errors, isSubmitting }, setValue } = useForm<GoalsFormdata>({
        resolver: zodResolver(createGoalSchema)
    })

    const router = useRouter()

    useEffect(() => {
        if (userId) {
            setValue("userId", String(userId));
        }
    }, [userId]);

    setValue("goalStatus", GoalStatus.InProgress);

    async function SubmitForm(data: GoalsFormdata) {
        try {
            await CreateGoalService({
                userId: data.userId,
                subCategoryId: data.subCategoryId,
                goalName: data.goalName,
                goalType : data.goalType,
                targetValue: parseFloat(data.targetValue),
                startDate: new Date(data.startDate).toISOString(),
                endDate: new Date(data.endDate).toISOString(),
                goalStatus: data.goalStatus as GoalStatus
            })


            toast.success("Meta registrada com sucesso")
            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message)
        }



    }



    return (

        <form onSubmit={handleSubmit(SubmitForm)} className="form">


            <Select
                label="Subcategoria" defaultValue={"0"}
                {...register("subCategoryId")}
                errorMessage={errors.subCategoryId?.message ? errors.subCategoryId.message : undefined}
            >
                <option value="0" disabled>Selecione</option>
                {subcategories && subcategories.map((subcategory, index) =>
                    <option
                        value={subcategory.id}
                        key={index}
                    >
                        {subcategory.subcategoryName}
                    </option>)}
            </Select>

            <Input
                label="Nome da Meta"
                type="text"
                placeholder="Gastar menos com Uber"
                {...register("goalName")}
                errorMessage={errors.goalName?.message ? errors.goalName.message : undefined}
            />

            <Select
                label="Tipo da Meta"
                defaultValue={"0"}
                {...register("goalType")}
                errorMessage={errors.goalType?.message ? errors.goalType.message : undefined}
            >
                <option value="0">Selecione</option>
                <option value={GoalType.INCOME}>Meta de entrada</option>
                <option value={GoalType.EXPENSE}>Meta de Gastos</option>
            </Select>

            <Input
                label="Valor a ser atingido"
                type="text"
                placeholder="2000"
                {...register("targetValue")}
                errorMessage={errors.targetValue?.message ? errors.targetValue.message : undefined}
            />

            <Input
                label="Data Inicial"
                type="date"
                {...register("startDate")}
                errorMessage={errors.startDate?.message ? errors.startDate.message : undefined}
            />

            <Input
                label="Data Final"
                type="date"
                {...register("endDate")}
                errorMessage={errors.endDate?.message ? errors.endDate.message : undefined}
            />



            <div className="form-actions grid-column">
                <Button name="Cadastrar" variant="default" type="submit" disabled={isSubmitting} />
            </div>
        </form>
    )
}