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
import { TransactionTypeEnum } from "@/@types/Enums/TransactionTypeEnum"
import { RecurrenceFrequency } from "@/@types/Enums/RecurrenceFrequency"
import { CreateTransactionService } from "@/services/TransactionService"
import { toast } from "sonner"
import { useEffect } from "react"
import Textarea from "@/components/textarea/component"
import { SubcategoryContentDTO } from "@/@types/DTOs/Subcategory/SubcategoryResponseDTO"

interface TransactionsFormProps {
    userId: string
    subcategories: SubcategoryContentDTO[]
}



export const transactionSchema = z.object({
    userId: z.string(),
    subCategoryId: z.string({ message: "Subcategoria é obrigatório" }),
    transactionType: z.string({ message: "Tipo de transação é obrigatório" }), // pode virar enum depois: INCOME, EXPENSE etc.
    transactionValue: z.string({ message: "Valor da transação é obrigátorio" }),
    description: z.string({ message: "Descrição é obrigatória" }),
    transactionDate: z.string(),
    recurrent: z.string(),
    transactionStatus: z.string(),
    recurrenceFrequency: z.string({ message: "A frequencia do pagamento é obrigatória" }) // pode virar enum depois: PENDING, COMPLETED etc.
});

type TransactionsFormdata = z.infer<typeof transactionSchema>

export default function TransactionsForm({ userId, subcategories }: TransactionsFormProps) {

    const { handleSubmit, register, formState: { errors, isSubmitting }, watch, setValue } = useForm<TransactionsFormdata>({
        resolver: zodResolver(transactionSchema)
    })
    const recurrent = watch("recurrent")
    const router = useRouter()

    useEffect(() => {
        if (userId) {
            setValue("userId", String(userId));
        }
    }, [userId]);

    async function SubmitForm(data: TransactionsFormdata) {
        try {
            await CreateTransactionService({
                userId: data.userId,
                subCategoryId: data.subCategoryId,
                transactionType: data.transactionType as TransactionTypeEnum,
                transactionValue: parseFloat(data.transactionValue),
                description: data.description,
                transactionDate: new Date(data.transactionDate).toISOString(),
                recurrent: data.recurrent == "true" ? true : false,
                recurrenceFrequency: data.recurrenceFrequency as RecurrenceFrequency
            })


            toast.success("Transação registrada com sucesso")
            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message)
        }



    }

    

    return (

        <form action="" onSubmit={handleSubmit(SubmitForm)} className="form">


            <Select label="Tipo da Transação" defaultValue={"0"} {...register("transactionType")}>
                <option value="0" disabled>Selecione</option>
                <option value={TransactionTypeEnum.INCOME}>Entrada</option>
                <option value={TransactionTypeEnum.EXPENSE}>Saida</option>
            </Select>

            <Select label="Subcategoria" defaultValue={"0"} {...register("subCategoryId")}>
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
                label="Valor da Transação"
                type="text"
                placeholder="3000"
                {...register("transactionValue")}
            />

            <Input
                label="Data da Transação"
                type="date"
                {...register("transactionDate")}
            />

            <div className="grid-column">
                <Textarea
                    label="Descrição"
                    placeholder="Pagamento do Uber"
                    rows={4} cols={16}
                    {...register("description")}
                />
            </div>

            <Select label="Recorrencia" defaultValue={"0"} {...register("recurrent")}>
                <option value="0" disabled>Selecione </option>
                <option value="true" >Sim</option>
                <option value="false">Não</option>
            </Select>

            {recurrent &&
                <Select label="Frequencia de Recorrencia" defaultValue={"0"} {...register("recurrenceFrequency")}>
                    <option value="0" disabled >Selecione </option>
                    <option value={RecurrenceFrequency.DAILY} >Diario</option>
                    <option value={RecurrenceFrequency.WEEKLY} >Semanal</option>
                    <option value={RecurrenceFrequency.MONTHLY} >Mensal</option>
                    <option value={RecurrenceFrequency.YEARLY} >Anual</option>
                </Select>
            }

            <div className="form-actions grid-column">
                <Button name="Cadastrar" variant="default" type="submit" disabled={isSubmitting} />
            </div>
        </form>
    )
}