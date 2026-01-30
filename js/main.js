(() => {

    const characterBox = document.querySelector("#character-box");
    const movieCon = document.querySelector("#movie-con");
    const movieTemplate = document.querySelector("#movie-template");
    const filmPosters = [
        "images/new-hope.jpg",
        "images/empire.jpg",
        "images/return-jedi.jpg",
        "images/phantom-menace.jpg",
        "images/attack-clones.jpg",
        "images/revenge-sith.jpg"
    ];
    const loading = document.querySelector("#loading");

    //1st Route:
    //https://swapi.info/api/people

    //2nd Route:
    //https://swapi.info/api/films/1

    const baseUrl = "https://swapi.info/api/";

    // FIRST AJAX CALL – GET CHARACTERS
    function getCharacters() {
        fetch(`${baseUrl}people`)
        .then(response => response.json())
        .then(function(characters) {

            const ul = document.createElement("ul");

            characters.forEach(character => {
                const li = document.createElement("li");
                const a = document.createElement("a");

                a.textContent = character.name;
                a.dataset.film = character.films[0];

                // li.appendChild(img);
                li.appendChild(a);
                ul.appendChild(li);
            });

            characterBox.appendChild(ul);
        })
        .then(function () {
            const links = document.querySelectorAll("#character-box a");
            links.forEach(link => {
                link.addEventListener("click", getMovie);
            });
        })
        .catch(function(error) {
            characterBox.innerHTML = "<p>Failed to load characters.</p>";
            console.error(error);
        });
    }

    // SECOND AJAX CALL – GET MOVIE
    function getMovie(e) {
        movieCon.innerHTML = "";
        loading.classList.remove("hidden");

        const filmUrl = e.currentTarget.dataset.film;

        //https://swapi.info/api/films/1
        fetch(filmUrl)
        .then(response => response.json())
        .then(function(movie) {

            const clone = movieTemplate.content.cloneNode(true);
            const poster = clone.querySelector(".movie-poster");
            poster.src = filmPosters[filmUrl];
            clone.querySelector(".movie-heading").textContent = movie.title;
            clone.querySelector(".movie-description").textContent = movie.opening_crawl;
            movieCon.appendChild(clone);
            loading.classList.toggle("hidden");
        })
        .catch(function(error) {
            movieCon.innerHTML = "<p>Failed to load movie.</p>";
            console.error(error);
        })
    }

    getCharacters();

})();
