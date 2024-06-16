import React, { createContext, useState } from 'react';
import useTasks from '../hooks/useTasks';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const { tasks, addTask, updateTask, deleteTask, sortTasks,setSorting,sortConfig } = useTasks();
    const [taskToEdit, setTaskToEdit] = useState(null);

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, sortTasks, taskToEdit, setTaskToEdit,setSorting,sortConfig }}>
            {children}
        </TaskContext.Provider>
    );
};

export { TaskProvider, TaskContext };
