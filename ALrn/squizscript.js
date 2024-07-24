document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            image: 'images/symsqbg.svg',
            question: 'Before starting the Squiz please enter your email address to receive updates.',
            text: '',
            options: []
        },
        {
            image: 'images/symsqbg.svg',
            question: 'How often do you update your wardrobe?',
            text: '',
            options: ['Only when I absolutely have to.', 'When I find something that perfectly fits my vibe.', "All the time, I'm a fashion chameleon!"]
        },
        {
            image: 'images/symsqbg.svg',
            question: 'When shopping for clothes, what do you prioritize?',
            text: '',
            options: ['Whatever’s comfy and easy on the wallet.', 'Pieces that blend seamlessly with my wardrobe.', 'The latest trends and eye-catching pieces.']
        },
        {
            image: 'images/symsqbg.svg',
            question: 'How do you describe your style?',
            text: '',
            options: ['Style? What’s that?', 'I’ve got my signature look down.', 'A work in progress, always evolving.']
        },
        {
            image: 'images/symsqbg.svg',
            question: 'How often do you seek fashion inspiration?',
            text: '',
            options: ['Almost never, I just go with the flow.', 'Now and then, to keep things fresh.', 'Constantly, I live and breathe fashion!']
        },
        {
            image: 'images/symsqbg.svg',
            question: 'How confident are you in your fashion choices?',
            text: '',
            options: ['Not really, I just throw on whatever.', 'Totally, I know what works for me.', "Getting there, I'm on a stylish journey."]
        }
    ];

    let currentQuestionIndex = 0;
    let userEmail = '';

    const quizImage = document.querySelector('.squiz-quiz-image');
    const quizContent = document.querySelector('.squiz-quiz-content');
    const quizOptions = document.querySelector('.squiz-radio-options');
    const progressDots = document.querySelectorAll('.squiz-progress-dot');
    const nextButton = document.querySelector('.squiz-quiz-next');
    const backButton = document.querySelector('.squiz-quiz-back');
    const finishButton = document.querySelector('.squiz-quiz-finish');
    const questionCountElement = document.querySelector('.squiz-question-count');
    const currentQuestionElement = document.getElementById('current-question');
    const selectedOptions = [];

    function updateQuiz() {
        const currentQuestion = questions[currentQuestionIndex];
        quizImage.src = currentQuestion.image;
        if (currentQuestionIndex === 0) {
            quizContent.querySelector('h2').textContent = currentQuestion.question;
            quizContent.querySelector('p').innerHTML = '<input type="email" class="email-input" placeholder="Enter your email">';
            quizOptions.style.display = 'none';
            questionCountElement.style.display = 'none';
        } else {
            quizContent.querySelector('h2').textContent = currentQuestion.question;
            quizContent.querySelector('p').textContent = currentQuestion.text;
            quizOptions.style.display = 'block';
            quizOptions.innerHTML = ''; // Clear any previous options
            currentQuestion.options.forEach((option, index) => {
                const radioOptionDiv = document.createElement('div');
                radioOptionDiv.classList.add('radio-option');
                
                const radioButton = document.createElement('input');
                radioButton.type = 'radio';
                radioButton.name = 'option';
                radioButton.value = option;
                radioButton.id = `option-${index}`;

                const label = document.createElement('label');
                label.textContent = option;
                label.htmlFor = `option-${index}`;

                radioOptionDiv.appendChild(radioButton);
                radioOptionDiv.appendChild(label);
                quizOptions.appendChild(radioOptionDiv);
            });
            questionCountElement.style.display = 'block';
        }
        updateProgressDots();
        updateQuestionCount();

        if (currentQuestionIndex === questions.length - 1) {
            nextButton.style.display = 'none';
            finishButton.style.display = 'block';
        } else {
            nextButton.style.display = 'block';
            finishButton.style.display = 'none';
        }
    }

    function updateProgressDots() {
        progressDots.forEach((dot, index) => {
            if (index <= currentQuestionIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function updateQuestionCount() {
        currentQuestionElement.textContent = currentQuestionIndex;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex === 0) {
            const emailInput = document.querySelector('.email-input').value;
            if (emailInput && validateEmail(emailInput)) {
                userEmail = emailInput;
                currentQuestionIndex++;
                updateQuiz();
            } else {
                alert('Please enter a valid email address.');
            }
        } else {
            const selectedOption = document.querySelector('input[name="option"]:checked');
            if (selectedOption) {
                selectedOptions[currentQuestionIndex - 1] = selectedOption.value;
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    updateQuiz();
                }
            } else {
                alert('Please select an option.');
            }
        }
    });

    backButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            updateQuiz();
        }
    });

    finishButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            selectedOptions[currentQuestionIndex - 1] = selectedOption.value;
            // Print the selected options to the console
            console.log('Selected options:', selectedOptions);

            // AJAX request to save selectedOptions and email to MySQL database
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://symmatric.com/api/save-quiz-results', true); // Updated to use HTTPS
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    alert('Quiz results saved successfully!');
                } else if (xhr.readyState === 4) {
                    alert('Error saving quiz results. Please try again.');
                }
            };
            xhr.send(JSON.stringify({ email: userEmail, results: selectedOptions }));
        } else {
            alert('Please select an option.');
        }
    });

    // Initialize the quiz
    updateQuiz();
});

document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });
});

function toggleMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    burgerMenu.classList.toggle('open');
    mobileNav.classList.toggle('open');
}
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
