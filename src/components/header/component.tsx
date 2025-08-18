'use client'
import './styles.css'
import { UserResponseDTO } from '@/@types/DTOs/Users/UserResponseDTO'
import { useRouter } from 'next/navigation'
import Dropdown from '../dropdown/component'
import { useLogout } from '@/utils/UseLogout'


interface HeaderProps {
    user: UserResponseDTO
}

export default function Header({ user }: HeaderProps) {
    const router = useRouter()

    const username = user.name.split(" ")
    const name = username[0]

    async function Logout() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        await useLogout()
    }

    return (
        <header>
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