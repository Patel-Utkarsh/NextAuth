"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import AddTodoModal from "@/components/AddTodoModal";
import DeleteTodoModal from "@/components/DeleteTodoModal";

export default function Home() {
  const [addtodo,setAddTodo] = useState(false);
  const [deleteTodo,setDeleteTodo] = useState(false)
  const [todosData, setTodosData] = useState(null);

  async function fetchData() {
    const FetchData = await fetch("/api/todos/get", {
      method: "GET",
      credentials: "include",
    });
    const data = await FetchData.json();
    setTodosData(data.data.todosData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!todosData)
    return (
      <div className="w-full  bg-gray-300 text-black">
        ..loading Data
      </div>
    );

  return (
    <div className="  h-[100vh] bg-gray-100 text-black flex justify-center relative ">
      <div className="flex flex-col gap-5 mt-10">
        <p className="font-extrabold text-4xl">Todos List</p>
        <button onClick={()=> setAddTodo(true)} className="bg-[#646fef] px-4 py-2 text-white font-bold rounded-md">
          Add Task
        </button>
        <div className="flex flex-col gap-4 w-[90vw] sm:h-[400px] overflow-auto text-black">
          {todosData.map((todo, index) => (
            <div key={index} className="bg-white flex justify-between w-[100%] sm:w-[600px] rounded-md p-3 shadow-md ">
              <div className="flex flex-col">
                <p>{todo.title}</p>
                <p>{new Date(parseInt(todo.createdAt)).toLocaleString()}</p>
              </div>
              <button onClick={()=> setDeleteTodo(todo._id)}><MdDelete/></button>
            </div>
          ))}
        </div>
      </div>


      {
        addtodo && 
        <AddTodoModal setAddTodo = {setAddTodo} fetchData = {fetchData}/>
        
      }

      {
        deleteTodo && <DeleteTodoModal setDeleteTodo={setDeleteTodo} deleteTodo={deleteTodo}  fetchData = {fetchData}></DeleteTodoModal>
      }
    </div>
  );
}
