(() => {

    const characterBox = document.querySelector("#character-box");
    const movieCon = document.querySelector("#movie-con");
    const movieTemplate = document.querySelector("#movie-template");
    const searchInput = document.querySelector(".search-box input");
    const loading = document.querySelector("#loading");
    const movieBox = document.querySelector("#movie-box");
    const charactersSection = document.querySelector("#characters");
    const closeBtn = document.querySelector(".X");

    const filmPosters = {
        "https://swapi.info/api/films/1": "images/new-hope.webp",
        "https://swapi.info/api/films/2": "images/empire-strikes-back.webp",
        "https://swapi.info/api/films/3": "images/return-of-jedi.webp",
        "https://swapi.info/api/films/4": "images/phantom-menace.webp",
        "https://swapi.info/api/films/5": "images/attack-of-the-clones.webp",
        "https://swapi.info/api/films/6": "images/revenge-of-the-sith.webp"
    };

    const baseUrl = "https://swapi.info/api/";
    let allCharacters = [];

    function getCharacters() {
        fetch(`${baseUrl}people`)
            .then(response => response.json())
            .then(characters => {
                allCharacters = characters;
                renderCharacters(allCharacters);
            })
            .catch(error => {
                characterBox.innerHTML = "<p>Failed to load characters.</p>";
                console.error(error);
            });
    }

    function renderCharacters(characters) {
        characterBox.innerHTML = "";

        const ul = document.createElement("ul");

        characters.forEach(character => {

            const li = document.createElement("li");
            const a = document.createElement("a");

            a.textContent = character.name;
            a.dataset.film = character.films[0];
            a.addEventListener("click", getMovie);

            li.appendChild(a);
            ul.appendChild(li);
        });

        characterBox.appendChild(ul);
    }
    
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value;

        const filteredCharacters = allCharacters.filter(character =>
            character.name.includes(searchValue)
        );

        renderCharacters(filteredCharacters);
    });

    function getMovie(e) {
        movieBox.style.display = "block";
        movieCon.innerHTML = "";
        loading.classList.remove("hidden");

        const filmUrl = e.currentTarget.dataset.film;

        fetch(filmUrl)
            .then(response => response.json())
            .then(movie => {
                const clone = movieTemplate.content.cloneNode(true);
                const screen = window.innerWidth;
                const closeBtn = clone.querySelector(".X");
                const tabletView = window.matchMedia("(min-width: 768px)");
                const desktopView = window.matchMedia("(min-width: 1200px)");
                
                if(screen < 1200) {
                    charactersSection.classList.add("hidden");
                    closeBtn.addEventListener("click", () => {
                        movieBox.classList.remove("active");
                        charactersSection.classList.remove("hidden");
                    });
                }

                function resetMovieView() {
                    movieBox.classList.remove("active");
                    charactersSection.classList.remove("hidden");
                    movieCon.innerHTML = "";
                }

                movieBox.classList.add("active");

                const poster = clone.querySelector(".movie-poster");
                poster.src = filmPosters[filmUrl];
                poster.alt = movie.title;

                clone.querySelector(".release-date").textContent = movie.release_date;
                clone.querySelector(".movie-heading").textContent = movie.title;
                clone.querySelector(".movie-description").textContent = movie.opening_crawl;

                movieCon.appendChild(clone);
                loading.classList.add("hidden");

                tabletView.addEventListener("change", resetMovieView);
                desktopView.addEventListener("change", resetMovieView);
                closeBtn.addEventListener("click", () => {
                    movieBox.classList.remove("active");
                });

            })
            .catch(error => {
                movieCon.innerHTML = "<p>Failed to load movie.</p>";
                loading.classList.add("hidden");
                console.error(error);
            });
    }

    getCharacters();

    closeBtn.addEventListener("click", () => {
        movieBox.classList.remove("active");
        charactersSection.classList.remove("hidden"); // Characters come back!
    });

    //GSAP
    gsap.registerPlugin(DrawSVGPlugin)
    function callGSAP() {
        
    }
    callGSAP();


})();
