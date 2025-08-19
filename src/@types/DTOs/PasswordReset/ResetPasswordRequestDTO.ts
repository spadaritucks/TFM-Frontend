export interface ResetPasswordRequestDTO {
    email: string;
    code: string;
    newPassword: string;
}
