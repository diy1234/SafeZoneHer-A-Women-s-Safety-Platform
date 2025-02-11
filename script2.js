// JavaScript for handling form submissions and Chart.js visualization

document.addEventListener('DOMContentLoaded', () => {
    console.log("Script Loaded"); // Check if script is running

    const form = document.getElementById('mental-health-form');
    const moodChartCtx = document.getElementById('moodChart').getContext('2d');

    // Initialize Chart.js
    const moodChart = new Chart(moodChartCtx, {
        type: 'bar',
        data: {
            labels: ['Happy', 'Neutral', 'Sad', 'Angry'],
            datasets: [{
                label: 'Mood Distribution',
                data: [0, 0, 0, 0], // Placeholder data
                backgroundColor: [
                    'rgba(76, 175, 80, 0.2)',  // Green for Happy
                    'rgba(158, 158, 158, 0.2)', // Gray for Neutral
                    'rgba(244, 67, 54, 0.2)',  // Red for Sad
                    'rgba(255, 87, 34, 0.2)'   // Orange for Angry
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(158, 158, 158, 1)',
                    'rgba(244, 67, 54, 1)',
                    'rgba(255, 87, 34, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default page reload

        console.log("Form submission triggered");

        // Collect form data
        const formData = new FormData(form);
        const mood = formData.get('feeling');
        const moodRating = parseInt(formData.get('mood-rating'), 10);

        console.log("Selected Mood:", mood);
        console.log("Mood Rating:", moodRating);
        console.log("Chart Labels:", moodChart.data.labels);

        // Update the mood chart
        updateMoodChart(mood);

        // Send form data to the server
        fetch('submit.php', {  // Replace with actual backend file
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log('Server Response:', data);
            alert('Form submitted successfully!');
            form.reset(); // Clear form after submission
        })
        .catch(error => console.error('Error submitting form:', error));
    });

    // Function to update the mood chart
    function updateMoodChart(mood) {
        const labels = moodChart.data.labels.map(label => label.toLowerCase()); // Ensure case consistency
        const index = labels.indexOf(mood.toLowerCase());

        if (index !== -1) {
            console.log(`Updating chart for ${mood} at index ${index}`);
            moodChart.data.datasets[0].data[index] += 1;
            moodChart.update();
        } else {
            console.error("Mood not found in chart labels:", mood);
        }
    }
});
