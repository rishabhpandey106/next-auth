import { connect } from '@/dbConfig/dbConfig'
import Users from '@/models/userModel'
import { NextRequest , NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getMyProfileId = (req: NextRequest) => {
    try {

        const token:any = req.cookies.get("token")?.value || "";
        const validToken:any = jwt.verify(token , process.env.TOKEN_SECRET!);

        return validToken.id;

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500});
    }
}