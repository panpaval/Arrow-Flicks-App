import { useState, useContext } from "react";
import { MovieContext } from "../app/App";
import RatingModal from "../modalwindow/Modalwindow";
import altImage from "./Alt.svg";
import "./item.css";
import {
  formatVoteCount,
  formatRuntime,
  formatDate,
  formatBudget,
} from "./function";

function Item({ movie, genres, description, isDetailView }) {
  const { favorites, setFavorites, movieRating, setMovieRating } =
    useContext(MovieContext);
  const [modalOpened, setModalOpened] = useState(false);

  const {
    original_title,
    title,
    release_date,
    vote_average,
    genre_ids,
    poster_path,
    vote_count,
  } = movie;

  const isFavorite = favorites.some((item) => item.id === movie.id);

  const handleStarClick = (event) => {
    event.stopPropagation();
    setModalOpened(true);
  };

  const saveRating = (rating) => {
    setMovieRating((prevRatings) => ({
      ...prevRatings,
      [movie.id]: rating,
    }));
    if (!isFavorite) {
      setFavorites([...favorites, { ...movie, rating }]);
    }
  };

  const removeRating = () => {
    setMovieRating((prevRatings) => {
      const newRatings = { ...prevRatings };
      delete newRatings[movie.id];
      return newRatings;
    });
    setFavorites(favorites.filter((item) => item.id !== movie.id));
  };

  const posterURL = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : altImage;

  const itemHeight = description ? "352px" : "170px";
  const itemWidth = description ? "250px" : "119px";

  const formattedVoteCount = vote_count
    ? formatVoteCount(movie.vote_count)
    : "";

  const genreNames = genre_ids
    .map((genreId) => {
      const genre = genres.find((item) => item.id === genreId);
      return genre ? genre.name : null;
    })
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={`item-container ${
        isDetailView ? "item-container-detail" : ""
      }`} /* className="item-container" */
    >
      <div className="image">
        <div
          className="image-container"
          style={{ height: itemHeight, width: itemWidth }}
        >
          <img src={posterURL} alt={title} />
        </div>
      </div>
      <div className="info-container">
        <div className="info">
          <div className="film-info">
            <div className="film-name">{original_title}</div>
            <div onClick={handleStarClick} className="rating">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 20.7084L6.79929 24.4942L8.17479 16.4757L2.34146 10.7975L10.3915 9.63086L13.9918 2.33569L17.5921 9.63086L25.6421 10.7975L19.8088 16.4757L21.1843 24.4942L14 20.7084Z"
                  fill={isFavorite ? "#9854f6" : "#d5d6dc"}
                  stroke={isFavorite ? "#9854f6" : "#d5d6dc"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isFavorite ? (
                <div className="rating-text">{movieRating[movie.id]}</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="text-style release_date">
            {release_date.split("-")[0]}
          </div>
          <div className="rating">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 20.7084L6.79929 24.4942L8.17479 16.4757L2.34146 10.7975L10.3915 9.63086L13.9918 2.33569L17.5921 9.63086L25.6421 10.7975L19.8088 16.4757L21.1843 24.4942L14 20.7084Z"
                fill="#fab005"
                stroke="#fab005"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="rating-text">{vote_average.toFixed(1)}</span>
            <span className="text-style">{formattedVoteCount}</span>
          </div>
        </div>
        {description ? (
          <div className="text-style">
            <div className="field-container">
              <div className="field-name">Duration</div>
              <div>{formatRuntime(description.runtime)} </div>
            </div>
            <div className="field-container">
              <div className="field-name">Premiere</div>
              <div>{formatDate(description.release_date)}</div>
            </div>
            <div className="field-container">
              <div className="field-name">Budget</div>
              <div>{formatBudget(description.budget)}</div>
            </div>
            <div className="field-container">
              <div className="field-name">Gross worldwide</div>
              <div>{formatBudget(description.revenue)}</div>
            </div>
            <div className="field-container">
              <div className="field-name">Genres</div>
              <div>{genreNames}</div>
            </div>
          </div>
        ) : (
          <div className="text-style">
            <div>Genres {genreNames}</div>
          </div>
        )}
      </div>
      <RatingModal
        opened={modalOpened}
        setOpened={setModalOpened}
        saveRating={saveRating}
        currentRating={movieRating[movie.id] || 0}
        removeRating={removeRating}
        movieTitle={movie.title}
      />
    </div>
  );
}

export default Item;
