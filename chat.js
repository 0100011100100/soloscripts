// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDI6l1w7JydjHI4CT3upKOkiVxLftg5in8",
    authDomain: "zeptionalchat.firebaseapp.com",
    databaseURL: "",
    projectId: "zeptionalchat",
    storageBucket: "zeptionalchat.appspot.com",
    messagingSenderId: "455606646143",
    appId: "1:455606646143:web:92fe178ba9b910c607564a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Get HTML elements
const chatInput = document.getElementById('chat-input');
const messagesContainer = document.getElementById('messages-container');

// Fetch existing messages from Firebase
function fetchMessages() {
    const messagesRef = database.ref('messages/');
    messagesRef.on('child_added', (snapshot) => {
        const messageData = snapshot.val();
        addMessage(messageData.username, messageData.messageText, messageData.isOwner);
    });
}

// Function to add message to the chat
function addMessage(username, messageText, isOwner) {
    const message = document.createElement('div');
    message.classList.add('message');

    const profileImage = document.createElement('img');
    profileImage.src = localStorage.getItem('profilePic') || 'default-profile-pic.png';

    const borderStyle = localStorage.getItem('borderStyle') || 'solid';
    const borderColor = localStorage.getItem('borderColor') || 'white';

    // Apply the same border style as profile picture
    if (borderStyle === 'rainbow') {
        profileImage.classList.add('rainbow-border');
    } else if (borderStyle === 'gradient') {
        profileImage.style.borderImage = localStorage.getItem('gradientColor') || 'linear-gradient(45deg, #6a11cb, #2575fc)';
        profileImage.style.borderWidth = '3px';
        profileImage.classList.add('gradient-border');
    } else {
        profileImage.style.border = `3px solid ${borderColor}`; // Thinner border for chat
    }

    const text = document.createElement('span');
    if (isOwner) {
        text.innerHTML = `<strong style="background: linear-gradient(90deg, #ffcc00, #e63946); padding: 2px 6px; border-radius: 5px;">Owner:</strong> ${username}: ${messageText}`;
    } else {
        text.textContent = `${username}: ${messageText}`;
    }

    message.appendChild(profileImage);
    message.appendChild(text);
    messagesContainer.appendChild(message);
}

// Send message to Firebase
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
        const messageText = this.value.trim();
        const username = localStorage.getItem('username') || 'Guest';
        const isOwner = username === 'zeptional';

        // Save message to Firebase
        database.ref('messages/').push({
            username: username,
            messageText: messageText,
            isOwner: isOwner
        });

        this.value = ''; // Clear input
    }
});

// Fetch messages on load
fetchMessages();
