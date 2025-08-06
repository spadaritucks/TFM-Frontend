import Header from "@/components/header/component"
import { GetCurrentUser } from "@/utils/GetCurrentUser"
import { ReactNode } from "react"

interface MainLayoutProps {
    children: ReactNode
}

export async function MainLayout({children} : MainLayoutProps) {

    const user = await GetCurrentUser()

    return (
        <section>
            <Header user={user} />
            {children}
        </section>
    )
}