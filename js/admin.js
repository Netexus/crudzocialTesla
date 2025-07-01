// Admin Panel functionality

// DOM Elements
const usersTable = document.getElementById('usersTable');
const searchInput = document.getElementById('searchInput');
const systemLog = document.getElementById('systemLog');

// Sample users data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', lastLogin: '2025-07-01 14:00' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', lastLogin: '2025-07-01 15:00' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', lastLogin: '2025-07-01 16:00' }
];

// Sample system log data
const systemActivities = [
  { 
    user: "John Doe",
    actions: [
      { action: "Created new note", time: "2025-07-01 15:00" },
      { action: "Uploaded image", time: "2025-07-01 14:30" }
    ]
  },
  { 
    user: "Jane Smith",
    actions: [
      { action: "Updated profile", time: "2025-07-01 14:00" }
    ]
  }
];

// Load users
function loadUsers() {
  const tbody = usersTable.querySelector('tbody');
  tbody.innerHTML = '';
  
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${formatDate(user.lastLogin)}</td>
      <td>
        <button class="button is-small is-info" onclick="editUser(${user.id})">Edit</button>
        <button class="button is-small is-danger" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Load system log
function loadSystemLog() {
  systemLog.innerHTML = '';
  
  systemActivities.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.className = 'user-activity';
    userDiv.innerHTML = `<strong>${user.user}:</strong>`;
    systemLog.appendChild(userDiv);
    
    user.actions.forEach(action => {
      const activityItem = document.createElement('div');
      activityItem.className = 'activity-item';
      activityItem.innerHTML = `
        <span class="activity-time">${formatDate(action.time)}</span>
        <strong>${action.action}</strong>
      `;
      systemLog.appendChild(activityItem);
    });
  });
}

// Search functionality
function searchUsers() {
  const searchTerm = searchInput.value.toLowerCase();
  const tbody = usersTable.querySelector('tbody');
  tbody.innerHTML = '';
  
  users.forEach(user => {
    if (user.name.toLowerCase().includes(searchTerm) || 
        user.email.toLowerCase().includes(searchTerm)) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${formatDate(user.lastLogin)}</td>
        <td>
          <button class="button is-small is-info" onclick="editUser(${user.id})">Edit</button>
          <button class="button is-small is-danger" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    }
  });
}

// Edit user
function editUser(userId) {
  const user = users.find(u => u.id === userId);
  if (!user) return;
  
  const newName = prompt('Enter new name:', user.name);
  const newEmail = prompt('Enter new email:', user.email);
  
  if (newName && newEmail) {
    user.name = newName;
    user.email = newEmail;
    loadUsers();
    
    // Log activity
    logActivity(`Updated user: ${newName}`);
    
    showNotification('User updated successfully');
  }
}

// Delete user
function deleteUser(userId) {
  if (confirm('Are you sure you want to delete this user?')) {
    const index = users.findIndex(u => u.id === userId);
    if (index > -1) {
      users.splice(index, 1);
      loadUsers();
      
      // Log activity
      logActivity('Deleted user');
      
      showNotification('User deleted successfully');
    }
  }
}

// Activity logging
function logActivity(action) {
  // TODO: Implement actual logging functionality
  console.log(`Activity: ${action}`);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
  loadSystemLog();
  
  // Add search event listener
  searchInput.addEventListener('input', searchUsers);
});
