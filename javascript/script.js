const apiKey = '236d7f7f742c56dd267bac56bf813ecb'; // Substitua com sua chave de API do TMDb


document.addEventListener('DOMContentLoaded', function () {
    // Carregar filmes populares na inicialização
    loadPopularMovies();

    // Função para carregar filmes populares
    function loadPopularMovies() {
        const popularMoviesSection = document.getElementById('popularMovies');
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;
    
        // Fazer requisição AJAX usando Fetch
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
    
                // Exibir filmes populares na página inicial
                movies.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movieCard');
                    
                    // Adicione um link para a página individual do filme com o ID do filme como parâmetro
                    movieCard.innerHTML = `<a href="individual_movie.html?id=${movie.id}">
                                            <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="${movie.title}">
                                            </a>`;
                    
                    popularMoviesSection.appendChild(movieCard);
                });
            })
            .catch(error => console.error('Erro ao carregar filmes populares:', error));
    }

    // Função para pesquisar filmes
    window.searchMovies = function () {
        const searchTerm = document.getElementById('searchInput').value;
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${searchTerm}&page=1`;

        // Fazer requisição AJAX usando Fetch
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                const searchResults = data.results;
                const popularMoviesSection = document.getElementById('popularMovies');

                // Limpar a seção de filmes populares
                popularMoviesSection.innerHTML = '';

                // Exibir resultados da pesquisa
                searchResults.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movieCard');
                    const movieImage = document.createElement('img');
                    movieImage.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
                    movieImage.alt = movie.title;
                    movieCard.appendChild(movieImage);
                
                    // Adicione um ouvinte de evento de clique para redirecionar para a página de detalhes
                    movieCard.addEventListener('click', function () {
                        window.location.href = `individual_movie.html?id=${movie.id}`;
                    });
                
                    popularMoviesSection.appendChild(movieCard);
                });
            })
            .catch(error => console.error('Erro ao pesquisar filmes:', error));
    };

    // Adicionando um event listener para o botão de pesquisa
    document.getElementById('searchButton').addEventListener('click', searchMovies);

    // Função para exibir detalhes do filme individual
    window.showMovieDetails = function (movieId) {
        window.location.href = `individual_movie.html?id=${movieId}`;
    };
});