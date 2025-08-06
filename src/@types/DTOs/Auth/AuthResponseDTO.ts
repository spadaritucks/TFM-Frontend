export type AuthResponseDTO = {
    token : string
    user : {
        id : string,
        userPhoto: string
        name: string,
        email: string,
        phone: string
        monthlyIncome: number
        created_at: string
        updated_at : string
    }
}