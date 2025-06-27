document.addEventListener('DOMContentLoaded', () => {
    // Navigation handling
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = e.target.dataset.section;
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
            
            // Show selected section
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        
        // Add login logic here
        console.log('Login attempt:', { username, password });
        
        // For demo, switch to notes section on successful login
        document.querySelector('nav a[data-section="notes"]').click();
    });

    // Notes functionality
    const addNoteButton = document.getElementById('addNote');
    const notesContainer = document.querySelector('.notes-container');
    
    addNoteButton.addEventListener('click', () => {
        const note = prompt('Enter your note:');
        if (note) {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.textContent = note;
            notesContainer.appendChild(noteElement);
            
            // Add to logs
            addLog('Added new note: ' + note);
        }
    });

    // Image upload functionality
    const imageUpload = document.getElementById('imageUpload');
    const uploadImage = document.getElementById('uploadImage');
    const uploadedImages = document.querySelector('.uploaded-images');
    
    uploadImage.addEventListener('click', () => {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                uploadedImages.appendChild(img);
                
                // Add to gallery
                const galleryGrid = document.querySelector('.gallery-grid');
                galleryGrid.appendChild(img.cloneNode());
                
                // Add to logs
                addLog('Uploaded new image: ' + file.name);
            };
            reader.readAsDataURL(file);
        }
    });

    // Logs functionality
    function addLog(message) {
        const logsContainer = document.querySelector('.logs-container');
        const logEntry = document.createElement('div');
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logsContainer.appendChild(logEntry);
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }
});
