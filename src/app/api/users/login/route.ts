import { connect } from '@/dbConfig/dbConfig'
import Users from '@/models/userModel'
import { NextRequest , NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        
        const reqBody = await req.json();
        const {username , email , password} = reqBody;
        console.log(reqBody);

        const user = await Users.findOne({email});

        if(!user)
        {
            return NextResponse.json({error: "User doesn't exists."},{status: 400});
        }
        
        // user is verified or not, if not send error message that you are not verified so cant login.

        const validity = await bcryptjs.compare(password , user.password);

        if(!validity)
        {
            return NextResponse.json({error: "Password was wrong"},{status: 400});
        }

        const tokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenPayload , process.env.TOKEN_SECRET! , {expiresIn: '1d'});

        const response = NextResponse.json({message: "User loggedin succesfully.", success: true},{status: 200});

        response.cookies.set("token",token,{
            httpOnly: true
        });

        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500});
    }
}


connect();