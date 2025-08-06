'use client'
import './styles.css'
import { UserResponseDTO } from '@/@types/DTOs/Users/UserResponseDTO'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeftRight, Goal, Home, LayoutDashboard } from 'lucide-react'
import Dropdown from '../dropdown/component'


interface HeaderProps {
    user: UserResponseDTO
}

export default function Header({ user }: HeaderProps) {

    const pathname = usePathname()
    const router = useRouter()

    const username = user.name.split(" ")
    const name = username[0]

    return (
        <header>
            <nav>
                <Link href={'/home'} aria-current={pathname === "/home" ? 'page' : undefined}><Home /> Home</Link>
                <Link href={'/transactions'} aria-current={pathname === "/transactions" ? 'page' : undefined}><ArrowLeftRight /> Transações</Link>
                <Link href={'/goals'} aria-current={pathname === "/goals" ? 'page' : undefined}> <Goal /> Metas</Link>
                <Link href={'/dashboard'} aria-current={pathname === "/dashboard" ? 'page' : undefined}><LayoutDashboard /> Dashboard</Link>
            </nav>
            <Dropdown
                    name={name}
                    itens={[
                        { label: "Editar Usuario", onClick: () => router.push("/edit") },
                        { label: "Logout", onClick: () => null }
                    ]}
                    image={user.userPhoto}
                    actionsName='Ações do Usuario'
                />
        </header>
    )
}