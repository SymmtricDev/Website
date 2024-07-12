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

    // Form submission logic (e.g., sending data to server)
    // Here, we'll just log the data to the console  
    console.log({
        name: name,
        email: email,
        feedbackType: feedbackType,
        message: message
    });

    // Optionally, you can show a confirmation message to the user
    alert('Thank you for your feedback!');
    
    // Reset the form
    document.getElementById('feedbackForm').reset();
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
