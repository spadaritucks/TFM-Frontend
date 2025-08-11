'use client'

import Input from "@/components/input/component"
import './styles.css'
import Button from "@/components/button/component"
import { useRouter } from "next/navigation"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthService } from "@/services/AuthService"
import { toast } from "sonner"

const loginUserSchema = z.object({
    email: z.string({ message: "O email é obrigatório" }).email({ message: "Insira um email valido" }),
    password: z.string({ message: "A senha é obrigatório" }),
})

type LoginFormdata = z.infer<typeof loginUserSchema>



export default function LoginForm() {

    const router = useRouter()

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<LoginFormdata>({
        resolver: zodResolver(loginUserSchema)
    })

    async function SubmitLogin(data: LoginFormdata) {

        try {
            await AuthService({
                email: data.email,
                password: data.password
            })
            router.push("/home")

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message)
        }

    }

    return (
        <form onSubmit={handleSubmit(SubmitLogin)} className="login-form">
            <Input
                label="Email"
                type="email"
                placeholder="jonhdoe@example.com"
                {...register("email")}
            />


            <div className="form-password">
                <Input
                    label="Senha"
                    type="password"
                    {...register("password")}
                />
                <Button name="Esqueci a minha senha" variant="link" />
            </div>
            <div className="form-actions">
                <Button name="Entrar" variant="default" type="submit" disabled={isSubmitting} />
                <Button name="Criar a sua conta" type="button" variant="link" onClick={(() => router.push("/register"))} />
            </div>
        </form>
    )
}