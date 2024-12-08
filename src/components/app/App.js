import React from "react";
import { useState, useEffect } from "react";
import "./app.css";
import "normalize.css/normalize.css";
import Navigate from "../navigate/Navigate";
import Filter from "../filter/Filter";
import List from "../list/List";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDescription from "../description/MovieDescription";
import Favorites from "../favorites/Favorites";

export const MovieContext = React.createContext();

const initialFilters = {
  genres: "",
  release_date: "",
  voteAveragefrom: "",
  voteAverageto: "",
  sort_by: "",
};

const sortBy = [
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "release_date.asc", label: "Release Date Ascending" },
  { value: "release_date.desc", label: "Release Date Descending" },
  { value: "revenue.desc", label: "Revenue Descending" },
  {
    value: "primary_release_date.asc",
    label: "Primary Release Date Ascending",
  },
  {
    value: "primary_release_date.desc",
    label: "Primary Release Date Descending",
  },
  { value: "original_title.asc", label: "Original Title Ascending" },
  { value: "original_title.desc", label: "Original Title Descending" },
  { value: "vote_average.asc", label: "Vote Average Ascending" },
  { value: "vote_average.desc", label: "Vote Average Descending" },
  { value: "vote_count.asc", label: "Vote Count Ascending" },
  { value: "vote_count.desc", label: "Vote Count Descending" },
];

function App() {
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [data, setData] = useState([]);
  const [firstRequest, setFirstRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageForRequest, setPageForRequest] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState([1]);
  const [totalPages, setTotalPages] = useState(3);
  const [sortByOptions, setSortByOptions] = useState(sortBy);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [description, setDescription] = useState([]);
  const [trailer, setTrailer] = useState([]);
  /* const [favorites, setFavorites] = useState([]); */
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("movies_favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("movies_favorites", JSON.stringify(favorites));
  }, [favorites]);

  console.log("favorites LOCALSTORAGE", favorites);
  const [activeButton, setActiveButton] = useState("movies");
  /*  const [movieRating, setMovieRating] = useState({}); */
  const [movieRating, setMovieRating] = useState(() => {
    const savedRatings = localStorage.getItem("movieRatings");
    return savedRatings ? JSON.parse(savedRatings) : {};
  });

  useEffect(() => {
    localStorage.setItem("movieRatings", JSON.stringify(movieRating));
  }, [movieRating]);

  useEffect(() => {
    const hasFilters = Object.values(filters).some((filter) => filter !== "");
    const revenueAscending = {
      value: "revenue.asc",
      label: "Revenue Ascending",
    };
    const revenueDescendingIndex = sortByOptions.findIndex(
      (option) => option.value === "revenue.desc"
    );

    if (hasFilters) {
      if (
        !sortByOptions.find((option) => option.value === revenueAscending.value)
      ) {
        const updatedSortByOptions = [...sortByOptions];
        if (revenueDescendingIndex !== -1) {
          updatedSortByOptions.splice(
            revenueDescendingIndex,
            0,
            revenueAscending
          );
        } else {
          updatedSortByOptions.push(revenueAscending);
        }
        setSortByOptions(updatedSortByOptions);
      }
    } else {
      const updatedSortByOptions = sortByOptions.filter(
        (option) => option.value !== revenueAscending.value
      );
      setSortByOptions(updatedSortByOptions);
    }
  }, [filters]);

  return (
    <MovieContext.Provider
      value={{
        genres,
        movieRating,
        setMovieRating,
        setGenres,
        filters,
        setFilters,
        data,
        setData,
        firstRequest,
        setFirstRequest,
        initialFilters,
        sortByOptions,
        loading,
        setLoading,
        pageForRequest,
        setPageForRequest,
        currentPage,
        setCurrentPage,
        loadedPages,
        setLoadedPages,
        totalPages,
        setTotalPages,
        selectedMovieId,
        setSelectedMovieId,
        description,
        setDescription,
        trailer,
        setTrailer,
        favorites,
        setFavorites,
        activeButton,
        setActiveButton,
      }}
    >
      <Router>
        <div className="container">
          <div className="navigate">
            <Navigate />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <div className="main">
                  <Filter />
                  <List />
                </div>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <div className="movie-descripption">
                  <MovieDescription />
                </div>
              }
            />
            <Route
              path="/favorites"
              element={
                <div className="main">
                  <Favorites />
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </MovieContext.Provider>
  );
}

export default App;
