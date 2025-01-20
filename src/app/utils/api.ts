

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchTasks = async () => {
    try {
    const response = await fetch( `${backendUrl}/tasks`);
    
    if(!response.ok) {
        throw new Error ('Failed to fetch tasks');
    }
      // Parse and return the JSON response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error; 
    }
}

export const createTask = async (task: {title: string; color: string; completed: boolean}) => {
    const response = await fetch(`${backendUrl}/tasks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    });
    if(!response.ok) {
        throw new Error('Failed to create task');
    }
    return response.json();
}

export const deleteTask = async (id: number) => {
    const response = await fetch(`${backendUrl}/tasks/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }

    return response.json(); // Return the deleted task
};


export const updateTask = async (id: number, updates: { completed: boolean }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
  
    return response.json();
  };