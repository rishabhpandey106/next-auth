import { connect } from '@/dbConfig/dbConfig'
import { NextRequest , NextResponse } from 'next/server'

export async function GET(req:NextRequest) {
    try {
        const response = NextResponse.json({
            message: "User logged out succesfully",
            success: true
        },{status: 200});

        response.cookies.set("token", "" , {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;
    } catch (error:any) {
        return NextResponse.json({error: error.message} , {status: 500});
    }
}

connect();