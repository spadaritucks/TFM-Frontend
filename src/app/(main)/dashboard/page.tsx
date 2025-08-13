import DashboardContent from "@/components/dashboard-content/component";
import { MainLayout } from "@/layouts/main/layout";
import "./styles.css"

export default async function Dashboard () {

    return (
        <MainLayout>
            <section className = "dashboard-section">
                <DashboardContent/>
            </section>
        </MainLayout>
    )
}