document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('new-note-form');
    const notesContainer = document.getElementById('notes-container');
  
    // Function to fetch notes from the API
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/notes', {
          headers: {
            'Authorization': `Bearer YOUR_ACCESS_TOKEN`
          }
        });
        const notes = await response.json();
        notesContainer.innerHTML = '';
        notes.forEach(note => {
          const noteElement = createNoteElement(note);
          notesContainer.appendChild(noteElement);
        });
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
  
    // Function to create a new note element
    const createNoteElement = (note) => {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
      noteDiv.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <p><strong>Tags:</strong> ${note.tags.join(', ')}</p>
      `;
      return noteDiv;
    };
  
    // Event listener for form submission
    noteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
      const newNote = { title, content, tags };
  
      try {
        const response = await fetch('http://localhost:3000/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_ACCESS_TOKEN`
          },
          body: JSON.stringify(newNote)
        });
        const createdNote = await response.json();
        notesContainer.appendChild(createNoteElement(createdNote));
        noteForm.reset();
      } catch (error) {
        console.error('Error creating note:', error);
      }
    });
  
    // Fetch notes when the page loads
    fetchNotes();
  });
  