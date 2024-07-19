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
            question: 'Does the person next to you look & dress better than you?',
            text: '',
            options: ['No, I look the best', 'I was Mr/Ms farewell in my school', 'I was diva at my college', "I don’t care", "Yes they do", "I wish I knew how to dress better"]
        },
        {
            image: 'images/symsqbg.svg',
            question: 'Do you ever look at influencers & think you can be one of them?',
            text: '',
            options: ['Yes, I do', 'No, I do not', 'If I get the opportunity why not']
        },
        {
            image: 'images/symsqbg.svg',
            question: 'Do you want to be an influencer on Instagram?',
            text: '',
            options: ['Yes, I want to be an influencer on Instagram', 'Fashion is not that important to me', 'No, I’m just happy dressing to college every day']
        },
        {
            image: 'images/symsqbg.svg',
            question: "Why aren't you an influencer yet?",
            text: "",
            options: ['It’s hard to crack social media', 'I want to focus on another career', 'To buy clothes to be an influencer is too much']
        },
        {
            image: 'images/symsqbg.svg',
            question: 'Thank you for taking our Quiz!',
            text: "Please choose one of the following.",
            options: ['I want to be a local influencer', 'I love my fashion & want to share it', 'I want to be a global influencer', 'I want to look good for myself when I go to buy groceries']
        }
    ];

    let currentQuestionIndex = 0;
    let userEmail = '';

    const quizImage = document.querySelector('.squiz-quiz-image');
    const quizContent = document.querySelector('.squiz-quiz-content');
    const quizOptions = document.querySelector('.squiz-quiz-options');
    const progressDots = document.querySelectorAll('.squiz-progress-dot');
    const nextButton = document.querySelector('.squiz-quiz-next');
    const backButton = document.querySelector('.squiz-quiz-back');
    const finishButton = document.querySelector('.squiz-quiz-finish');
    const selectedOptions = [];
    let choicesInstance;

    function updateQuiz() {
        const currentQuestion = questions[currentQuestionIndex];
        quizImage.src = currentQuestion.image;
        if (currentQuestionIndex === 0) {
            quizContent.querySelector('h2').textContent = currentQuestion.question;
            quizContent.querySelector('p').innerHTML = '<input type="email" class="email-input" placeholder="Enter your email">';
            quizOptions.style.display = 'none';
        } else {
            quizContent.querySelector('h2').textContent = currentQuestion.question;
            quizContent.querySelector('p').textContent = currentQuestion.text;
            quizOptions.style.display = 'block';
            quizOptions.innerHTML = ''; // Clear any previous options
            if (choicesInstance) {
                choicesInstance.destroy(); // Destroy previous instance
            }
            choicesInstance = new Choices(quizOptions, {
                searchEnabled: false,
                itemSelectText: '',
                removeItemButton: false,
                shouldSort: false,
                classNames: {
                    containerOuter: 'choices',
                    containerInner: 'choices__inner',
                    list: 'choices__list',
                    listDropdown: 'choices__list--dropdown',
                    item: 'choices__item',
                    itemSelectable: 'choices__item--selectable',
                    selectedState: 'is-selected',
                    highlightedState: 'is-highlighted',
                }
            });
            choicesInstance.setChoices(
                currentQuestion.options.map(option => ({ value: option, label: option })),
                'value',
                'label',
                false
            );
        }
        updateProgressDots();

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
            const selectedOption = choicesInstance.getValue(true);
            if (selectedOption) {
                selectedOptions[currentQuestionIndex - 1] = selectedOption;
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
        const selectedOption = choicesInstance.getValue(true);
        if (selectedOption) {
            selectedOptions[currentQuestionIndex - 1] = selectedOption;
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
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        if (link.href.includes(currentPath)) {
            link.classList.add('active');
        }
    });
});
