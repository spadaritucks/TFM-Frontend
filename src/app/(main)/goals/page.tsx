import { GoalStatus } from "@/@types/Enums/GoalStatus";
import GoalPanel from "@/components/goal-panel/component";
import { MainLayout } from "@/layouts/main/layout";
import { GetGoalsByUserIdService, GetGoalsStatusCountByUserId } from "@/services/GoalService";
import { GetAllSubcategoriesService } from "@/services/SubcategoryService";
import { GetCurrentUser } from "@/utils/GetCurrentUser";

export default async function Goals({ searchParams }: { searchParams: { [key: string]: string } }) {

    const pageString = searchParams.page || "1"
    const pageNumber = Number(pageString)
    const page = (pageNumber - 1)

    const subcategory = searchParams.subcategory || null
    const goalName = searchParams.goalName || null
    const goalStatus = searchParams.goalStatus || null

    const user = await GetCurrentUser()
    const subcategories = await GetAllSubcategoriesService(0, 20)

    const InProgressGoals = await GetGoalsStatusCountByUserId(user.id, GoalStatus.InProgress)
    const CompletedGoals = await GetGoalsStatusCountByUserId(user.id, GoalStatus.Completed)
    const ExpiredGoals = await GetGoalsStatusCountByUserId(user.id, GoalStatus.Expired)

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
                    inProgressGoals={InProgressGoals}
                    completedGoals={CompletedGoals}
                    expiredGoals={ExpiredGoals}



                />
            </section>
        </MainLayout>
    )
}