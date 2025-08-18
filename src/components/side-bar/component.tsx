'use client'
import Image from 'next/image'
import Logo2 from '../../../public/tfm-logo-2.png'
import { ArrowLeftRight, Goal, LayoutDashboard, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './styles.css'
import Separator from '../separator/component'
import { useState } from 'react'

export default function SideBar() {
    const pathname = usePathname()


    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
        <div className={`side-bar-root ${!isOpen ? "close" : ""}`}>
            <div className="side-bar-container">
                <div className="side-bar-header">
                    <div className="side-bar-header-title">
                        <Image src={Logo2} alt="" width={207.2} />
                        <p>Gestão Financeira | Praticidade | Metas | Dashboard</p>
                    </div>

                </div>
                <Separator width='95%' height='1px' color='#47b9e5' />
                <div className="side-bar-content">
                    <div className='nav-title'>
                        <span>Navegação</span>
                    </div>
                    <Link href={'/transactions'} aria-current={pathname === "/transactions" ? 'page' : undefined}><ArrowLeftRight /> Transações</Link>
                    <Link href={'/goals'} aria-current={pathname === "/goals" ? 'page' : undefined}> <Goal /> Metas</Link>
                    <Link href={'/categories'} aria-current={pathname === "/categories" ? 'page' : undefined}><LayoutDashboard /> Categorias</Link>
                </div>
            </div>
          <div className='side-bar-menu'>
               <Menu  width={40} height={40} color='#1f83a7' onClick={() => setIsOpen(!isOpen)} />
          </div>
             
        </div>

    )
}