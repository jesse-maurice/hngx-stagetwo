/* eslint-disable react/jsx-key */
// pages/search.js
"use client";
import {
  useEffect,
  useState,
} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';

import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load the saved search text from localStorage on component mount
  useEffect(() => {
    const savedText = localStorage.getItem("searchText");
    if (savedText) {
      setSearchText(savedText);
    }
  }, []);

  const fetchSearch = async () => {
    if (searchText.trim() === "") {
      // Don't make the API request if the search text is empty
      return;
    }
    setIsLoading(true);
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=2d28186dc4d3643e787e6b233ee60211&language=en-US&page=1&include_adult=false&query=${searchText}`
      );
      const { results } = await data.json();
      setContent(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false); // Set isLoading to false when fetch is complete
    }
  };

  // Fetch search results when the component mounts or when searchText changes
  useEffect(() => {
    fetchSearch();
  }, [searchText]);

  const Trigger = (e) => {
    setSearchText(e.target.value);
  };

  const Search = (e) => {
    e.preventDefault();
    fetchSearch();
  };

  return (
    <>
      <nav className="navbar search">
        <div className="logo">
          <Link href="/">
            <Image
              src={require("../assets/tv.png")}
              alt="logo"
              width={50}
              height={50}
            />
            <h2>MovieBox</h2>
          </Link>
        </div>
        <form onSubmit={Search}>
          <input
            type="text"
            placeholder="What do you want to watch?"
            onChange={Trigger}
            value={searchText}
          />
          <button type="submit" onClick={Search}>
            <FiSearch color="#fff" size={20} />
          </button>
        </form>
        <div className="signin">
          <h2>Sign in</h2>
          <Image
            src={require("../assets/Menu.png")}
            alt="sign in"
            width={30}
            height={30}
          />
        </div>
      </nav>

      {isLoading ? (
        // Display a loading indicator while fetching
        <div className="loading">Loading...</div>
      ) : (
        <>
          <h2 className="searchText">
            Search Results for{" "}
            <span style={{ color: "red" }}>{searchText}</span>
          </h2>
          <div className="search-results">
            {content.map((movie) => (
              <div className="search-page" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Search;
