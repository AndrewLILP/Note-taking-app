import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Notes.css';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', body: '' });

    const handleDelete = (id) => {
        setIsDeleting(true);
        
        // Since we're managing notes locally, we can just remove it from state
        setNotes(notes.filter(note => note.id !== id));
        setIsDeleting(false);
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        
        if (!newNote.title || !newNote.body) {
            alert('Please fill out both title and body fields');
            return;
        }

        const noteToAdd = {
            id: Date.now(), // Use timestamp as a simple unique ID
            title: newNote.title,
            body: newNote.body,
            userId: 1 // Default userId for simplicity
        };

        setNotes([noteToAdd, ...notes]);
        setNewNote({ title: '', body: '' });
        setShowAddForm(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNote({
            ...newNote,
            [name]: value
        });
    };

    return (
        <div className="notes-container">
            <div className="notes-header">
                <h2>Notes List</h2>
                <button 
                    className="add-button" 
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Cancel' : 'Add Note'}
                </button>
            </div>

            {showAddForm && (
                <div className="add-note-form">
                    <h3>Add New Note</h3>
                    <form onSubmit={handleAddNote}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newNote.title}
                                onChange={handleInputChange}
                                placeholder="Enter note title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Content</label>
                            <textarea
                                id="body"
                                name="body"
                                value={newNote.body}
                                onChange={handleInputChange}
                                placeholder="Enter note content"
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="save-button">Save Note</button>
                            <button 
                                type="button" 
                                className="cancel-button"
                                onClick={() => setShowAddForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {notes.length === 0 && !showAddForm ? (
                <div className="empty-notes">
                    <p>You don't have any notes yet. Click "Add Note" to create one.</p>
                </div>
            ) : (
                <ul>
                    {notes.map(note => (
                        <li key={note.id} className="note-card">
                            <h3>{note.title}</h3>
                            <p>{note.body.substring(0, 100)}...</p>
                            <div className="note-actions">
                                <Link to={`/notes/${note.id}`} className="view-link">View Full Note</Link>
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDelete(note.id)}
                                    disabled={isDeleting}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notes;