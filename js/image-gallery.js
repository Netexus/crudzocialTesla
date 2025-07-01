// Image Gallery functionality

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const gallery = document.getElementById('gallery');

// Drag and Drop handlers
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('dragleave', handleDragLeave);
dropZone.addEventListener('drop', handleDrop);
fileInput.addEventListener('change', handleFileSelect);

// Event handlers
function handleDragOver(e) {
  e.preventDefault();
  dropZone.classList.add('dragover');
}

function handleDragLeave() {
  dropZone.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  handleDragLeave();
  const files = e.dataTransfer.files;
  processFiles(files);
}

function handleFileSelect(e) {
  const files = e.target.files;
  processFiles(files);
}

// File processing
function processFiles(files) {
  Array.from(files).forEach(file => {
    if (isValidImage(file)) {
      processImageFile(file);
    } else {
      showNotification(`Invalid file type: ${file.name}`, 'danger');
    }
  });
}

function isValidImage(file) {
  return file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024; // 5MB max
}

function processImageFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    addImageToGallery(e.target.result, file.name);
    logActivity(`Uploaded image: ${file.name}`);
  };
  reader.readAsDataURL(file);
}

// Gallery management
function addImageToGallery(imageData, fileName) {
  const imageCard = document.createElement('div');
  imageCard.className = 'image-card';
  
  imageCard.innerHTML = `
    <img src="${imageData}" alt="${fileName}">
    <div class="image-actions">
      <button class="button is-small is-info">Edit</button>
      <button class="button is-small is-danger">Delete</button>
    </div>
  `;

  gallery.appendChild(imageCard);
  
  // Add event listeners to action buttons
  imageCard.querySelector('.is-info').addEventListener('click', () => {
    editImage(imageCard);
  });
  
  imageCard.querySelector('.is-danger').addEventListener('click', () => {
    deleteImage(imageCard);
  });
}

// Image actions
function editImage(imageCard) {
  const image = imageCard.querySelector('img');
  const fileName = image.alt;
  
  // TODO: Implement image editing functionality
  showNotification(`Edit functionality coming soon for: ${fileName}`);
}

function deleteImage(imageCard) {
  const fileName = imageCard.querySelector('img').alt;
  
  if (confirm(`Are you sure you want to delete this image?`)) {
    imageCard.remove();
    logActivity(`Deleted image: ${fileName}`);
    showNotification(`Image deleted: ${fileName}`);
  }
}

// Activity logging
function logActivity(action) {
  // TODO: Implement actual logging functionality
  console.log(`Activity: ${action}`);
}
