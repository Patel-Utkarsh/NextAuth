import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jsonwebtoken from 'jsonwebtoken'
import dbConnect from "@/lib/dbConnect";
import todoSchema from "@/models/todo";
import userSchema from "@/models/user";
import { verifySession } from "@/lib/session";
dbConnect();

export async function POST(request) {
    const {title} =  await request.json();
   const id = await verifySession();
   const time = Date.now();

   try {
    const createTodo = await todoSchema.create({title:title,createdAt : time});
    await userSchema.findByIdAndUpdate(id,{$push : {todosData : createTodo._id}});
    return NextResponse.json({success : true, message  :'todo created successfully'});
    
   } catch (error) {
    return NextResponse.json({success : false, message  : error},{status : 500});
    
   }

}