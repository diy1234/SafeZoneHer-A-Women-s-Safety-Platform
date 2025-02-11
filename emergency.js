// JavaScript for SAFEZONE website

// Function to handle emergency button click
function handleEmergencyButtonClick() {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
        // Get the current position
        navigator.geolocation.getCurrentPosition(function(position) {
            // Extract latitude and longitude
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Record video for 5 seconds
            recordVideo(5);

            // Save location to file
            saveLocationToFile(latitude, longitude);
        }, function(error) {
            // Handle errors with getting the current position
            console.error('Error getting location:', error.message);
            alert('Unable to retrieve your location. Please try again later.');
        });
    } else {
        // Geolocation is not supported
        alert('Geolocation is not supported by your browser.');
    }
}

// Function to record video
function recordVideo(duration) {
    // Create a video element to stream the camera
    const video = document.createElement('video');
    video.autoplay = true;

    // Create a media stream to record video
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            // Assign the stream to the video element
            video.srcObject = stream;

            // Create a media recorder to record the stream
            const mediaRecorder = new MediaRecorder(stream);
            const videoChunks = [];

            // Start recording
            mediaRecorder.start();

            // Stop recording after specified duration
            setTimeout(function() {
                mediaRecorder.stop();
            }, duration * 1000);

            // Handle data available event
            mediaRecorder.addEventListener('dataavailable', function(event) {
                videoChunks.push(event.data);
            });

            // Handle stop event
            mediaRecorder.addEventListener('stop', function() {
                // Create a Blob from video chunks
                const videoBlob = new Blob(videoChunks, { type: 'video/mp4' });

                // Save video to file
                saveToFile(videoBlob, 'emergency_video.mp4');
            });
        })
        .catch(function(error) {
            console.error('Error accessing camera:', error.message);
            alert('Unable to access camera. Please try again later.');
        });
}

// Function to save location to file
function saveLocationToFile(latitude, longitude) {
    const locationText = `Emergency Location:\nLatitude: ${latitude}\nLongitude: ${longitude}`;
    const locationBlob = new Blob([locationText], { type: 'text/plain' });
    saveToFile(locationBlob, 'emergency_location.txt');
}

// Function to save data to file
function saveToFile(data, filename) {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(data);
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Add event listener to the emergency button
document.getElementById('emergency-btn').addEventListener('click', handleEmergencyButtonClick);
