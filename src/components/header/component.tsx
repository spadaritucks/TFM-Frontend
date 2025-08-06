'use client'
import Image from 'next/image'
import './styles.css'
import { UserResponseDTO } from '@/@types/DTOs/Users/UserResponseDTO'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
    user : UserResponseDTO
}

export default function Header({user} : HeaderProps) {

    const pathname = usePathname()

    return (
        <header>
            <nav>
                <Link href={'/home'} aria-current={pathname === "/home" ? 'page' : undefined}>Home</Link>
                <Link href={'/transactions'} aria-current={pathname === "/transactions" ? 'page' : undefined}>Transações</Link>
                <Link href={'/goals'} aria-current={pathname === "/goals" ? 'page' : undefined}>Metas</Link>
                <Link href={'/dashboard'} aria-current={pathname === "/dashboard" ? 'page' : undefined}>Dashboard</Link>
            </nav>
            <Image width={60} height={60} src={user.userPhoto} className='avatar'  alt=''/>
        </header>
    )
}