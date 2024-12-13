import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MovieContext } from "../app/App";
import { descriptionRequest, trailerRequest } from "../services/services";

export const useMovieDescription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setDescription, setTrailer, setSelectedMovieId, data } =
    useContext(MovieContext);

  const handleClickToMovieDescription = async (movieId) => {
    const response = await descriptionRequest(movieId);
    setDescription(response);
    const trailerResponse = await trailerRequest(movieId);
    setTrailer(trailerResponse.results);
    const selectedMovie = data.find((movie) => movie.id === movieId);
    setSelectedMovieId(selectedMovie);

    // Сохраняем текущие параметры URL при навигации
    navigate(`/movie/${movieId}${location.search}`, {
      state: selectedMovie,
    });
  };

  return handleClickToMovieDescription;
};

/* import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../app/App";
import { descriptionRequest, trailerRequest } from "../services/services";

export const useMovieDescription = () => {
  const navigate = useNavigate();
  const { setDescription, setTrailer, setSelectedMovieId, data } =
    useContext(MovieContext);

  const handleClickToMovieDescription = async (movieId) => {
    const response = await descriptionRequest(movieId);
    setDescription(response);
    const trailerResponse = await trailerRequest(movieId);
    setTrailer(trailerResponse.results);
    const selectedMovie = data.find((movie) => movie.id === movieId);
    setSelectedMovieId(selectedMovie);
    navigate(`/movie/${movieId}`, { state: selectedMovie });
  };

  return handleClickToMovieDescription;
};
 */
