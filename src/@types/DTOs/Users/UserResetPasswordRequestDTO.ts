export interface UserResetPasswordRequestDTO {
    email: string;
    validationCode: string;
    newPassword: string;
}
