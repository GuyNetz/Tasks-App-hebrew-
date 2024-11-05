// Modal.js
import React, { useState } from 'react';


function Modal({ onClose, onAddTopic }) {
    const [newTopic, setNewTopic] = useState('');

    const handleAdd = () => {
        if (newTopic.trim()) {
            onAddTopic(newTopic);
            setNewTopic('');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>הוסף נושא חדש</h3>
                <input 
                    type="text" 
                    value={newTopic} 
                    onChange={(e) => setNewTopic(e.target.value)} 
                    placeholder="שם הנושא החדש"
                />
                <button onClick={handleAdd}>הוסף</button>
                <button onClick={onClose}>סגור</button>
            </div>
        </div>
    );
}

export default Modal;
