// header line listener
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        if (link.href.includes(currentPath)) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const resultImage = localStorage.getItem('resultImage');
    if (resultImage) {
        document.getElementById('result-image').src = resultImage;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.querySelector('.squiz-quiz-next');

    if (nextButton) {
        nextButton.style.marginLeft = '4rem'; // Initial state

        nextButton.addEventListener('click', function() {
            nextButton.style.marginLeft = '0'; // Change margin-left to 0 after click
        });
    }
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

// window.addEventListener('load', function() {
//     var video = document.getElementById('heroVideo');
//     video.onended = function() {
//         video.style.display = 'none'; // Hide the video when it's done
//     };
// });
window.addEventListener('load', function() {
    var gif = document.getElementById('heroGif');
    
    // Reload the GIF to make it play once
    gif.src = gif.src + '?' + new Date().getTime(); // Bypass cache to force reload

    // Add an event listener to remove the GIF source once it has played to prevent looping
    gif.addEventListener('load', function() {
        setTimeout(function() {
            gif.style.display = 'none'; // Hide the GIF once it's done playing
        }, 5000); // Adjust the timeout duration based on the GIF's length
    });
});
