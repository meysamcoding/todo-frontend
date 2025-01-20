import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { createTask } from "../utils/api";

const CreateTask = ({
    tasks,
    setTasks,
    onCancel,
}: {
    tasks: any[];
    setTasks: React.Dispatch<React.SetStateAction<any[]>>;
    onCancel: () => void;
}) => {
    const [title, setTitle] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [buttonText, setButtonText] = useState("Add Task +");

    const handleAddTask = async () => {
        if (!title || !selectedColor) {
            alert("Please provide a title and select a color.");
            return;
        }

        // Create a new task
        const newTask = {
            id: tasks.length + 1,
            title,
            color: selectedColor,
            completed: false,
        };

        try {
            // Call the backend to add the task
            const addedTask = await createTask(newTask);
    
            // Update the local state with the newly added task
            setTasks((prevTasks) => [...prevTasks, addedTask]);
    
            // Reset form fields
            setTitle("");
            setSelectedColor("");
    
            // Provide feedback to the user
            setButtonText("Save ✅");
    
            // Reset button text after 2 seconds
            setTimeout(() => {
                setButtonText("Add Task");
            }, 2000);
    
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to add task. Please try again.");
        }

    };

    return (
        <div className="w-full max-w-md mx-auto mt-8 p-6 bg-[#1A1A1A] text-white rounded-lg shadow-md">
            <button onClick={(e) => {
                e.stopPropagation(); // Prevent bubbling
                onCancel();
            }} className="mr-4 text-gray-400 hover:text-gray-200">
                <FiArrowLeft size={24} />
            </button>

            {/* Title Input */}
            <div className="mb-4">
                <label htmlFor="task-title" className="block text-lg font-medium mb-2">
                    Title
                </label>
                <input
                    id="task-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="EX: Brush you teeth"
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Color Selector */}
            <div className="mb-6">
                <label className="block text-lg font-medium mb-2">Color</label>
                <div className="flex space-x-4">
                    {[
                        "red", "blue", "green", "yellow", "purple",
                        "orange", "teal", "pink", "indigo", "lime"
                    ].map((color) => (
                        <button
                            key={color}
                            type="button"
                            className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? "border-white" : "border-transparent"
                                }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                        />
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={handleAddTask}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-lg font-bold"
                >
                    {buttonText}
                </button>

            </div>
        </div>
    );
};

export default CreateTask;
