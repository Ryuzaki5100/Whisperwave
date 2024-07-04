import { resend } from "@/lib/resend"
import VerificationEmail from "../../emails/VerificationEmail"
import { ApiResponse } from "@/types/ApiResponse"
import { error } from "console"

export async function sendVerificationEmail(username: string, verifyCode: string, email: string): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "WhisperWave | Verification Code",
            react: VerificationEmail({ username, otp: verifyCode })
        })
        return { success: true, message: "Verification email sent successfully" }
    } catch (emailError) {
        error("Error sending verification email", emailError)
        return { success: false, message: "Failed to send verification email" }
    }
}

