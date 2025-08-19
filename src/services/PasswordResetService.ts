"use server"

import { PasswordResetRequestDTO } from "@/@types/DTOs/PasswordReset/PasswordResetRequestDTO";
import { VerifyCodeRequestDTO } from "@/@types/DTOs/PasswordReset/VerifyCodeRequestDTO";
import { ResetPasswordRequestDTO } from "@/@types/DTOs/PasswordReset/ResetPasswordRequestDTO";
import { api } from "@/config/axios";

export async function SendResetCodeService(passwordResetRequestDTO: PasswordResetRequestDTO): Promise<string> {
    const response = await api.post("/password-reset/send-code", passwordResetRequestDTO);

    
    if (response.status !== 200) {
        throw new Error(response.data.message || "Erro ao enviar código de recuperação");
    }

    return response.data;
}

export async function VerifyCodeService(verifyCodeRequestDTO: VerifyCodeRequestDTO): Promise<string> {
    const response = await api.post("/password-reset/verify-code", verifyCodeRequestDTO);
    
    if (response.status !== 200) {
        throw new Error(response.data.message || "Código inválido ou expirado");
    }

    return response.data;
}

export async function ResetPasswordService(resetPasswordRequestDTO: ResetPasswordRequestDTO): Promise<string> {
    const response = await api.post("/password-reset/reset-password", resetPasswordRequestDTO);
    
    if (response.status !== 200) {
        throw new Error(response.data.message || "Erro ao redefinir senha");
    }

    return response.data;
}
