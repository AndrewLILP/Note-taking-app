import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/NoteDetail.css';

const NoteDetail = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // For demonstration purposes, we'll check if there are notes in localStorage
        const notesFromStorage = localStorage.getItem('notes');
        const parsedNotes = notesFromStorage ? JSON.parse(notesFromStorage) : [];
        
        // Find the note with the matching id
        const foundNote = parsedNotes.find(note => note.id == id);
        
        if (foundNote) {
            setNote(foundNote);
            setLoading(false);
        } else {
            // Fallback to JSONPlaceholder API for demo purposes
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then(response => response.json())
                .then(data => {
                    setNote(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!note) {
        return <div className="error">Note not found</div>;
    }

    return (
        <div className="note-detail-container">
            <div className="note-header">
                <h2>{note.title}</h2>
                <p className="note-meta">Note ID: {note.id}</p>
            </div>
            <div className="note-body">
                <p>{note.body}</p>
            </div>
            <div className="note-actions">
                <Link to="/notes" className="back-link">Back to Notes</Link>
            </div>
        </div>
    );
};

export default NoteDetail;