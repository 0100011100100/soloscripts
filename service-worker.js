self.addEventListener('push', function(event) {
    const data = event.data.json();
    const title = data.title || 'New message';
    const options = {
        body: data.body || 'You have a new message!',
        icon: data.icon || 'icon.png', // Path to your icon image
        data: {
            url: data.url // URL to navigate to when the notification is clicked
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Close the notification when clicked

    // Open the URL specified in the notification data
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
