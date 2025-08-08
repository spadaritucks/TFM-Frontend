
import TransactionPanel from "@/components/transactions-panel/component";
import { MainLayout } from "@/layouts/main/layout";
import { GetAllSubcategoriesService } from "@/services/SubcategoryService";
import { GetAllTransactionsService } from "@/services/TransactionService";




export default async function Transactions () {

    const transactions = await GetAllTransactionsService(0,10)

    const subcategories = await GetAllSubcategoriesService(0, 10)

    return (
        <MainLayout>
            <section className="section-panel">
                <TransactionPanel transactions={transactions} subcategories={subcategories} />
            </section>
        </MainLayout>
    )
}