import GoalPanel from "@/components/goal-panel/component";
import { MainLayout } from "@/layouts/main/layout";
import { GetGoalsByUserIdService, GetGoalsStatusCountByUserId } from "@/services/GoalService";
import { GetAllSubcategoriesService } from "@/services/SubcategoryService";
import { GetCurrentUser } from "@/utils/GetCurrentUser";
import dayjs from "dayjs";

export default async function Goals(props: { searchParams: Promise<{ [key: string]: string }> }) {
    const searchParams = await props.searchParams;

    const pageString = searchParams.page || "1"
    const pageNumber = Number(pageString)
    const page = (pageNumber - 1)

    const subcategory = searchParams.subcategory || null
    const goalName = searchParams.goalName || null
    const goalStatus = searchParams.goalStatus || null

    const user = await GetCurrentUser()
    const subcategories = await GetAllSubcategoriesService(user.id)
    const goalsCount = await GetGoalsStatusCountByUserId(user.id)
    const goals = await GetGoalsByUserIdService(
        user.id,
        subcategory,
        goalName,
        goalStatus,
        page,
        20
    )



    return (
        <MainLayout>
            <section className="section-panel">
                <GoalPanel
                    userId={user.id}
                    subcategories={subcategories}
                    goals={goals}
                    goalsCount={goalsCount}
                />
            </section>
        </MainLayout>
    )
}