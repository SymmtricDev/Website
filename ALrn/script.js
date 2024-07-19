document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedbackType = document.getElementById('feedbackType').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !feedbackType || !message) {
        alert('Please fill out all fields.');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://symmatric.com/api/submit-feedback', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                alert('Thank you for your feedback!');
                document.getElementById('feedbackForm').reset();
            } else {
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
