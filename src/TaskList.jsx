import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, selectedTopic, onDeleteTask, onEditTask, onToggleComplete }) {
    const filteredTasks = selectedTopic === "כל המשימות" 
        ? tasks 
        : tasks.filter(task => task.topic === selectedTopic);

    const sortedTasks = filteredTasks.sort((a, b) => {
        const dateA = new Date(a.dueDate.year, a.dueDate.month - 1, a.dueDate.day);
        const dateB = new Date(b.dueDate.year, b.dueDate.month - 1, b.dueDate.day);
        return dateA - dateB;
    });

    return (
        <div className="task-list">
            {sortedTasks.length > 0 ? (
                sortedTasks.map((task, index) => (
                    <TaskItem 
                        key={index} 
                        title={task.title} 
                        description={task.description} 
                        dueDate={task.dueDate}
                        completed={task.completed} // העברת מצב ההשלמה
                        onDelete={() => onDeleteTask(index)}
                        onEdit={() => onEditTask(task)}
                        onToggleComplete={() => onToggleComplete(index)} // כפתור לסימון כהושלם
                    />
                ))
            ) : (
                <p>אין משימות להצגה</p>
            )}
        </div>
    );
}

export default TaskList;
