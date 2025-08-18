'use client'
import './styles.css'
import { UserResponseDTO } from '@/@types/DTOs/Users/UserResponseDTO'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Dropdown from '../dropdown/component'
import { useLogout } from '@/utils/UseLogout'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
    user: UserResponseDTO
}

export default function Header({ user }: HeaderProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const username = user.name.split(" ")
    const name = username[0]

    async function Logout() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        await useLogout()
    }

    const sideBarParam = searchParams.get("sideBar")
    const isOpen = sideBarParam !== "false" // Por padrão, a sidebar está aberta

    function handleToggleSidebar() {
        const newSideBarState = isOpen ? "false" : "true"
        const params = new URLSearchParams(searchParams.toString())
        params.set("sideBar", newSideBarState)
        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <header>
            <Menu width={35} height={35} color='#1f83a7' onClick={handleToggleSidebar}/>
            <Dropdown
                name={name}
                itens={[
                    { label: "Editar Usuario", onClick: () => router.push("/edit") },
                    { label: "Logout", onClick: async () => Logout() }
                ]}
                image={user.userPhoto}
                actionsName='Ações do Usuario'
            />
        </header>
    )
}