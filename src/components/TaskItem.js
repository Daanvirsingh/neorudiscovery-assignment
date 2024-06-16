import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const TaskItemContainer = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f9f9f9;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const TaskInfo = styled.div`
  flex: 1;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 10px;
`;

const TaskTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
  color: #333;
`;

const TaskDescription = styled.p`
  margin: 5px 0 0;
  color: #666;
`;

const TaskDueDate = styled.span`
  display: block;
  margin-top: 10px;
  font-size: 0.9em;
  color: #999;
`;

const TaskPriority = styled.span`
  display: block;
  margin-top: 10px;
  font-size: 0.9em;
  color: ${props => (props.priority === 'High' ? 'red' : props.priority === 'Medium' ? 'orange' : 'green')};
`;

const TaskItem = ({ task, onClick, onEdit, onDelete }) => {
  return (
    <TaskItemContainer>
      <TaskInfo onClick={onClick}>
        <TaskTitle>{task.title}</TaskTitle>
        <TaskDescription>
          {task.description.length > 100 ? `${task.description.substring(0, 100)}...` : task.description}
        </TaskDescription>
        <TaskDueDate>Due: {task.dueDate}</TaskDueDate>
        <TaskPriority priority={task.priority}>Priority: {task.priority}</TaskPriority>
      </TaskInfo>
      <TaskActions>
        <FontAwesomeIcon icon={faEdit} onClick={onEdit} style={{ cursor: 'pointer' }} />
        <FontAwesomeIcon icon={faTrash} onClick={onDelete} style={{ cursor: 'pointer' }} />
      </TaskActions>
    </TaskItemContainer>
  );
};

export default TaskItem;
