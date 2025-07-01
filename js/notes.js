// Notes functionality

// DOM Elements
const notesContainer = document.getElementById('notesContainer');
const newNoteForm = document.getElementById('newNoteForm');
const noteTitleInput = document.getElementById('noteTitle');
const noteContentInput = document.getElementById('noteContent');

// Sample notes data
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Load notes
function loadNotes() {
  notesContainer.innerHTML = '';
  notes.forEach((note, index) => {
    addNoteToDOM(note, index);
  });
}

// Add note to DOM
function addNoteToDOM(note, index) {
  const noteCard = document.createElement('div');
  noteCard.className = 'card';
  
  noteCard.innerHTML = `
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">${note.title}</p>
          <p class="subtitle is-6">${formatDate(note.createdAt)}</p>
        </div>
        <div class="media-right">
          <button class="delete" onclick="deleteNote(${index})"></button>
        </div>
      </div>
      <div class="content">
        ${note.content}
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item" onclick="editNote(${index})">Edit</a>
    </footer>
  `;
  
  notesContainer.appendChild(noteCard);
}

// Add new note
function addNote() {
  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();
  
  if (!title || !content) {
    showNotification('Please fill in both title and content', 'danger');
    return;
  }
  
  const note = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date().toISOString()
  };
  
  notes.push(note);
  saveNotes();
  loadNotes();
  
  // Clear form
  newNoteForm.reset();
  
  // Log activity
  logActivity('Created new note');
  
  // Show success message
  showNotification('Note added successfully');
}

// Edit note
function editNote(index) {
  const note = notes[index];
  const title = prompt('Enter new title:', note.title);
  const content = prompt('Enter new content:', note.content);
  
  if (title && content) {
    note.title = title;
    note.content = content;
    note.updatedAt = new Date().toISOString();
    
    saveNotes();
    loadNotes();
    
    // Log activity
    logActivity('Updated note');
    
    showNotification('Note updated successfully');
  }
}

// Delete note
function deleteNote(index) {
  if (confirm('Are you sure you want to delete this note?')) {
    notes.splice(index, 1);
    saveNotes();
    loadNotes();
    
    // Log activity
    logActivity('Deleted note');
    
    showNotification('Note deleted successfully');
  }
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Form submission
newNoteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addNote();
});

// Activity logging
function logActivity(action) {
  // TODO: Implement actual logging functionality
  console.log(`Activity: ${action}`);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadNotes();
});
