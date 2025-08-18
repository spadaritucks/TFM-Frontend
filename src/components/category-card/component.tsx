import { CategoryResponseDTO } from "@/@types/DTOs/Category/CategoryResponseDTO"
import { SubcategoryResponseDTO } from "@/@types/DTOs/Subcategory/SubcategoryResponseDTO"
import Button from "../button/component"
import { Trash2 } from "lucide-react"
import './styles.css'

interface CategoryCardProps {
    category: CategoryResponseDTO
    subcategories: SubcategoryResponseDTO[]
    onDeleteCategory: (categoryId: string) => void
    onDeleteSubcategory: (subcategoryId: string) => void
}

export default function CategoryCard({ category, subcategories, onDeleteCategory, onDeleteSubcategory }: CategoryCardProps) {
    return (
        <div className="category-card">
            <div className="category-card-header">
                <h3>{category.categoryName}</h3>
                <div className="category-actions">
                    <span className="subcategory-count">
                        {subcategories.length} subcategoria{subcategories.length !== 1 ? 's' : ''}
                    </span>
                    <Button 
                        name="Excluir" 
                        variant="destructive" 
                        onClick={() => onDeleteCategory(category.id)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>
            <div className="subcategories-grid">
                {subcategories.length > 0 ? (
                    subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="subcategory-item">
                            <span>{subcategory.subcategoryName}</span>
                            <Button 
                                name="Excluir" 
                                variant="destructive" 
                                onClick={() => onDeleteSubcategory(subcategory.id)}
                            >
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    ))
                ) : (
                    <p className="no-subcategories">Nenhuma subcategoria</p>
                )}
            </div>
        </div>
    )
}