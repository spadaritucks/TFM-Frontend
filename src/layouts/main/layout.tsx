import Header from "@/components/header/component"
import { GetCurrentUser } from "@/utils/GetCurrentUser"
import { ReactNode } from "react"
import "./styles.css"
import SideBar from "@/components/side-bar/component"

interface MainLayoutProps {
    children: ReactNode
}

export async function MainLayout({ children }: MainLayoutProps) {
    const user = await GetCurrentUser()

    return (
        <section className="root-layout">
            <SideBar/>
            <div className="root-grid-content">
                <Header user={user} />
                {children}
            </div>
        </section>
    )
}
