const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Store user information temporarily (for demonstration purposes)
let userInfo = {};

// Homepage route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route to handle user information submission (POST request)
app.post('/user-info', (req, res) => {
    const { username, age } = req.body;

    if (!username || !age) {
        return res.status(400).send('Username and age are required.');
    }

    if (parseInt(age) < 8) {
        return res.status(400).send('You must be at least 8 years old to take the test.');
    }

    // Store user information (for demonstration)
    userInfo = { username, age };

    // Redirect to cognitive function test page
    res.redirect('/cft.html');
});

// API route to handle form submission for the test (POST request)
app.post('/api/submit', (req, res) => {
    const { answers } = req.body;
    const correctAnswers = {
        q1: 'bird',
        q2: 'paris',
        q3: 'down',
        q4: '13',
        q5: 'mars',
        q6: 'yellow',
        q7: 'apple',
        q8: 'seven',
        q9: 'round',
        q10: 'fall'
    };
    let score = 0;
    const incorrectAnswers = [];

    for (let key of Object.keys(correctAnswers)) {
        if (answers[key] && answers[key].toLowerCase() === correctAnswers[key].toLowerCase()) {
            score++;
        } else {
            incorrectAnswers.push({
                question: key,
                userAnswer: answers[key],
                correctAnswer: correctAnswers[key]
            });
        }
    }

    const mentalHealthStatus = determineMentalHealth(score);

    // Return JSON response with score, incorrect answers, and mental health status
    res.json({ score, incorrectAnswers, mentalHealthStatus });
});

// Function to determine mental health status based on the score
function determineMentalHealth(score) {
    if (score >= 9) {
        return 'Excellent';
    } else if (score >= 7) {
        return 'Good';
    } else if (score >= 5) {
        return 'Fair';
    } else {
        return 'Poor';
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
