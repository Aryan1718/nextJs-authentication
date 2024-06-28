import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import {getIdFromToken} from '@/helpers/getTokenDetails'

connect()

export async function POST(request:NextRequest){
    try {
        const Id = await getIdFromToken(request)
        const user = await User.findOne({_id : Id}).select('-password')

        return NextResponse.json({
            message : "User Found",
            data : user
        })

    } catch (error:any) {
        return NextResponse.json({
            error : error.message,
            status : 500
        })
    }
}