/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Input from "@/components/input/component"
import './styles.css'
import Button from "@/components/button/component"
import { useRouter } from "next/navigation"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateSubcategoryService } from "@/services/SubcategoryService"
import { toast } from "sonner"
import Select from "@/components/select/component"
import { CategoryResponseDTO } from "@/@types/DTOs/Category/CategoryResponseDTO"

interface SubcategorysFormProps {
    userId: string
    categories : CategoryResponseDTO[]
}



export const createSubcategorySchema = z.object({
    categoryId: z.string().min(1, "Categoria é obrigatória"),
    subcategoryName: z.string().min(1, "Nome da categoria é obrigatório")
});

type SubcategorysFormdata = z.infer<typeof createSubcategorySchema>

export default function SubcategorysForm({ userId, categories }: SubcategorysFormProps) {

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<SubcategorysFormdata>({
        resolver: zodResolver(createSubcategorySchema)
    })

    const router = useRouter()

    async function SubmitForm(data: SubcategorysFormdata) {
        try {
            await CreateSubcategoryService({
                categoryId: data.categoryId,
                subcategoryName: data.subcategoryName
            }, userId)


            toast.success("Categoria registrada com sucesso")
            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message)
        }



    }



    return (

        <form onSubmit={handleSubmit(SubmitForm)} className="form">


            <Select
                label="Categoria"
                defaultValue={"0"}
                {...register("categoryId")}
            >
                <option value="0" selected>Selecione</option>
                {categories.map((category, index) => <option key={index} value={category.id}>{category.categoryName}</option>)}
            </Select>

            <Input
                label="Nome da Subcateogira"
                type="text"
                placeholder="Alimentação"
                {...register("subcategoryName")}
                errorMessage={errors.subcategoryName?.message ? errors.subcategoryName.message : undefined}
            />

            <div className="form-actions grid-column">
                <Button name="Cadastrar" variant="default" type="submit" disabled={isSubmitting} />
            </div>
        </form>
    )
}