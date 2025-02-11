// JavaScript for SAFEZONE website
// Generate sample blog posts

const blogPosts = [
    { title: "Tips for Staying Safe While Traveling Alone", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac massa at eros gravida ultrices sit amet vel nulla. Sed suscipit lectus nec diam pretium ultricies." },
    { title: "Understanding Your Rights: A Guide for Women", content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam nec tortor non sem convallis eleifend." },
    { title: "Self-Defense Techniques Every Woman Should Know", content: "Quisque feugiat, risus ac sollicitudin sodales, est magna tristique lorem, a ultricies dolor lorem eu ipsum. Integer suscipit leo sit amet massa rhoncus suscipit." }
];

const blogPostsContainer = document.getElementById('blog-posts');

blogPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
    `;
    blogPostsContainer.appendChild(postElement);
});
// JavaScript for SAFEZONE website

// Handle form submission
document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create text to be saved to file
    const textToSave = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n`;

    // Create a blob and save it as a text file
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a link and simulate a click to download the file
    const link = document.createElement('a');
    link.download = 'feedback.txt';
    link.href = url;
    link.click();
});
