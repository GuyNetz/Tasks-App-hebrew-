import React, { useState } from 'react';

function FilterDropdown({ topics, selectedTopic, onSelectTopic, onAddTopic, onDeleteAllTopics }) {
    const [confirmDelete, setConfirmDelete] = useState(false); // מצב למחיקת כל הנושאים

    const handleSelectChange = (event) => {
        onSelectTopic(event.target.value);
    };

    const handleDeleteClick = () => {
        if (confirmDelete) {
            onDeleteAllTopics();
            setConfirmDelete(false);
        } else {
            setConfirmDelete(true);
        }
    };

    return (
        <div className="filter-dropdown">
            <select className="select-task" value={selectedTopic} onChange={handleSelectChange}>
                <option value="כל המשימות">כל המשימות</option>
                {topics.map((topic, index) => (
                    <option key={index} value={topic}>
                        {topic}
                    </option>
                ))}
            </select>
            <button className='add-subject' onClick={onAddTopic}>הוסף נושא</button>
            <button className='delete-all' onClick={handleDeleteClick}>
                {confirmDelete ? 'לחץ לאישור' : 'מחק נושאים'}
            </button>
        </div>
    );
}

export default FilterDropdown;
