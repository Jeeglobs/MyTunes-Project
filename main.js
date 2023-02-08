// DECLARE VARIABLES
const baseUrl = 'https://itunes.apple.com/search?term=';
const searchForm = document.querySelector('#search-form');
const resultsContainer = document.querySelector('#results-container');
const player = document.querySelector('#audio-player');

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
    // alerts the user if their search has zero results
    if (resultsArray.length === 0) {
        alert("No Results Found");
    } else {
        for (let result of resultsArray) {

            // create div (card) to contain elements below
            let resultCard = document.createElement('div');
            resultCard.classList.add('result-card');
            resultsContainer.appendChild(resultCard);
    
            // artworkUrl100 -- ARTWORK
            let artElement = document.createElement('img');
            artElement.classList.add('art-element');
            artElement.src = result.artworkUrl100;
            resultCard.appendChild(artElement);
    
            // trackName -- SONG TITLE
            let trackElement = document.createElement('h3');
            trackElement.classList.add('track-element');
            trackElement.innerText = `Song: ${result.trackName}`;
            resultCard.appendChild(trackElement);
    
            // artistName -- ARTIST NAME
            let artistElement = document.createElement('h3');
            artistElement.classList.add('artist-element');
            artistElement.innerText = `Artist: ${result.artistName}`;
            resultCard.appendChild(artistElement);
    
            // collectionName -- ALBUM TITLE
            let albumElement = document.createElement('h3');
            albumElement.classList.add('album-element');
            albumElement.innerText = `Album: ${result.collectionName}`;
            resultCard.appendChild(albumElement);

            // when you click the album cover, it plays the preview
            artElement.addEventListener('click', function (event) {
                player.src = result.previewUrl;
            })
        }
        
    }
}