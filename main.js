fetch('https://itunes.apple.com', {
    method: 'GET',
    headers: {'Content-Type'; 'application/json'},
    // authorization (API key or password, etc) would also go here if needed
})
.then(function (response) {
    // response is whatever the previous action returns
    // "JS, when you have a response, then parse that response as json"
    console.log('first .then (promise) executed');
    return response.json();
})
.then(function (data) {
    // data refers to whatever the previous action returned. In this case response.json()
    // when you have data from the above promise, console log it
    console.log('second .then executed');
    console.log('Here is what we got back from the API', data.data);
})