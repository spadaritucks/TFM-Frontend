
import TransactionPanel from "@/components/transactions-panel/component";
import { MainLayout } from "@/layouts/main/layout";
import { GetAllSubcategoriesService } from "@/services/SubcategoryService";
import { GetCurrentMonthTransactionsByUserIdService } from "@/services/TransactionService";
import { GetCurrentUser } from "@/utils/GetCurrentUser";
import dayjs from "dayjs";




export default async function Transactions({searchParams} : {searchParams : {[key : string] : string}}) {

    const user = await GetCurrentUser()
    const month = dayjs().month()
    const year = dayjs().year()

    const page = searchParams.page || "0"

    const transactions = await GetCurrentMonthTransactionsByUserIdService(
        user.id,
        month + 1,
        year,
        page,
        10
    )

    const subcategories = await GetAllSubcategoriesService(0, 10)

    return (
        <MainLayout>
            <section className="section-panel">
                <TransactionPanel transactions={transactions} subcategories={subcategories} />
            </section>
        </MainLayout>
    )
}