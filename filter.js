const inappropriateWords = ["curse", "badword"]; // Add more words as needed

function filterContent(content) {
    for (const word of inappropriateWords) {
        if (content.includes(word)) {
            return true; // Content is inappropriate
        }
    }
    return false; // Content is acceptable
}

function banUser(username) {
    // Logic to ban user
    alert(`${username} has been banned for inappropriate content.`);
    // Additional code to handle user ban can go here
}
