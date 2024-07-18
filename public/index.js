document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('user-info-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        submitUserInfo();
    });
});

function submitUserInfo() {
    const formData = new FormData(document.getElementById('user-info-form'));

    fetch('/user-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Assuming the server sends a text response
    })
    .then(data => {
        console.log(data); // Log response from server
        window.location.href = '/cft.html'; // Redirect to cognitive function test page
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = error.message;
    });
}
