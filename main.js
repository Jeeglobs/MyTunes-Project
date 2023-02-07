// DECLARE VARIABLES
const baseUrl = 'https://itunes.apple.com/search?term=';
const searchForm = document.querySelector('#search-form');
const resultsContainer = document.querySelector('#results-container');
let player = document.querySelector('#audio-player');

searchForm.addEventListener('submit', function (event) {
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
        // clear results out of #container on new search
        while (resultsContainer.firstChild) {
            resultsContainer.removeChild(resultsContainer.firstChild);
        }
        buildResultsHtml(resultData.results);
    });
    
}




function buildResultsHtml(resultsArray) {
    if (resultsArray.length === 0) {
        alert("No Results Found");
    } else {
        for (let result of resultsArray) {
    
            // artworkUrl100 -- ARTWORK
            let artDiv = document.createElement('div');
            // artDiv.classList.add('art-container');
            let artElement = document.createElement('img');
            artElement.src = result.artworkUrl100;
            artDiv.appendChild(artElement);
            resultsContainer.appendChild(artDiv);
    
            // trackName -- SONG TITLE
            let trackDiv = document.createElement('div');
            let trackElement = document.createElement('h3');
            trackElement.innerText = `Song: ${result.trackName}`;
            trackDiv.appendChild(trackElement);
            resultsContainer.appendChild(trackDiv);
    
            // artistName -- ARTIST NAME
            let artistDiv = document.createElement('div');
            let artistElement = document.createElement('h3');
            artistElement.innerText = `Artist: ${result.artistName}`;
            artistDiv.appendChild(artistElement);
            resultsContainer.appendChild(artistDiv);
    
            // collectionName -- ALBUM TITLE
            let albumDiv = document.createElement('div');
            let albumElement = document.createElement('h3');
            albumElement.innerText = `Album: ${result.collectionName}`;
            albumDiv.appendChild(albumElement);
            resultsContainer.appendChild(albumDiv);

            // when you click the album cover, it plays the preview
            artElement.addEventListener('click', function (event) {
                player.src = result.previewUrl;
            })
        }
        
    }
}