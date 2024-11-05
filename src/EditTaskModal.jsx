// EditTaskModal.js
import React, { useState } from 'react';

function EditTaskModal({ task, onClose, onSave, topics }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(`${task.dueDate.year}-${String(task.dueDate.month).padStart(2, '0')}-${String(task.dueDate.day).padStart(2, '0')}`);
    const [topic, setTopic] = useState(task.topic);

    const handleSave = () => {
        const [year, month, day] = dueDate.split('-').map(Number);
        onSave({ title, description, dueDate: { day, month, year }, topic });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>ערוך משימה</h3>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="כותרת המשימה" 
                />
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="תיאור המשימה"
                />
                <input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                />
                <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                    {topics.map((topicOption, index) => (
                        <option key={index} value={topicOption}>
                            {topicOption}
                        </option>
                    ))}
                </select>
                <button onClick={handleSave}>שמור שינויים</button>
                <button onClick={onClose}>סגור</button>
            </div>
        </div>
    );
}

export default EditTaskModal;
