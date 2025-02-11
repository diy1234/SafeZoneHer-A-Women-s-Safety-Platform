document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Create text to be saved to file
    const textToSave = `Name: ${name}\nEmail: ${email}\nPhone number : ${phone}\n`;

    // Create a blob and save it as a text file
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a link and simulate a click to download the file
    const link = document.createElement('a');
    link.download = 'registration.txt';
    link.href = url;
    link.click();
});
