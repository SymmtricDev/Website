document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Extract form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedbackType = document.getElementById('feedbackType').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !feedbackType || !message) {
        alert('Please fill out all fields.');
        return;
    }

    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://35.154.84.244:5000/submit-feedback', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Handle response
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Success
                alert('Thank you for your feedback!');
                // Reset the form
                document.getElementById('feedbackForm').reset();
            } else {
                // Error
                alert('Something went wrong. Please try again later.');
            }
        }
    };

    // Send data
    const data = JSON.stringify({
        name: name,
        email: email,
        feedbackType: feedbackType,
        message: message
    });
    xhr.send(data);
});


document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
});
function toggleMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    burgerMenu.classList.toggle('open');
    mobileNav.classList.toggle('open');
}
