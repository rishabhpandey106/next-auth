import { connect } from '@/dbConfig/dbConfig'
import Users from '@/models/userModel'
import { NextRequest , NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

export async function POST(req : NextRequest){
    try{
        const reqBody = await req.json();
        const {username , email , password} = reqBody
        console.log(reqBody);

        const user = await Users.findOne({email});

        if(user)
        {
            return NextResponse.json({error: "User already exists"},{status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashed = await bcryptjs.hash(password , salt);

        const newUser = new Users ({
            username,
            email,
            password: hashed
        })
        const savedUser = await newUser.save();
        console.log(savedUser)

        await sendEmail({email , emailType : "VERIFY" , userID : savedUser._id});

        return NextResponse.json({
            message: "User registered succesfully",
            success: true,
            savedUser
        })

    }catch(error:any){
        return NextResponse.json({error: error.message} , {status: 500});
    }
}

connect()
