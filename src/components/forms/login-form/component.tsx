'use client'

import Input from "@/components/input/component"
import './styles.css'
import Button from "@/components/button/component"
import { useRouter } from "next/navigation"

export default function LoginForm() {

    const router = useRouter()

    return (
        <form action="" className="form">
            <Input
                label="Email"
                type="email"
                placeholder="jonhdoe@example.com"
            />


            <div className="form-password">
                <Input
                    label="Senha"
                    type="password"
                />
                <Button name="Esqueci a minha senha" variant="link" />
            </div>
            <div className="form-actions">
                <Button name="Entrar" variant="default" type="submit" />
                <Button name="Criar a sua conta" variant="link" onClick={(() => router.push("/register"))} />
            </div>
        </form>
    )
}