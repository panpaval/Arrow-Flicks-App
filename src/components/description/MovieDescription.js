import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../app/App";
import Item from "../item/Item";
import "./description.css";
import { Divider } from "@mantine/core";

const MovieDescription = () => {
  const { selectedMovieId, genres, description, trailer } =
    useContext(MovieContext);
  const { id } = useParams();

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
