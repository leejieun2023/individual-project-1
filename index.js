        //API
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODcyOWQ0NWJlYmUyODE2NWNkMTRiZjExNjMxODZiNyIsInN1YiI6IjY1OTUxZGQzNTkwN2RlNjlmOTYzYmVlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ht5Y9ao6JK1UztEJ5lw7LFKMomCbsPdyFkOo0VUtBEI'
            }
        };

        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => renderMovies(response.results))
            .catch(err => console.error(err));



        const moviesContainer = document.getElementById('movies-container');
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');

        //무비라는 매개변수를 받는다
        const createMovieCard = movie => {
            const { id, title, overview, poster_path, vote_average } = movie;

            //네가지 속성 추출, dom요소 생성
            const card = document.createElement('div');
            const image = document.createElement('img');
            const titleElement = document.createElement('h2');
            const overviewElement = document.createElement('p');
            const voteAverageElement = document.createElement('p');

            //클래스 이름 설정
            card.className = 'movie-card';
            image.className = 'poster-image';
            titleElement.className = 'title';
            overviewElement.className = 'overview';
            voteAverageElement.className = 'vote-average';
            card.setAttribute('id', id);

            //이미지 속성값과 콘텐츠 설정
            image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;

            titleElement.textContent = title;
            overviewElement.textContent = overview;
            voteAverageElement.textContent = `⭐평점: ${vote_average}`;

            card.append(titleElement);
            card.append(image);
            card.append(overviewElement);
            card.append(voteAverageElement);

            return card;
        };

        //forEach
        const renderMovies = movies => {
            movies.forEach(movie => {
                const movieCard = createMovieCard(movie);
                moviesContainer.append(movieCard);



                movieCard.addEventListener('click', () => {
                    const movieId = movieCard.getAttribute('id');
                    alert(`이 영화의 id는 ${movieId}입니다.`);
                })
            });
        };

        let movies = [];

        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => {
                // API로부터 받아온 영화 정보를 변수에 저장하고 화면에 표시합니다.
                movies = response.results;
                renderMovies(movies);
            })
            .catch(err => console.error(err));

        searchButton.addEventListener('click', () => {
            // 사용자가 입력한 검색어를 가져옵니다.
            const searchTerm = searchInput.value.toLowerCase();

            // 영화 정보 배열에서 검색어를 포함하는 영화만 선택합니다.
            const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));

            //movies - container의 내용을 비웁니다.
                while(moviesContainer.firstChild) {
                moviesContainer.firstChild.remove();
            }

            // 선택된 영화만 화면에 표시합니다.
            renderMovies(filteredMovies);
        });