"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';

import MovieDetails from '@/app/components/MovieDetails';

function MovieDetailsPage({ params }) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const TMDB_API_KEY = "2d28186dc4d3643e787e6b233ee60211";
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const movieData = response.data;
        setMovie(movieData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id, TMDB_API_KEY]);

  // Check if 'id' exists and is not undefined
  if (id === undefined) {
    return <div className="loading"></div>;
  }

  return (
    <div>
      {isLoading && (
        <div className="loading">
        </div>
      )}
      {isError && <p>Error fetching data</p>}
      {movie && <MovieDetails movie={movie} />}
    </div>
  );
}

export default MovieDetailsPage;
