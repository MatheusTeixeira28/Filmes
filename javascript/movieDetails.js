const apiKey = '236d7f7f742c56dd267bac56bf813ecb'; // Substitua com sua chave de API do TMDb

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (movieId) {
        loadMovieDetails(movieId);
    } else {
        // Redirecionar para a página inicial se o ID do filme não estiver presente
        window.location.href = 'index.html';
    }

    function loadMovieDetails(id) {
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movieDetailsSection = document.getElementById('movieDetails');
            const movieTitle = document.getElementById('movieTitle');

            movieTitle.innerText = data.title;

            const movieDetails = document.createElement('div');
            movieDetails.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w300/${data.poster_path}" alt="${data.title}">
                <p>Sinopse: ${data.overview}</p>
                <p>Data de Lançamento: ${data.release_date}</p>
                <p>Elenco: ${getCast(data.credits)}</p>
                <p>Classificação: ${data.vote_average}</p>
                ${data.videos.results.length > 0 ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${data.videos.results[0].key}" frameborder="0" allowfullscreen></iframe>` : ''}
            `;

            movieDetailsSection.appendChild(movieDetails);
        })
        .catch(error => console.error('Erro ao carregar detalhes do filme:', error));
}

function getCast(credits) {
    if (credits && credits.cast) {
        const cast = credits.cast.slice(0, 5).map(actor => actor.name);
        return cast.join(', ');
    } else {
        return 'Informações de elenco não disponíveis';
    }
}function loadMovieDetails(id) {
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movieDetailsSection = document.getElementById('movieDetails');
            const movieTitle = document.getElementById('movieTitle');

            movieTitle.innerText = data.title;

            const movieDetails = document.createElement('div');
            movieDetails.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w300/${data.poster_path}" alt="${data.title}">
                <p>Sinopse: ${data.overview}</p>
                <p>Data de Lançamento: ${data.release_date}</p>
                <p>Elenco: ${getCast(data.credits)}</p>
                <p>Classificação: ${data.vote_average}</p>
            `;

            movieDetailsSection.appendChild(movieDetails);
        })
        .catch(error => console.error('Erro ao carregar detalhes do filme:', error));
}

function getCast(credits) {
    if (credits && credits.cast) {
        const cast = credits.cast.slice(0, 5).map(actor => actor.name);
        return cast.join(', ');
    } else {
        return 'Informações de elenco não disponíveis';
    }
}
});