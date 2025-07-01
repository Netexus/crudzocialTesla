// Profile functionality

// DOM Elements
const profileForm = document.querySelector('form');
const activityLog = document.getElementById('activityLog');

// Sample user data
let currentUser = {
  id: 1,
  name: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  zipCode: '',
  bio: ''
};

// Load user data
function loadUserData() {
  // TODO: Implement actual data loading
  const profileData = localStorage.getItem('currentUser');
  if (profileData) {
    Object.assign(currentUser, JSON.parse(profileData));
    updateFormValues();
  }
}

// Update form values
function updateFormValues() {
  document.querySelector('input[name="name"]').value = currentUser.name;
  document.querySelector('input[name="lastName"]').value = currentUser.lastName;
  document.querySelector('input[name="email"]').value = currentUser.email;
  document.querySelector('input[name="phone"]').value = currentUser.phone;
  document.querySelector('input[name="address"]').value = currentUser.address;
  document.querySelector('input[name="city"]').value = currentUser.city;
  document.querySelector('input[name="country"]').value = currentUser.country;
  document.querySelector('input[name="zipCode"]').value = currentUser.zipCode;
  document.querySelector('textarea[name="bio"]').value = currentUser.bio;
}

// Form submission
profileForm.addEventListener('submit', handleProfileSubmit);

function handleProfileSubmit(e) {
  e.preventDefault();
  
  // Get form values
  const formData = new FormData(profileForm);
  
  // Update user data
  currentUser = {
    ...currentUser,
    name: formData.get('name'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    city: formData.get('city'),
    country: formData.get('country'),
    zipCode: formData.get('zipCode'),
    bio: formData.get('bio')
  };
  
  // Save to localStorage
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  // Log activity
  logActivity('Updated profile information');
  
  // Show success message
  showNotification('Profile updated successfully');
}

// Activity logging
function logActivity(action) {
  const activityItem = document.createElement('div');
  activityItem.className = 'activity-item';
  
  const time = formatDate(new Date());
  activityItem.innerHTML = `
    <strong>${action}</strong>
    <span class="activity-time">${time}</span>
  `;
  
  activityLog.prepend(activityItem);
  
  // Save to localStorage
  const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
  activities.unshift({
    action,
    time: new Date().toISOString()
  });
  localStorage.setItem('userActivities', JSON.stringify(activities));
}

// Load existing activities
function loadActivities() {
  const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
  activities.forEach(activity => {
    logActivity(activity.action);
  });
}

// Initialize
function init() {
  loadUserData();
  loadActivities();
}

// Run initialization
document.addEventListener('DOMContentLoaded', init);
