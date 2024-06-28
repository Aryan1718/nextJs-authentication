import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()

        const {token} = reqBody
    
        console.log("token" , token);
    
        const user = await User.findOne({verificationToken : token})
    
        if(!user){
            return NextResponse.json({message : "Invalid Token", status : 400})
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationExpiry = undefined

        await user.save()

        return NextResponse.json({message:"User vertification completed",status:200, success : true})



    } catch (error:any) {
        return NextResponse.json({error : error.message,status : 500})
    }
}