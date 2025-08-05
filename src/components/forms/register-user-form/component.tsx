'use client'

import Input from "@/components/input/component"
import './styles.css'
import Button from "@/components/button/component"
import { useRouter } from "next/navigation"

export default function RegisterForm() {

    const router = useRouter()

    return (
        
        <form action="" className="form">
            <div className="grid-column">
                <Input
                    label="Selecione sua Foto de Perfil"
                    type="file"
                />
            </div>

            <Input
                label="Nome Completo"
                type="text"
                placeholder="Marcelo Oliveira"
            />

            <Input
                label="Email"
                type="email"
                placeholder="jonhdoe@example.com"
            />

            <Input
                label="Salario Mensal"
                type="text"
                placeholder="2000"
            />

            <Input
                label="Telefone"
                type="text"
                placeholder="(11) 99999-9999"
            />

            <Input
                label="Senha"
                type="password"
            />

            <Input
                label="Confirme sua Senha"
                type="password"
            />



            <div className="form-actions grid-column">
                <Button name="Cadastrar-se" variant="default" type="submit" />
                <Button name="Voltar" variant="link" onClick={(() => router.push("/"))} />
            </div>
        </form>
    )
}