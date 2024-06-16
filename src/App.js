import React, { useContext, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import GlobalStyle from './styles/globalStyles';
import Modal from './components/Modal';
import styled from 'styled-components';
import  {TaskContext, TaskProvider } from './context/TaskContext';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const AddTaskButton = styled.button`
  margin: 20px 0;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: blue;
  color: white;
  cursor: pointer;
  font-size: 1rem;
`;

const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const {deleteTask,setTaskToEdit,taskToEdit,sortTasks} = useContext(TaskContext)
  const handleTaskSelect = task => {
    setSelectedTask(task);
    setIsDetailVisible(true);
  };

  const handleTaskEdit = (task) => {
    setTaskToEdit(task)
    setIsModalOpen(true);
  }

  const handleFormSubmit = () => {
    setIsModalOpen(false);
  };

  const handleBack = () => {
    setIsDetailVisible(false);
    setSelectedTask(null);
    sortTasks();
  };

  const handleDelete = (task = selectedTask) => {
    setIsDetailVisible(false);
    setSelectedTask(null);
  };

  return (
    <TaskProvider>
      <GlobalStyle />
      <AppContainer>
        <AddTaskButton onClick={() => {setTaskToEdit(null);setIsModalOpen(true);}}>Add Task</AddTaskButton>
        {!isDetailVisible ? (
          <TaskList onSelectTask={handleTaskSelect} onTaskEdit={handleTaskEdit} />
        ) : (
          <TaskDetail taskId={selectedTask.id} onBack={handleBack} onEdit={handleTaskEdit} onDelete={handleDelete}/>
        )}
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <TaskForm taskToEdit={taskToEdit} onFormSubmit={handleFormSubmit} />
        </Modal>
      </AppContainer>
    </TaskProvider>
  );
};

export default App;
