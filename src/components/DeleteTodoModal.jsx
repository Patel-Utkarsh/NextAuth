"use client"
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";

const DeleteTodoModal = ({setDeleteTodo,fetchData,deleteTodo}) => {
    const [id,setId] = useState(deleteTodo);

   async function deleteHandler() {
    toast.loading('deleting todo');
        const del = await fetch('/api/todos/delete',{
            method : 'POST',
            body : JSON.stringify({todo_id : id})
        })

        const res = await del.json();
        console.log(res);
        toast.dismiss();
        fetchData();
        setDeleteTodo(false)
        toast.success('Deleted Todo')


    }


  return (
    <div className="text-black fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[380px]">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Delete this Todo?</h2>
          <button className="mt-[-20px]" >
            <RxCrossCircled size={25} onClick={()=> setDeleteTodo(false)}/>
          </button>

         
        </div>
     
        <button onClick={() => deleteHandler()}  className="bg-[#646fef] px-4 py-1 p-2 border-black border-2 ml-1 text-white font-bold ">
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteTodoModal