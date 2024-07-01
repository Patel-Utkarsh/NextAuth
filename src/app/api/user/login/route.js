import dbConnect from "@/lib/dbConnect";
import userSchema from "@/models/user";
import { cookies } from "next/headers";
import jsonwebtoken from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";

export async function POST(request) {
    const {email,password} = await request.json();
    dbConnect();

    const validUser = await userSchema.findOne({email});

    if(!validUser) {
      return  NextResponse.json({
        success : false,
        message : 'Account doesnt exist'
      },{
        status : 500
      })
    }

    if(validUser.password !== password) {
        return  NextResponse.json({
            success : false,
            message : 'Invalid Password'
          },{
            status : 500
          })

    }

    try {
     await createSession(validUser._id);

    
       

        //console.log(token);

        const response = NextResponse.json({
            success : true,
            message : 'logged in successfully',
        })

       
       
    

        return response


        
    } catch (error) {

        return NextResponse.json({success : false, message : error},{status : 504});
        
    }

    
}