import { connect } from '@/dbConfig/dbConfig'
import Users from '@/models/userModel'
import { NextRequest , NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getMyProfileId } from '@/helpers/myProfileId';

export async function POST(req: NextRequest) {
    try {
        const id = await getMyProfileId(req);
        const user = await Users.findOne({_id: id}).select("-password");

        if(!user)
        {
            return NextResponse.json({error: "Cant find the profile information"},{status: 400});
        }

        const res = NextResponse.json({
            message: "User profile found",
            data: user,
            success: true
        },{status: 200});

        return res;

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500});
    }
}