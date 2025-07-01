// Utility functions

// Format date/time
function formatDate(date) {
  return new Date(date).toLocaleString();
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification is-${type}`;
  notification.innerHTML = `
    <button class="delete"></button>
    ${message}
  `;
  document.body.appendChild(notification);

  // Close notification when clicked
  notification.querySelector('.delete').addEventListener('click', () => {
    notification.remove();
  });

  // Auto-close after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number
function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

// Export all functions
export {
  formatDate,
  showNotification,
  isValidEmail,
  isValidPhone
};
