'use client'
import Image from 'next/image'
import Logo2 from '../../../public/tfm-logo-2.png'
import { ArrowLeftRight, Goal, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import './styles.css'

export default function SideBar() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const sideBarParam = searchParams.get("sideBar")
    const isOpen = sideBarParam !== "false" // Por padrão, a sidebar está aberta

    return (
        <div className={`side-bar-container ${!isOpen ? "close" : ""}`}>
            <div className="side-bar-header">
                <div className="side-bar-header-title">
                    <Image src={Logo2} alt="" width={207.2} />
                    <p>Gestão Financeira | Praticidade | Metas | Dashboard</p>
                </div>
            </div>
            <div className="side-bar-content">
                <Link href={'/transactions'} aria-current={pathname === "/transactions" ? 'page' : undefined}><ArrowLeftRight /> Transações</Link>
                <Link href={'/goals'} aria-current={pathname === "/goals" ? 'page' : undefined}> <Goal /> Metas</Link>
                <Link href={'/categories'} aria-current={pathname === "/categories" ? 'page' : undefined}><LayoutDashboard /> Categories</Link>
            </div>
        </div>
    )
}