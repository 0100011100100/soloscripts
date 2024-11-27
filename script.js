document.getElementById('openTabsButton').addEventListener('click', () => {
    const urls = [
        'https://www.example.com',
        'https://www.google.com',
        'https://www.github.com'
    ];

    urls.forEach(url => {
        window.open(url, '_blank');
    });
});
