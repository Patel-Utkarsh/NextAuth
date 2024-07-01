"use client"
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import { json } from "react-router-dom";

const AddTodoModal = ({ setAddTodo,fetchData }) => {
    const [add,setAdd] = useState('');
    console.log(add);

    async function createTodo() {
        toast.loading('Adding Todo')
        const sendData = await fetch('/api/todos/create',{
            method : 'POST',
            body : JSON.stringify({title : add})
        })

        const res = await sendData.json();
        console.log(res);
        fetchData();
        toast.dismiss()
        toast.success('Added Todo');
        setAddTodo(false);


    }

    async function handleSubmit() {
        if(add.trim() === "") {
            toast.error('Input field cant be empty')
            return
        }

        createTodo();



    }
  return (
    <div className="text-black fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[380px]">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Add Todo</h2>
          <button className="mt-[-20px]" onClick={() => setAddTodo(false)}>
            <RxCrossCircled size={25}/>
          </button>
        </div>
        <input
          type="text"
          className=" border-black border-2 p-2"
          placeholder="Play Cricket"
          onChange={(e)=>setAdd(e.target.value)}
        ></input>
        <button onClick={handleSubmit} className="bg-[#646fef] px-4 py-2 p-2 border-black border-2 ml-1 text-white font-bold ">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodoModal;
