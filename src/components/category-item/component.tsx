
import './styles.css'
import { useModal } from "@/context/modal"
import { CategoryResponseDTO } from "@/@types/DTOs/Category/CategoryResponseDTO"
import { SubcategoryResponseDTO } from '@/@types/DTOs/Subcategory/SubcategoryResponseDTO'
import Button from '../button/component'
import SubcategorysDetails from '../subcategoires-details/component'

interface CategorysItem {
    categories: CategoryResponseDTO
    subcategories: SubcategoryResponseDTO[]
}

export default function CategorysItem({ categories, subcategories }: CategorysItem) {


    const { openModal } = useModal()

    return (
        <div className="category-item-container">
            <div className="category-item-content">
                <span>{categories.categoryName}</span>
                <Button
                    name="Mostrar Subcategorias"
                    variant='default'
                    onClick={() => openModal("Subcategorias Vinculadas", 
                        subcategories.filter(subcategory => subcategory.categoryId === categories.id)
                        .map((subcategory, index) => <SubcategorysDetails key={index} subcategory={subcategory} />)
                    )}
                />
                <Button name="Excluir" variant='destructive' />
            </div>
        </div>
    )
}