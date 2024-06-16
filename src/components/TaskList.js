import React, { useCallback, useContext, useMemo, useState } from 'react';
import {TaskContext} from '../context/TaskContext';
import TaskItem from './TaskItem';
import styled from 'styled-components';

const TaskListContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
`;

const SortButton = styled.button`
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: lightgray;
  cursor: pointer;
`;

const SearchInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: calc(100% - 40px);
`;

const FilterContainor = styled.div`
    padding: 0px 10px;
`

const TaskList = ({ onSelectTask, onTaskEdit}) => {
  const { tasks, setSorting,sortConfig ,setTaskToEdit  ,deleteTask} = useContext(TaskContext);
  const [searchQuery, setSearchQuery] = useState('');


    const handleSort = (key) => {
        let direction = 'ascending'
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSorting(key,direction)
    }

    
    const handleTaskSelect = useCallback((id) => {
        onSelectTask(id);
    }, [onSelectTask]);

    const handleEdit = useCallback((task) => {
        setTaskToEdit(task);
        onTaskEdit(task)
    }, [setTaskToEdit]);

    const handleDelete = useCallback((id) => {
        deleteTask(id);
    }, [deleteTask]);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }, [tasks, searchQuery]);
  return (
    <TaskListContainer>
        <FilterContainor>
      <h2>Task List</h2>
      <SearchInput
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <SortButton onClick={() => handleSort('dueDate')}>Sort by Due Date {sortConfig.key === 'dueDate' ? sortConfig.direction === 'ascending' ? '▲' : '▼': ''}</SortButton>
      <SortButton onClick={() => handleSort('priority')}>Sort by Priority {sortConfig.key === 'priority' ? sortConfig.direction === 'ascending' ? '▲' : '▼': ''}</SortButton>
      </FilterContainor>
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} onClick={() => handleTaskSelect(task)} onEdit={() => handleEdit(task)}
        onDelete={() => handleDelete(task.id)}/>
      ))}
    </TaskListContainer>
  );
};

export default TaskList;
