import React from "react";

const NoTasksRegistered = () => {
  return (
    <div className="w-full max-w-[736px] mx-auto mt-12 p-8  rounded-md  bg-[#1A1A1A]"
>

      {/* Message */}
      <div className="flex flex-col items-center text-center gap-4 mt-8">
        <p className="text-gray-500">
          You don't have any tasks registered yet.
        </p>
        <p className="text-gray-500">
          Create tasks and organize your to-do items.
        </p>
      </div>
    </div>
  );
};

export default NoTasksRegistered;
