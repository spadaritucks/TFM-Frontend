'use client'

import Input from "@/components/input/component"
import './styles.css'
import Button from "@/components/button/component"
import { useRouter } from "next/navigation"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SendResetCodeService } from "@/services/PasswordResetService"
import { toast } from "sonner"

const sendCodeSchema = z.object({
    email: z.string({ message: "O email é obrigatório" }).email({ message: "Insira um email válido" }),
})

type SendCodeFormData = z.infer<typeof sendCodeSchema>

export default function SendCodeForm() {
    const router = useRouter()

    const { handleSubmit, register, formState: { isSubmitting } } = useForm<SendCodeFormData>({
        resolver: zodResolver(sendCodeSchema)
    })

    async function submitSendCode(data: SendCodeFormData) {
        try {
            await SendResetCodeService({
                email: data.email
            })
            
            // Armazenar email no sessionStorage para as próximas etapas
            sessionStorage.setItem('resetEmail', data.email)
            
            toast.success("Código enviado para seu email!")
            router.push("/reset-password/verify-code")

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(submitSendCode)} className="send-code-form">
            <Input
                label="Email"
                type="email"
                placeholder="jonhdoe@example.com"
                {...register("email")}
            />

            <div className="form-actions">
                <Button 
                    name="Enviar Código" 
                    variant="default" 
                    type="submit" 
                    disabled={isSubmitting} 
                />
                <Button 
                    name="Voltar ao Login" 
                    type="button" 
                    variant="link" 
                    onClick={() => router.push("/")} 
                />
            </div>
        </form>
    )
}
