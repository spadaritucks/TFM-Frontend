'use client'

import Input from "@/components/input/component"
import './styles.css'
import Button from "@/components/button/component"
import { useRouter } from "next/navigation"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { VerifyCodeService } from "@/services/PasswordResetService"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const verifyCodeSchema = z.object({
    code: z.string({ message: "O código é obrigatório" })
        .regex(/^[0-9]{6}$/, { message: "O código deve conter exatamente 6 dígitos" }),
})

type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>

export default function VerifyCodeForm() {
    const router = useRouter()
    const [email, setEmail] = useState<string>("")

    const { handleSubmit, register, formState: { isSubmitting } } = useForm<VerifyCodeFormData>({
        resolver: zodResolver(verifyCodeSchema)
    })

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('resetEmail')
        if (!storedEmail) {
            toast.error("Email não encontrado. Reinicie o processo.")
            router.push("/reset-password/send-code")
            return
        }
        setEmail(storedEmail)
    }, [router])

    async function submitVerifyCode(data: VerifyCodeFormData) {
        try {
            await VerifyCodeService({
                email: email,
                code: data.code
            })

            // Armazenar código no sessionStorage para a próxima etapa
            sessionStorage.setItem('resetCode', data.code)

            toast.success("Código verificado com sucesso!")
            router.push("/reset-password/new-password")

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    if (!email) {
        return <div>Carregando...</div>
    }

    return (
        <form onSubmit={handleSubmit(submitVerifyCode)} className="verify-code-form">
            <div className="email-info">
                <p>Código enviado para: <strong>{email}</strong></p>
            </div>

            <Input
                label="Código de Verificação"
                type="text"
                placeholder="123456"
                maxLength={6}
                {...register("code")}
            />

            <div className="form-actions">
                <Button
                    name="Verificar Código"
                    variant="default"
                    type="submit"
                    disabled={isSubmitting}
                />
                <Button
                    name="Voltar"
                    type="button"
                    variant="link"
                    onClick={() => router.push("/reset-password/send-code")}
                />
            </div>
        </form>
    )
}
