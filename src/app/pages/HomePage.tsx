"use client"

import { useEffect, useState } from "react";
import { fetchTasks, updateTask } from '../utils/api'
import Image from "next/image";
import NoTasksRegistered from '../NoTasksRegistered/NoTasksRegistered';
import DeleteButton from "./DeleteButton";
import CustomCheckbox from "./CustomCheckbox";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  color?: string; // Optional if used in the future
}

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const loadTask = async () => {
      try {
        const task = await fetchTasks();
        setTasks(task);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Access safely
        } else {
          setError('An unknown error occurred'); // Fallback for non-Error types
        }
      }
    };
    loadTask();
  }, [])

  const completedTasks = tasks.filter((task) => task.completed).length;


  const toggleTaskCompletion = async (id: number, completed: boolean) => {
    try {
        // Update the task in the backend
        const updatedTask = await updateTask(id, { completed });

        // Update the task in the local state
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === id ? updatedTask : task))
        );
    } catch (error) {
        console.error("Error updating task completion status:", error);
        alert("Failed to update task. Please try again.");
    }
};


  return (
    <div className="w-full max-w-[736px] mx-auto mt-12 p-8    bg-[#1A1A1A]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-300 pb-4">
        {/* Tasks */}
        <div className="text-left mb-4 sm:mb-0">
          <h2 className="text-lg font-bold text-todoBlue">Tasks
            <span className="bg-gray-700 m-2 text-white px-1 py-1 rounded">{tasks.length}</span>
          </h2>
        </div>
        {/* Completed */}
        <div className="text-left sm:text-right">
          <h2 className="text-lg font-bold  text-[#5E60CE]">Completed
            <span className="bg-gray-700 m-2 text-white px-1 py-1 rounded">{completedTasks} de {tasks.length}</span>  </h2>

        </div>
      </div>

      {tasks.length === 0 ? (
        <NoTasksRegistered />
      ) : (
        <ul className="space-y-4 mt-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-[#333333] p-4 rounded-md"
            >
              <CustomCheckbox
                id={task.id}
                completed={task.completed}
                toggleTaskCompletion={toggleTaskCompletion}
                title={task.title}
              />
              <DeleteButton id={task.id} setTasks={setTasks}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};


export default TaskPage;