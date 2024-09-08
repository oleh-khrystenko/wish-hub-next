self.addEventListener('push', (event) => {
    console.log('push: ', event);
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/favicon.svg',
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});
