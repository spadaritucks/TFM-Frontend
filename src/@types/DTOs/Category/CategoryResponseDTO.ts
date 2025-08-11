export type CategoryResponseDTO = {


    page: number
    size: number
    totalPages: number
    totalElements: number
    last: boolean

    content : CategoryContentDTO[]

}

export type CategoryContentDTO = {
    id: string
    categoryName: string
    createdAt: string
    updatedAt: string
}