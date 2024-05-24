import { useState, useContext, useEffect } from "react";
import { MovieContext } from "../app/App";
import Item from "../item/Item";
import { Pagination, Input, Button } from "@mantine/core";
import { useMovieDescription } from "../list/useMovieDescription";
import "./favorites.css";
import { Search } from "tabler-icons-react";
import Frame_favorites from "./Frame_favorites.svg";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favorites, genres, setActiveButton } = useContext(MovieContext);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);
  const handleClickToMovieDescription = useMovieDescription();
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredFavorites(favorites);
  }, [favorites]);

  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentFavorites = filteredFavorites.slice(startIndex, endIndex);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

    if (event.target.value === "") {
      setFilteredFavorites(favorites);
    }
  };

  const handleSearch = () => {
    if (searchQuery === "") {
      setFilteredFavorites(favorites);
    } else {
      const filtered = favorites.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFavorites(filtered);
    }
    setCurrentPage(1);
  };

  return (
    <div>
      {currentFavorites.length > 0 ? (
        <>
          <div className="favorites-head">
            <p className="favorites-label">Rated movies</p>
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              className="search"
              size="md"
              radius="md"
              color="grape"
              icon={<Search size={18.57} />}
              placeholder="Search movie title"
              rightSection={
                <Button
                  onClick={handleSearch}
                  type="submit"
                  className="search-button"
                  radius="md"
                  color="grape"
                >
                  Search
                </Button>
              }
              styles={(theme) => ({
                input: {
                  "&:focus": {
                    borderColor: "#9854f6",
                    boxShadow: `0 0 0 0,5px #9854f6`,
                  },
                },
              })}
            ></Input>
          </div>

          <div className="list-container">
            {currentFavorites.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleClickToMovieDescription(movie.id)}
              >
                <Item movie={movie} genres={genres} />
              </div>
            ))}
          </div>
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={Math.ceil(filteredFavorites.length / itemsPerPage)}
            color="grape"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "fit-content",
              paddingTop: "8px",
            }}
          />
        </>
      ) : (
        <>
          <div className="frame-favorites">
            <img src={Frame_favorites} alt="Logo" />
            <p className="title-favorites"> You haven`t rated any films yet</p>
            <Button
              className="redirect-button"
              radius="md"
              color="grape"
              onClick={() => {
                navigate("/");
                setActiveButton("movies");
              }}
            >
              Find movies
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
