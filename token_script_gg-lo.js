
fetch('https://jsonplaceholder.typicode.com/posts/4500', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer gg-logo-favicon.aa0a2e9e.png',
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log('API Response:', data))
.catch(error => console.error('Error:', error));
                    
