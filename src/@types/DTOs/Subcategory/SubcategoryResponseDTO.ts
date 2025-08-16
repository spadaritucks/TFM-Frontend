import { CategoryResponseDTO } from "../Category/CategoryResponseDTO"


export type SubcategoryResponseDTO = {
    id: string
    categoryId: string
    userId : string
    subcategoryName: string
    createdAt: string
    updatedAt: string
    category : CategoryResponseDTO
}

