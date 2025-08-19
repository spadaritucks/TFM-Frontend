'use client'

import Input from "@/components/input/component"
import './styles.css'
import Button from "@/components/button/component"
import { useRouter } from "next/navigation"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUserService } from "@/services/UserService"



const registerUserSchema = z.object({
    userPhoto: z.any()
        .refine((file) => file?.[0]?.type?.startsWith("image/"), {
            message: "O arquivo deve ser uma imagem"
        })
        .refine((file) => file?.[0]?.size <= 5 * 1024 * 1024, {
            message: "A imagem deve ter no máximo 5MB"
        }),
    name: z.string({ message: "O nome é obrigatório" })
        .min(2, "O nome deve ter no mínimo 2 caracteres")
        .max(100, "O nome deve ter no máximo 100 caracteres"),

    email: z.string({ message: "O email é obrigatório" })
        .email({ message: "Insira um email valido" }),

    phone: z.string({ message: "O telefone é obrigatório" })
        .regex(
            /^\(\d{2}\) \d{5}-\d{4}$/,
            "Telefone deve estar no formato (11) 99999-9999"
        ),

    monthlyIncome: z.string({ message: "O salario é obrigatório" }),

    password: z.string({ message: "A senha é obrigatória" })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "A senha deve conter no mínimo 8 caracteres, com ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
        ),
    confirm_password: z.string({ message: "A confirmação da senha é obrigatória" })
})

type RegisterFormdata = z.infer<typeof registerUserSchema>

export default function RegisterForm() {

    const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm<RegisterFormdata>({
        resolver: zodResolver(registerUserSchema)
    })

    async function SubmitForm(data: RegisterFormdata) {
        try {
            if (!(data.password === data.confirm_password)) {
                return alert("As duas senhas não correspondem")
            }

            const formdata = new FormData()
            formdata.append("userPhoto", data.userPhoto)
            formdata.append("name", data.name)
            formdata.append("email", data.email)
            formdata.append("phone", data.phone)
            formdata.append("monthlyIncome", data.monthlyIncome)
            formdata.append("password", data.password)

            await CreateUserService(formdata)


            alert("Usuario criado com sucesso")
            return router.push("/")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            alert(error.message)
        }



    }

    const router = useRouter()

    return (

        <form action="" onSubmit={handleSubmit(SubmitForm)} className="register-form">
            <div className="grid-column">
                <Input
                    label="Selecione sua Foto de Perfil"
                    type="file"
                    {...register("userPhoto")}
                />
            </div>

            <Input
                label="Nome Completo"
                type="text"
                placeholder="Marcelo Oliveira"
                {...register("name")}
                errorMessage={errors.name?.message ? errors.name.message : undefined}
            />

            <Input
                label="Email"
                type="email"
                placeholder="jonhdoe@example.com"
                {...register("email")}
                errorMessage={errors.email?.message ? errors.email.message : undefined}
                
            />

            <Input
                label="Salario Mensal"
                type="text"
                placeholder="2000"
                {...register("monthlyIncome")}
                errorMessage={errors.monthlyIncome?.message ? errors.monthlyIncome.message : undefined}
            />

            <Input
                label="Telefone"
                type="text"
                placeholder="(11) 99999-9999"
                {...register("phone")}
                errorMessage={errors.phone?.message ? errors.phone.message : undefined}
            />

            <Input
                label="Senha"
                type="password"
                {...register("password")}
                errorMessage={errors.password?.message ? errors.password.message : undefined}
            />

            <Input
                label="Confirme sua Senha"
                type="password"
                {...register("confirm_password")}
                errorMessage={errors.confirm_password?.message ? errors.confirm_password.message : undefined}
            />



            <div className="register-form-actions grid-column">
                <Button name="Cadastrar-se" variant="default" type="submit" disabled={isSubmitting} />
                <Button name="Voltar" variant="link" type="button" onClick={(() => router.push("/"))} />
            </div>
        </form>
    )
}