import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import userSchema from "@/models/user";
import todoSchema from "@/models/todo";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { verifySession } from "@/lib/session";

export async function POST(request) {
    const {todo_id} = await request.json();
   // console.log(todo_id);
    const id = await verifySession();
    dbConnect();
    
    try {
        await userSchema.findByIdAndUpdate(id,{$pull : {todosData : todo_id}});
        await todoSchema.findByIdAndDelete(todo_id);
        return NextResponse.json({success : true,message : 'todo deleted successfully'});

        
    } catch (error) {

        return NextResponse.json({success : false,message : error});

        
    }
}