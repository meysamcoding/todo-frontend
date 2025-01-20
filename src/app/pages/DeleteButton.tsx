import React from "react";
import Image from "next/image";
import { deleteTask } from "../utils/api";

interface DeleteButtonProps {
  id: number; 
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;  
}

const DeleteButton = ({ id, setTasks }: DeleteButtonProps) => {
  const handleDelete = async() => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        // Call the backend API to delete the task
        await deleteTask(id);

        // Update the state to remove the task locally
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete the task. Please try again.");
      }
    }
    
  };

  return (
    <button
      onClick={handleDelete}
      className="text-[#E25858] hover:text-red-700 ml-4"
      aria-label="Delete Task"
    >
      <Image
        src="/trash.png"
        alt="Delete"
        width={20}
        height={20}
        className="cursor-pointer hover:opacity-80"
      />
    </button>
  );
};

export default DeleteButton;
