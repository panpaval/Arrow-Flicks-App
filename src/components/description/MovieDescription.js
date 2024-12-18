import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../app/App";
import Item from "../item/Item";
import "./description.css";
import { Divider } from "@mantine/core";
import { descriptionRequest, trailerRequest } from "../services/services";
import LoaderForList from "../skeleton/loader";

const MovieDescription = () => {
  const {
    selectedMovieId,
    setSelectedMovieId,
    genres,
    description,
    setDescription,
    trailer,
    setTrailer,
  } = useContext(MovieContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieData = async () => {
      if (!selectedMovieId || selectedMovieId.id !== parseInt(id)) {
        setLoading(true);
        try {
          const [movieData, trailerData] = await Promise.all([
            descriptionRequest(id),
            trailerRequest(id),
          ]);

          // Создаем объект фильма из полученных данных
          const movieObject = {
            id: parseInt(id),
            title: movieData.title,
            original_title: movieData.original_title,
            release_date: movieData.release_date,
            vote_average: movieData.vote_average,
            poster_path: movieData.poster_path,
            vote_count: movieData.vote_count,
            genre_ids: movieData.genres.map((genre) => genre.id),
          };

          setSelectedMovieId(movieObject);
          setDescription(movieData);
          setTrailer(trailerData.results);
        } catch (err) {
          setError("Failed to load movie data");
          console.error("Error loading movie data:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadMovieData();
  }, [id, selectedMovieId, setSelectedMovieId, setDescription, setTrailer]);

  if (loading) {
    return (
      <div className="spiner-description">
        <LoaderForList />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function findOfficialTrailer(videos) {
    return videos.find(
      (video) => video.type === "Trailer" && video.official === true
    );
  }

  const officialTrailer = findOfficialTrailer(trailer);

  return (
    <div>
      {selectedMovieId && selectedMovieId.id === parseInt(id) && (
        <>
          <Item
            movie={selectedMovieId}
            genres={genres}
            description={description}
            isDetailView={true}
          />
          {officialTrailer && (
            <div className="description-container">
              <h2 className="title-descriprion">Trailer</h2>
              <iframe
                className="video-container"
                width="500"
                height="281"
                src={`https://www.youtube.com/embed/${officialTrailer.key}`}
                title="YouTube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <Divider size="xs" className="devider" />
              <h2 className="title-descriprion">Description</h2>
              <div className="text-descripton">{description.overview}</div>
              <Divider size="xs" className="devider" />
              <h2 className="title-descriprion last-child">Production</h2>
              {description.production_companies.map((company) => (
                <div key={company.id} className="production-company">
                  <img
                    src={`https://image.tmdb.org/t/p/w45${company.logo_path}`}
                    alt={company.name}
                  />
                  <span className="production-company-text">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieDescription;
