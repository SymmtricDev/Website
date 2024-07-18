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

    // Send data using fetch
    fetch('http://35.154.84.244:8000/submit-feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            feedbackType: feedbackType,
            message: message
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for your feedback!');
            // Reset the form
            document.getElementById('feedbackForm').reset();
        } else {
            alert('Something went wrong. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
    });
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
