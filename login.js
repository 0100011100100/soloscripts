<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat System</title>
    <script src="https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"></script>
</head>
<body>
    <h1></h1>

    <div id="login">
        <h2>Login</h2>
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="password" placeholder="Password" required>
        <button id="loginButton">Login</button>
    </div>

    <div id="chat" style="display: none;">
        <form id="chatForm">
            <input type="text" id="message" placeholder="Message" required>
            <button type="submit">Send</button>
        </form>
        <div id="messages"></div>
        <button id="logoutButton">Logout</button>
    </div>

    <script>
        // Your Firebase configuration
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
        };

        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();

        // Login Function
        document.getElementById('loginButton').addEventListener('click', async () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                await auth.signInWithEmailAndPassword(email, password);
                document.getElementById('login').style.display = 'none';
                document.getElementById('chat').style.display = 'block';
                loadMessages();
            } catch (error) {
                alert(error.message);
            }
        });

        // Send Message Function
        document.getElementById('chatForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = document.getElementById('message').value;
            const user = auth.currentUser;

            await db.collection('messages').add({
                username: user.email,
                message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            document.getElementById('message').value = '';
        });

        // Load Messages Function
        function loadMessages() {
            db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
                const messagesDiv = document.getElementById('messages');
                messagesDiv.innerHTML = '';
                snapshot.forEach(doc => {
                    const msg = doc.data();
                    messagesDiv.innerHTML += `<p><strong>${msg.username}:</strong> ${msg.message}</p>`;
                });
            });
        }

        // Logout Function
        document.getElementById('logoutButton').addEventListener('click', () => {
            auth.signOut().then(() => {
                document.getElementById('chat').style.display = 'none';
                document.getElementById('login').style.display = 'block';
            });
        });
    </script>
</body>
</html>
