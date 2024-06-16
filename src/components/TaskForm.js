import React, { useState, useContext, useEffect } from 'react';

import styled from 'styled-components';
import { TaskContext } from '../context/TaskContext';



const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: ${props => (props.primary ? 'blue' : 'gray')};
  color: white;
  cursor: pointer;
`;

const TaskForm = ({ taskToEdit, onFormSubmit }) => {
    const { addTask, updateTask } = useContext(TaskContext);
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low'
    });

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
        }
    }, [taskToEdit]);

    const handleChange = e => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (taskToEdit) {
            updateTask(task);
        } else {
            addTask(task);
        }
        onFormSubmit();
    };

    return (
    <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
        />
        <Textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
        ></Textarea>
        <Input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />
        <Select
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Select>
        <Button type="submit" primary>{taskToEdit ? 'Update' : 'Add'} Task</Button>
      </Form>
    );
};

export default TaskForm;
