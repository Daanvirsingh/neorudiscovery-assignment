import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft ,faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';
import {TaskContext} from '../context/TaskContext';

const DetailContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  padding-top: 50px;
  margin-bottom: 20px;
  position: relative;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 50px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const TaskTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
  color: #333;
`;

const TaskDescription = styled.p`
  margin: 10px 0;
  color: #666;
`;

const TaskDueDate = styled.div`
  margin-top: 10px;
  font-size: 1em;
  color: #999;
`;

const TaskPriority = styled.div`
  margin-top: 10px;
  font-size: 1em;
  color: ${props => (props.priority === 'High' ? 'red' : props.priority === 'Medium' ? 'orange' : 'green')};
`;

const TaskDetail = ({ taskId, onBack, onEdit ,onDelete}) => {
  const { tasks,deleteTask} = useContext(TaskContext);


    const task = tasks.find(t=>t.id === taskId)
    if (!task) return <div>Task not found</div>;
  return (
    <DetailContainer>
      <BackButton onClick={onBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </BackButton>
      <EditButton onClick={()=>onEdit(task)}>
        <FontAwesomeIcon icon={faEdit} />
      </EditButton>
      <DeleteButton onClick={()=>{deleteTask(task.id);onDelete(task)}}>
        <FontAwesomeIcon icon={faTrash} />
      </DeleteButton>
      <TaskTitle>{task.title}</TaskTitle>
      <TaskDescription>{task.description}</TaskDescription>
      <TaskDueDate>Due Date: {task.dueDate}</TaskDueDate>
      <TaskPriority priority={task.priority}>Priority: {task.priority}</TaskPriority>
    </DetailContainer>
  );
};

export default TaskDetail;
