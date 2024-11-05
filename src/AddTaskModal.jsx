// AddTaskModal.js
import React, { useState } from 'react';


function AddTaskModal({ onClose, onAddTask, topics }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [topic, setTopic] = useState(topics[0] || ''); // ברירת מחדל לנושא הראשון ברשימה

    const handleAdd = () => {
        if (title.trim() && dueDate && topic) {
            const [year, month, day] = dueDate.split('-').map(Number); // פירוק התאריך לפורמט שנה-חודש-יום
            onAddTask({ title, description, dueDate: { day, month, year }, topic });
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>הוסף משימה חדשה</h3>
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
                <button onClick={handleAdd}>הוסף משימה</button>
                <button onClick={onClose}>סגור</button>
            </div>
        </div>
    );
}

export default AddTaskModal;
