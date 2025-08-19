import { MainLayout } from "@/layouts/main/layout";
import "./styles.css"
import { GetAllCategoriesService } from "@/services/CategoryService";
import { GetCurrentUser } from "@/utils/GetCurrentUser";
import { GetAllSubcategoriesService } from "@/services/SubcategoryService";
import CategoriesContent from "@/components/categories-content/component";
import { GetAmountCurrentTransactionsBySubCategory } from "@/services/TransactionService";
import dayjs from "dayjs";

export default async function Categories () {

    
    const month = dayjs().month() 
    const year = dayjs().year()

    const user = await GetCurrentUser()
    const categories  = await GetAllCategoriesService(user.id)
    const subcategories = await GetAllSubcategoriesService(user.id)

    const subcategoriesAmount = await GetAmountCurrentTransactionsBySubCategory(user.id, month + 1, year)


    return (
        <MainLayout>
            <section className = "categories-section">
                <CategoriesContent subcategoriesAmount={subcategoriesAmount} categories={categories}  subcategories={subcategories} userId={user.id} />
            </section>
        </MainLayout>
    )
}