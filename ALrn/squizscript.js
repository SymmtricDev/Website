document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            image: 'images/squizq1bg.svg',
            question: 'Does the person next to you looks & dresses better than you?',
            text: '',
            options: ['No, I look the best', 'I was Mr/Ms farewell in my school', 'I was diva at my college',"I don’t care","Yes they do","I wish I knew how to dress better"]
        },
        {
            image: 'images/squizbg2.svg', // Placeholder image for Question 2
            question: 'Do you ever look at the influencers & think you can be one of them?',
            text: '',
            options: ['Yes, I do', 'No, I do not', 'If I get the opportunity why not']
        },
        {
            image: 'images/squizq3bg.svg', // Placeholder image for Question 2
            question: 'Do you want to be an influencer on Instagram?',
            text: '',
            options: ['Yes, I want to be an influencer on Instagram', 'Fashion is not that important to me', 'No, I’m just happy dressing to college everyday']
        },
        {
            image: 'images/squizq4bg.svg', // Placeholder image for Question 2
            question: "Why aren't you an influencer yet?",
            text: "",
            options: ['It’s hard to crack social media', 'I want to focus on another career', 'To buy clothes to be an influencer is too much']
        },
        {
            image: 'images/squizq5bg.svg', // Placeholder image for Question 2
            question: 'Thank you for taking our Quiz!',
            text: "Please choose one of the following.",
            options: ['I want to be a local influencer', 'I love my fashion & want to share it', 'I want to be a global influencer','I want to look good for myself when I go to buy groceries']
        }
    ];

    let currentQuestionIndex = 0;

    const quizImage = document.querySelector('.squiz-quiz-image');
    const quizContent = document.querySelector('.squiz-quiz-content');
    const quizOptions = document.querySelector('.squiz-quiz-options');
    const progressDots = document.querySelectorAll('.squiz-progress-dot');
    const nextButton = document.querySelector('.squiz-quiz-next');
    const backButton = document.querySelector('.squiz-quiz-back');
    const finishButton = document.querySelector('.squiz-quiz-finish');
    const selectedOptions = [];

    function updateQuiz() {
        const currentQuestion = questions[currentQuestionIndex];
        quizImage.src = currentQuestion.image;
        quizContent.querySelector('h2').textContent = currentQuestion.question;
        quizContent.querySelector('p').textContent = currentQuestion.text;
        quizOptions.innerHTML = currentQuestion.options.map(option => `<option>${option}</option>`).join('');
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

    nextButton.addEventListener('click', () => {
        const selectedOption = quizOptions.querySelector('option:checked').value;
        selectedOptions[currentQuestionIndex] = selectedOption;

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            updateQuiz();
        }
    });

    backButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            updateQuiz();
        }
    });

    finishButton.addEventListener('click', () => {
        const selectedOption = quizOptions.querySelector('option:checked').value;
        selectedOptions[currentQuestionIndex] = selectedOption;

        // Print the selected options to the console
        console.log('Selected options:', selectedOptions);

        // AJAX request to save selectedOptions to MySQL database
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/save-quiz-results', true); // Assuming /save-quiz-results is your endpoint
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert('Quiz results saved successfully!');
            }
        };
        xhr.send(JSON.stringify({ results: selectedOptions }));
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
