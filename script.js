// script.js for Wonderlearn Website

// Function to validate form input
function validateForm() {
    const form = document.getElementById('myForm');
    const inputField = form.querySelector('input[type="text"]');
    const errorMessage = document.getElementById('error-message');

    if (inputField.value.trim() === '') {
        errorMessage.textContent = 'Input cannot be empty.';
        return false;
    } else {
        errorMessage.textContent = '';
        return true;
    }
}

// Function to submit the form
function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission

    if (validateForm()) {
        const formData = new FormData(event.target);
        console.log('Form submitted successfully:', Object.fromEntries(formData.entries()));
        // Here you can add the AJAX request to submit the form data
    }
}

// Add event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    form.addEventListener('submit', submitForm);
});

// Example of DOM manipulation
const welcomeMessage = document.getElementById('welcome-message');
if (welcomeMessage) {
    welcomeMessage.textContent = 'Welcome to the Wonderlearn website!';
}