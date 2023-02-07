// DECLARE VARIABLES
const baseUrl = 'https://itunes.apple.com/search?term=';
const searchForm = document.querySelector('#search-form');
const resultsContainer = document.querySelector('#results-container');

form.addEventListener('submit', function (event) {
    // listen for the search form being submitted
    event.preventDefault();
    // prevent the page from reloading immediately, control when it reloads
    console.log(event.target);
    let term = document.querySelector('#search-text').value;
    console.log(`Search term ${term}`);
    searchFunction(term)
});




function searchFunction(searchTerm) {

    let searchUrl = `${baseUrl}${searchTerm}`;
    // combine base url with term from form to get search url
    console.log(searchUrl);
    
    fetch(searchUrl, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        // authorization (API key or password, etc) would also go here if needed
    })
    .then(function (response) {
        // response is whatever the previous action returns
        // "JS, when you have a response, then parse that response as json"
        console.log('first .then (promise) executed');
        return response.json();
    })
    .then(function (resultData) {
        // data refers to whatever the previous action returned. In this case response.json()
        // when you have data from the above promise, console log it
        console.log('second .then executed');
        console.log('Here is what we got back from the API', resultData.results);
        // above line may need to change specific to iTunes !!!!!!!!!!!!
        buildResultsHtml(resultData.results);
    });
    
}




function buildResultsHtml(resultsArray) {
    for (let result of resultsArray) {

        // artworkUrl100 -- ARTWORK
        // trackName -- SONG TITLE
        // artistName -- ARTIST NAME
        // collectionName -- ALBUM TITLE
        // releaseDate -- RELEASE DATE (NEEDS FORMATTING)

        let artistDiv = document.createElement('div');
        let artistElement = document.createElement('h2');
        artistElement.innerText = result.artistName;
        artistDiv.appendChild(artistElement);
        resultsContainer.appendChild(artistDiv);
    }
}