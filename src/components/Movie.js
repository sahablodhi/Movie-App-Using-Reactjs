import React, { useState, useEffect } from "react";

const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getMovies(APIURL);
    }, []);

    const getMovies = async (url) => {
        const resp = await fetch(url);
        const respData = await resp.json();
        setMovies(respData.results);
    };

    const searchMovies = async () => {
        if (searchTerm) {
            getMovies(SEARCHAPI + searchTerm);
            setSearchTerm('');
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const getClassByRate = (vote) => {
        if (vote >= 7) {
            return "green";
        } else if (vote >= 4 && vote < 7) {
            return "orange";
        } else {
            return "black";
        }
    };

    return (
        <div>
            <header>
                <h1>Trending Movies</h1> <br/>
                <form onSubmit={(e) => { e.preventDefault(); searchMovies(); }}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search"
                        className="search"
                    />
                </form>
            </header>

            <div id="content">
                {movies.map((movie) => (
                    <div className="movie" key={movie.id}>
                        <img src={IMGPATH + movie.poster_path} alt={movie.title} />
                        <div className="movie-info">
                            <h3>{movie.title}</h3>
                            <span className={getClassByRate(movie.vote_average)}>
                                {movie.vote_average}
                            </span>
                        </div>
                        <div className="overview">
                            <h3>Overview:</h3>
                            {movie.overview}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movie;
