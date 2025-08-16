import "./styles.css"
import { SubcategoryResponseDTO } from "@/@types/DTOs/Subcategory/SubcategoryResponseDTO"

interface SubcategorysDetailsProps {
    subcategory : SubcategoryResponseDTO 
}

export default function SubcategorysDetails({ subcategory }: SubcategorysDetailsProps) {



    return (
        <div className="subcategory-details">
            <div className="info">
                <span>Data da Transação : </span>
                <p>{subcategory.subcategoryName}</p>
            </div>
           
        </div>
    )
}