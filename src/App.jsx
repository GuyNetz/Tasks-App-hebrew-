import React, { useState, useEffect } from 'react';
import Header from './Header';
import FilterDropdown from './FilterDropdown';
import TaskList from './TaskList';
import Modal from './Modal';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';

function App() {
    const [topics, setTopics] = useState(() => {
        const savedTopics = localStorage.getItem('topics');
        return savedTopics ? JSON.parse(savedTopics) : [];
    });
    
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [selectedTopic, setSelectedTopic] = useState('כל המשימות');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        localStorage.setItem('topics', JSON.stringify(topics));
    }, [topics]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleSelectTopic = (topic) => {
        setSelectedTopic(topic);
    };

    const handleAddTopic = (newTopic) => {
        setTopics([...topics, newTopic]);
        setIsModalOpen(false);
    };

    const handleAddTask = (newTask) => {
        setTasks([...tasks, { ...newTask, completed: false }]); // מאפיין completed כברירת מחדל
        setIsAddTaskModalOpen(false);
    };

    const toggleCompleteTask = (taskIndex) => {
        const updatedTasks = tasks.map((task, index) => 
            index === taskIndex ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (taskIndex) => {
        const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
        setTasks(updatedTasks);
    };

    const handleEditTask = (updatedTask) => {
        const updatedTasks = tasks.map((task) =>
            task === taskToEdit ? updatedTask : task
        );
        setTasks(updatedTasks);
        setIsEditTaskModalOpen(false);
        setTaskToEdit(null);
    };

    const openEditModal = (task) => {
        setTaskToEdit(task);
        setIsEditTaskModalOpen(true);
    };

    return (
        <div className="app">
            <Header />
            <FilterDropdown 
                topics={topics} 
                selectedTopic={selectedTopic} 
                onSelectTopic={handleSelectTopic} 
                onAddTopic={() => setIsModalOpen(true)} 
                onDeleteAllTopics={() => setTopics([])}
            />
            <TaskList 
                tasks={tasks} 
                selectedTopic={selectedTopic} 
                onDeleteTask={handleDeleteTask} 
                onEditTask={openEditModal}
                onToggleComplete={toggleCompleteTask} // הוספת פונקציית השלמת משימה
            />
            
            <button className='add-task-button' onClick={() => setIsAddTaskModalOpen(true)}>
                <div class="add-icon">+</div>
                <div className='add-task-button-writing'>הוסף משימה חדשה</div>
            </button>

            
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} onAddTopic={handleAddTopic} />
            )}

            {isAddTaskModalOpen && (
                <AddTaskModal onClose={() => setIsAddTaskModalOpen(false)} onAddTask={handleAddTask} topics={topics} />
            )}

            {isEditTaskModalOpen && taskToEdit && (
                <EditTaskModal 
                    task={taskToEdit} 
                    onClose={() => setIsEditTaskModalOpen(false)} 
                    onSave={handleEditTask} 
                    topics={topics} 
                />
            )}
        </div>
    );
}

export default App;
