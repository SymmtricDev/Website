
document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            image: 'images/squizq1bg.svg',
            question: 'Question 1',
            text: 'Does the person next to you looks & dresses better than you?',
            options: ['Option 1', 'Option 2', 'Option 3']
        },
        {
            image: 'images/squizbg2.svg', // Placeholder image for Question 2
            question: 'Question 2',
            text: 'Do you ever look at the influencers & think you can be one of them?',
            options: ['Option 1', 'Option 2', 'Option 3']
        },
        {
            image: 'images/squizq3bg.svg', // Placeholder image for Question 2
            question: 'Question 3',
            text: 'Do you want to be an influencer on Instagram?',
            options: ['Option 1', 'Option 2', 'Option 3']
        },
        {
            image: 'images/squizq4bg.svg', // Placeholder image for Question 2
            question: 'Question 4',
            text: "Why aren't you an influencer yet?",
            options: ['Option 1', 'Option 2', 'Option 3']
        }
        // Add more questions as needed
    ];

    let currentQuestionIndex = 0;

    const quizImage = document.querySelector('.squiz-quiz-image');
    const quizContent = document.querySelector('.squiz-quiz-content');
    const quizOptions = document.querySelector('.squiz-quiz-options');
    const progressDots = document.querySelectorAll('.squiz-progress-dot');
    const nextButton = document.querySelector('.squiz-quiz-next');
    const backButton = document.querySelector('.squiz-quiz-back');

    function updateQuiz() {
        const currentQuestion = questions[currentQuestionIndex];
        quizImage.src = currentQuestion.image;
        quizContent.querySelector('h2').textContent = currentQuestion.question;
        quizContent.querySelector('p').textContent = currentQuestion.text;
        quizOptions.innerHTML = currentQuestion.options.map(option => `<option>${option}</option>`).join('');
        updateProgressDots();
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

    // Initialize the quiz
    updateQuiz();
});
