import { useState, useEffect } from 'react';
import { loadTasks, saveTasks } from '../utils/localStorage';

const useTasks = () => {
    const [tasks, setTasks] = useState(loadTasks());
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const addTask = task => {
        const newTasks = [...tasks, { ...task, id: Date.now() }];
        sortTasks(sortConfig.key, sortConfig.direction, newTasks);
    };

    const updateTask = updatedTask => {
        const updatedTasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
        sortTasks(sortConfig.key, sortConfig.direction, updatedTasks);
    };

    const deleteTask = id => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
        sortTasks(sortConfig.key, sortConfig.direction, newTasks);
    };

    const sortTasks = (criterion, direction,taskList = tasks) => {
        const sortedTasks = [...taskList].sort((a, b) => {
          let comparison = 0;
          if (criterion === 'dueDate') {
            comparison = new Date(a.dueDate) - new Date(b.dueDate);
          } else if (criterion === 'priority') {
            const priorities = { Low: 1, Medium: 2, High: 3 };
            comparison = priorities[a.priority] - priorities[b.priority];
          }
          return direction === 'ascending' ? comparison : -comparison;
        });
        setTasks(sortedTasks);
      };

      const setSorting = (key, direction) => {
        setSortConfig({ key, direction });
        sortTasks(key, direction);
      };

    return {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        sortTasks,
        setSorting,
        sortConfig
    };
};

export default useTasks;
