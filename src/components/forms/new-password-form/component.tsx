'use client'

import Input from "@/components/input/component"
import './styles.css'
import Button from "@/components/button/component"
import { useRouter } from "next/navigation"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetPasswordService } from "@/services/PasswordResetService"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const newPasswordSchema = z.object({
    newPassword: z.string({ message: "A nova senha é obrigatória" })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "A senha deve conter no mínimo 8 caracteres, com ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
        ),
    confirmPassword: z.string({ message: "A confirmação da senha é obrigatória" })
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
})

type NewPasswordFormData = z.infer<typeof newPasswordSchema>

export default function NewPasswordForm() {
    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [code, setCode] = useState<string>("")

    const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm<NewPasswordFormData>({
        resolver: zodResolver(newPasswordSchema)
    })

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('resetEmail')
        const storedCode = sessionStorage.getItem('resetCode')
        
        if (!storedEmail || !storedCode) {
            toast.error("Dados não encontrados. Reinicie o processo.")
            router.push("/reset-password/send-code")
            return
        }
        
        setEmail(storedEmail)
        setCode(storedCode)
    }, [router])

    async function submitNewPassword(data: NewPasswordFormData) {
        try {
            await ResetPasswordService({
                email: email,
                code: code,
                newPassword: data.newPassword
            })
            
            // Limpar dados do sessionStorage
            sessionStorage.removeItem('resetEmail')
            sessionStorage.removeItem('resetCode')
            
            toast.success("Senha alterada com sucesso!")
            router.push("/")

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    if (!email || !code) {
        return <div>Carregando...</div>
    }

    return (
        <form onSubmit={handleSubmit(submitNewPassword)} className="new-password-form">
            <div className="email-info">
                <p>Redefinindo senha para: <strong>{email}</strong></p>
            </div>

            <Input
                label="Nova Senha"
                type="password"
                {...register("newPassword")}
                errorMessage={errors.newPassword?.message ? errors.newPassword.message : undefined}
            />

            <Input
                label="Confirmar Nova Senha"
                type="password"
                {...register("confirmPassword")}
                errorMessage={errors.confirmPassword?.message ? errors.confirmPassword.message : undefined}
            />

            <div className="form-actions">
                <Button 
                    name="Alterar Senha" 
                    variant="default" 
                    type="submit" 
                    disabled={isSubmitting} 
                />
                <Button 
                    name="Voltar" 
                    type="button" 
                    variant="link" 
                    onClick={() => router.push("/reset-password/verify-code")} 
                />
            </div>
        </form>
    )
}
