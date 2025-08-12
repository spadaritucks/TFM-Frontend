
import { TransactionTypeEnum } from "@/@types/Enums/TransactionTypeEnum";
import TransactionPanel from "@/components/transactions-panel/component";
import { MainLayout } from "@/layouts/main/layout";
import { GetAllSubcategoriesService } from "@/services/SubcategoryService";
import { GetCurrentMonthTransactionsByUserIdService, GetMonthCurrentTransactionAmountByUserIdService} from "@/services/TransactionService";
import { GetCurrentUser } from "@/utils/GetCurrentUser";
import dayjs from "dayjs";




export default async function Transactions(props: { searchParams: Promise<{ [key: string]: string }> }) {
    const searchParams = await props.searchParams;

    const user = await GetCurrentUser()


    const pageString = searchParams.page || "1"
    const pageNumber = Number(pageString)
    const page = (pageNumber - 1)


    const minValue = searchParams.minValue || null
    const maxValue = searchParams.maxValue || null
    const subcategory = searchParams.subcategory || null
    const transactionDate = searchParams.transactionDate || null

    const currentMonth = dayjs().month()
    const currentYear = dayjs().year()


    const month = transactionDate ? dayjs(new Date(transactionDate)).month() : currentMonth
    const year = transactionDate ? dayjs(new Date(transactionDate)).year() : currentYear

    const transactions = await GetCurrentMonthTransactionsByUserIdService(
        user.id,
        month + 1,
        year,
        minValue,
        maxValue,
        subcategory,
        page,
        10
    )

    const income = await GetMonthCurrentTransactionAmountByUserIdService(
        user.id,
        month + 1,
        year,
        TransactionTypeEnum.INCOME
    )

    const expense = await GetMonthCurrentTransactionAmountByUserIdService(
        user.id,
        month + 1,
        year,
        TransactionTypeEnum.EXPENSE
    )

    const subcategories = await GetAllSubcategoriesService(0, 20)

    return (
        <MainLayout>
            <section className="section-panel">
                <TransactionPanel
                    transactions={transactions}
                    subcategories={subcategories}
                    userId={user.id}
                    income={income}
                    expense={expense}
                />
            </section>
        </MainLayout>
    )
}