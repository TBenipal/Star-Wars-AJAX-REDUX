(function() {

    // Connect to API (swapi.info) pull a list of 10 people

    // When user clicks on the speifec movie, include the title, poster image and opening crawl

    // Route 1 - Get 10 Character:
    // https://swapi.info/api/people

    // Route 2 - Get specifec Movie
    // https://swapi.info/api/films/1
    // or https://swapi.info/api/films/2

    // Variables
    // BaseUrl for stuff that won't change in the Url
    const baseUrl = "https://swapi.info/api/";

    function getCharacters() {
        fetch(`${baseUrl}people`)
        .then((response) => response.json())
        .then((character) => {
            // console.log(response[0].name);
            character.forEach(characters => {
                // console.log(characters.name);
                // console.log(characters.films[0]);
                // Randomize the number that is picked
                // Figure out the length of the array then pick a number within that range
            
                // Create a ul
                // Create a li
                // Create an a
                // Add a data attribute to the a tag that conatins a film
            });
        })
        .then(function() {
            //attach event listener to each link, calls a new function that makes 2nd ajax call
            
        })
        .catch((error) => {
            console.error(error)
        })
    }

    function getMovie() {
        //need to extract data attributes either using event, e or this
        fetch("https://swapi.info/api/films/1")
        .then((response) => response.json())
        .then((movie) => {

            console.log(movie);
            console.log(`img.src="images/poster-${movie.episode_id}.jpg`)
            console.log(movie.title);
            console.log(movie.opening_crawl);
        })

        .catch((error) => {
            console.error(error);
        })
    }

    //Call Function
    getCharacters();
    getMovie();
})();
