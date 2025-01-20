import React, { useState } from "react";

interface CustomCheckboxProps {
  id: number;
  title: string;
  completed: boolean;
  toggleTaskCompletion: (id: number, completed: boolean) => void; // Callback to update state in parent
}

const CustomCheckbox = ({ id, title, completed, toggleTaskCompletion }: CustomCheckboxProps) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleCheckboxChange = () => {
    const newCompletedStatus = !isCompleted;

    // Update the local state
    setIsCompleted(newCompletedStatus);

    // Call the parent function to update the task's completed status
    toggleTaskCompletion(id, newCompletedStatus);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
        className="peer w-4 h-4 rounded-full border-2 border-[#0063BF]"
      />

      {/* Task Title */}
      <span
        className={`text-left text-[#F2F2F2] ${
          isCompleted ? "line-through text-gray-500" : ""
        }`}
      >
        {title}
      </span>
    </div>
  );
};

export default CustomCheckbox;
