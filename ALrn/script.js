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
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        if (link.href.includes(currentPath)) {
            link.classList.add('active');
        }
    });
});
function handleOrientationChange() {
    if (window.orientation === 0 || window.orientation === 180) {
        // Portrait mode
        document.body.style.display = "block";
    } else if (window.orientation === 90 || window.orientation === -90) {
        // Landscape mode
        document.body.style.display = "none";
        alert("Please use the site in portrait mode for the best experience.");
    }
}

// Initial check
handleOrientationChange();

// Listen for orientation changes
window.addEventListener("orientationchange", handleOrientationChange);
// 
// 
// 
// 
function checkDesktopModeOnMobile() {
    function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    if (isMobileDevice() && window.innerWidth > window.innerHeight) {
        document.body.style.display = "none";
        alert("Please disable desktop mode on your mobile device.");
    } else {
        document.body.style.display = "block";
    }
}

// Initial check
checkDesktopModeOnMobile();

// Listen for viewport resizing
window.addEventListener("resize", checkDesktopModeOnMobile);
