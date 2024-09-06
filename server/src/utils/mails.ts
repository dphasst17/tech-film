import * as nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import * as QRCode from "qrcode";
import { uiTicket } from "./ui-ticket";
import { Responses } from "src/interfaces/request.interface";
async function generateQRCode(data: string): Promise<string> {
    try {
        // Generate QR code as Data URL
        const dataUrl = await QRCode.toDataURL(data);
        return dataUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
}

export const handleSendMail = async (d: any, type: string) => {
    const toMail = d.toMail;
    const subject = d.subject;
    const GOOGLE_MAILER_CLIENT_ID = process.env.G_M_CLIENT_ID;
    const GOOGLE_MAILER_CLIENT_SECRET = process.env.G_M_SECRET_ID;
    const GOOGLE_MAILER_REFRESH_TOKEN = process.env.G_M_TOKEN;
    const ADMIN_EMAIL_ADDRESS = process.env.G_M_FROM;
    const myOAuth2Client = new OAuth2Client(
        GOOGLE_MAILER_CLIENT_ID,
        GOOGLE_MAILER_CLIENT_SECRET
    );
    // Set Refresh Token vào OAuth2Client Credentials
    myOAuth2Client.setCredentials({
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
    });
    const sendMail = async (value: any): Promise<Responses> => {
        let qr = type === 'qr' ? await generateQRCode(`${value.id}`) : '';
        try {
            // Lấy thông tin gửi lên từ client qua body
            const myAccessTokenObject = await myOAuth2Client.getAccessToken();
            // Access Token sẽ nằm trong property 'token' trong Object  vừa get được ở trên
            const myAccessToken = myAccessTokenObject?.token;
            // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
            const transport = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: String(ADMIN_EMAIL_ADDRESS),
                    clientId: GOOGLE_MAILER_CLIENT_ID,
                    clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                    refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
                    accessToken: myAccessToken,
                },
            } as nodemailer.TransportOptions);
            const mailOptions = {
                to: toMail, // người nhận
                subject: subject,
                attachDataUrls: true,
                html: type === 'qr' ? uiTicket(qr, d) : ``,
            };
            await transport.sendMail(mailOptions);
            let jsonResult: Responses = { status: 200, message: "Email sent successfully." }
            jsonResult = type === 'qr' ? { ...jsonResult, data: { idTicket: d.id } } : jsonResult
            return jsonResult as Responses
        } catch (error: any) {
            console.log(error);
            return { status: 500, message: error.message }
        }
    };
    return sendMail(d);
};