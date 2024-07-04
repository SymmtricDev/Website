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
