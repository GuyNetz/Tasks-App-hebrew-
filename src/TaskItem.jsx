import React from 'react';

function TaskItem({ title, description, dueDate, completed, onDelete, onEdit, onToggleComplete }) {
    const calculateDaysLeft = (day, month, year) => {
        const today = new Date();
        const due = new Date(year, month - 1, day, 0, 0, 0);
        const timeDifference = due - today;
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysLeft >= 0 ? daysLeft : 0;
    };

    const daysLeft = calculateDaysLeft(dueDate.day, dueDate.month, dueDate.year);

    return (
        <div className={`task-item ${completed ? 'completed' : ''}`}>
            <h3>{title}</h3>
            <p>{description}</p>
            <p className='due-date'><strong>{`${dueDate.day}/${dueDate.month}`}</strong></p>
            <p><strong>ימים נותרו:</strong> <span className='days-left'>{daysLeft}</span></p>
            <div className='task-item-buttons'>

                <button className="edit-button" onClick={onEdit}>ערוך</button>
                <button className="mark-as-completed-button" onClick={onToggleComplete}>{completed ? 'בטל השלמה' : 'סמן כהושלם'}</button>
                <button className="delete-button" onClick={onDelete}>מחק</button>
            </div>
        </div>
    );
}

export default TaskItem;
