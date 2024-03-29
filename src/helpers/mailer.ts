import nodemailer from 'nodemailer'
import Users from '@/models/userModel';
import bcryptjs, { hash } from 'bcryptjs';

export const sendEmail = async ({email , emailType , userID}:any) => {
    try{

        const hashed = await bcryptjs.hash(userID.toString(),10);

        if(emailType === 'VERIFY')
        {
            await Users.findByIdAndUpdate(userID,{
                $set:{
                verifyToken : hashed,
                verifyTokenExpiry : Date.now() + 3600000
            }})
        }
        else if(emailType === 'RESET')
        {
            await Users.findByIdAndUpdate(userID,{
                $set:{
                forgetPasswordToken : hashed,
                forgetPasswordTokenExpiry : Date.now() + 3600000
            }})
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILER_USER,
              pass: process.env.MAILER_PASSWORD
            }
        });

        const options = {
            from: '"Authentication" <rishabh@testing.project>', 
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your account" : "Reset Your Password", 
            html: emailType === 'VERIFY' ? `<b>Hello, welcome to our platform!</b>
            <p>Please click the button below to verify your account:</p>
            <a href="${process.env.DOMAIN}/verifyaccount?token=${hashed}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Verify Account</a>
            ` : `<b>Hello, you've requested a password reset.</b>
            <p>If you requested a password reset, click the button below:</p>
            <a href="${process.env.DOMAIN}/verifyaccount?token=${hashed}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Reset Password</a>
            `,
        }

        const mailResponse = await transporter.sendMail(options);
        return mailResponse;
    }catch(error:any) {
        throw new Error(error.message)
    }
}