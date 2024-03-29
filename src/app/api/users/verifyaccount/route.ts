import { connect } from '@/dbConfig/dbConfig'
import Users from '@/models/userModel'
import { NextRequest , NextResponse } from 'next/server'

export async function POST(req : NextRequest) {
    try {
        const reqBody = await req.json();
        const {token} = reqBody;

        console.log(token);

        const user = await Users.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user)
        {
            return NextResponse.json({error: "Invalid token"},{status: 400});
        }

        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        user.isVerified = true;
        await user.save();

        return NextResponse.json({message: "Account Verified Succefully.",success: true},{status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500});        
    }    
}

connect();