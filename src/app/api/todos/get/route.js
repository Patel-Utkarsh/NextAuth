import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import userSchema from "@/models/user";
import {NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { decrypt, verifySession } from "@/lib/session";
import mongoose from "mongoose";
import todosSchema from "../../../../models/todo";

export async function GET(request) {
 
    const userID = await verifySession()

    const id = new mongoose.Types.ObjectId(userID);
  
    dbConnect();

    try {
        const data = await userSchema.findById(id)
                                         .populate("todosData")
                                         .exec();
        return NextResponse.json({success : true, message : 'data fetched successfully',data});
        
        


        
    } catch (error) {
        console.log('error ocurred ',error.message);
        return NextResponse.json({success : false, message : error.message});
        
    }
}