/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Input from "@/components/input/component"
import './styles.css'
import Button from "@/components/button/component"
import { useRouter } from "next/navigation"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateCategoryService } from "@/services/CategoryService"
import { toast } from "sonner"

interface CategorysFormProps {
    userId: string
}



export const createCategorySchema = z.object({
    categoryName: z.string().min(1, "Nome da categoria é obrigatório")
});

type CategorysFormdata = z.infer<typeof createCategorySchema>

export default function CategorysForm({ userId }: CategorysFormProps) {

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<CategorysFormdata>({
        resolver: zodResolver(createCategorySchema)
    })

    const router = useRouter()
    
    async function SubmitForm(data: CategorysFormdata) {
        try {
            await CreateCategoryService({
                categoryName: data.categoryName
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

            <Input
                label="Nome da Categoria"
                type="text"
                placeholder="Alimentação"
                {...register("categoryName")}
                errorMessage={errors.categoryName?.message ? errors.categoryName.message : undefined}
            />

            <div className="form-actions grid-column">
                <Button name="Cadastrar" variant="default" type="submit" disabled={isSubmitting} />
            </div>
        </form>
    )
}