import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({message : "No User Found",status : 400})
        }

        const validPassword = await bcryptjs.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json({message : "Please Check Your Password or Username",status : 400})
        }

        if(!user.isVerified){
            return NextResponse.json({message : "User Is not Verified",status : 400})
        }
        

        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }

        const response = NextResponse.json({
            message : "Welcome you are logged In",
            success : true
        })

        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn : '1d'})

        response.cookies.set("token",token,{
            httpOnly : true
        })

        return response


        
    } catch (error:any) {
        return NextResponse.json({error : error.message,status:500})
    }
}