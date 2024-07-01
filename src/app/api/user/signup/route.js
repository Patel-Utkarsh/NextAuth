import dbConnect from "@/lib/dbConnect";
import userSchema from "@/models/user";
import { NextResponse } from "next/server";
dbConnect();

export async function POST(request) {
    const {name,email,password} = await request.json();
    

    const validUser =  await userSchema.findOne({email});

    if(validUser) {
        return NextResponse.json({success : false, message : 'account already exists'},{status : 500});
    }

    try {
        await userSchema.create({name,email,password});
        return NextResponse.json({success  : true, message : 'account created successfully'});
        
    } catch (error) {

        return NextResponse.json({success : false, message : error},{status : 504});
        
    }

}