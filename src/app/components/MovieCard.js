/* eslint-disable jsx-a11y/alt-text */
"use client";
import '../globals.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { AiFillHeart } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [genres, setGenres] = useState({});

  const API_KEY = "2d28186dc4d3643e787e6b233ee60211";

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const genresData = response.data.genres;
      // Convert genre IDs and store in the state
      const genresMap = {};
      genresData.forEach((genre) => {
        genresMap[genre.id] = genre.name;
      });
      setGenres(genresMap);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  // Function to get genre names from genre IDs
  const getGenreNames = (genreIds) => {
    return genreIds.map((genreId) => genres[genreId]).join(", ");
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatDateToUTC = (dateString) => {
    const date = new Date(dateString);
    const utcDateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
    return utcDateString;
  };
  return (
    <div data-testid="movie-card" id="movies">
      <Link href={`/movies/${movie.id}`}>
        <div className="movie-card">
          <span onClick={toggleFavorite}>
            {isFavorite ? (
              <AiFillHeart className="heart-filled" />
            ) : (
              <FiHeart className="heart" />
            )}
          </span>
          <Image
            data-testid="movie-poster"
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
          />
        </div>
        <p className="genre">{getGenreNames(movie.genre_ids)}</p>
        <h2 data-testid="movie-title">{movie.title}</h2>
        <div className="imdb-card">
          <span className="imbd-btn">
            <Image src={require("../assets/imdb.png")} />
            <p> {movie.vote_average}</p>
          </span>
          <span className="imbd-btn-two">
            <Image src={require("../assets/rot.png")} />
            <p> 97%</p>
          </span>
        </div> 
        <p className="release">
          <span data-testid="movie-release-date">Release Date in (UTC):</span>
          {`${formatDateToUTC(movie.release_date)} `}
        </p>
      </Link>
    </div>
  );
}

export default MovieCard;
