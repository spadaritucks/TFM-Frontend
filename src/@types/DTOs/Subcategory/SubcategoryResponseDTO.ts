export type SubcategoryResponseDTO = {


    page: number
    size: number
    totalPages: number
    totalElements: number
    last: boolean

    content : SubcategoryContentDTO[]

}

export type SubcategoryContentDTO = {
    id: string
    categoryId: string
    subcategoryName: string
    createdAt: string
    updatedAt: string
}