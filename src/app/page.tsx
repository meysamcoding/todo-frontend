"use client";

import { useState } from "react";
import HomePage from "./pages/HomePage";
import Image from "next/image";
import CreateTask from "./pages/CreateTask";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [createTaskClicked, setCreateTaskClicked] = useState(false);

  return (
    <div className="w-screen h-screen bg-[#1A1A1A]">
      {/* Header */}
      <header className="w-full max-w-[1440px] h-[200px] flex flex-col items-center justify-center space-y-8 bg-black">
        <div className="flex items-center space-x-2">
          {/* Rocket Icon */}
          <Image
            src="/rocket.png"
            alt="Rocket Icon"
            width={20}
            height={20}
            className="inline-block"
          />
          <h1 className="text-[40px] font-extrabold leading-[48.41px] text-white flex items-center">
            <span className="text-[#4EA8DE]">Todo&nbsp;</span>
            <span className="text-[#5E60CE]">App </span>
          </h1>
        </div>

        {/* Create Task Button - Only show when createTaskClicked is false */}
        {!createTaskClicked && (
          <button
            onClick={() => setCreateTaskClicked(true)}
            className="flex items-center justify-center w-[736px] h-[52px] bg-[#1E6F9F] text-white text-lg font-medium rounded-md space-x-2"
          >
            <span>Create Task</span>
            <span className="w-[16px] h-[16px] flex items-center justify-center text-white text-lg font-bold">+</span>
          </button>
        )}
      </header>

      {/* Main Content */}
      {createTaskClicked ? (
        <CreateTask
          tasks={tasks}
          setTasks={setTasks}
          onCancel={() => setCreateTaskClicked(false)} // When canceled, return to main page
        />
      ) : (
        <HomePage />
      )}
    </div>
  );
}
