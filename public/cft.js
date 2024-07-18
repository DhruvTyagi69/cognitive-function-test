function submitTest() {
    const form = document.getElementById('cft-form');
    const formData = new FormData(form);
    const answers = {};

    formData.forEach((value, key) => {
        answers[key] = value;
    });

    fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        // Handle the JSON data returned from the server
        console.log(data); // Example: Log the data to the console
        displayResults(data); // Example: Display results function (to be defined)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayResults(data) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    const { score, incorrectAnswers } = data;

    const scoreElement = document.createElement('p');
    scoreElement.textContent = `Your score: ${score}`;
    resultsContainer.appendChild(scoreElement);

    if (incorrectAnswers.length > 0) {
        const incorrectHeader = document.createElement('h2');
        incorrectHeader.textContent = 'Incorrect Answers:';
        resultsContainer.appendChild(incorrectHeader);

        incorrectAnswers.forEach(answer => {
            const { question, userAnswer, correctAnswer } = answer;
            const answerItem = document.createElement('div');
            answerItem.classList.add('result-item');
            answerItem.innerHTML = `<p><strong>Question ${question}:</strong> Your answer: ${userAnswer}. Correct answer: ${correctAnswer}</p>`;
            resultsContainer.appendChild(answerItem);
        });
    }
}
