import "./navigate.css";
import logoImage from "./logo.svg";
import { Button } from "@mantine/core";
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MovieContext } from "../app/App";

function Navigate() {
  const { activeButton, setActiveButton } = useContext(MovieContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveButton("movies");
    } else if (location.pathname === "/favorites") {
      setActiveButton("favorites");
    }
  }, [location.pathname, setActiveButton]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === "movies") {
      navigate("/");
    } else if (buttonName === "favorites") {
      navigate("/favorites");
    }
  };

  return (
    <div className="container-navigate">
      <div className="logo-container">
        <img src={logoImage} alt="Logo" className="logo-image" />
        <div className="logo-text">ArrowFlicks</div>
      </div>
      <div className="button-container">
        <Button
          className={`button ${
            activeButton === "movies" ? "button-selected" : ""
          }`}
          radius="md"
          type="submit"
          variant="subtle"
          onClick={() => handleButtonClick("movies")}
        >
          Movies
        </Button>

        <Button
          className={`button ${
            activeButton === "favorites" ? "button-selected" : ""
          }`}
          radius="md"
          variant="subtle"
          onClick={() => handleButtonClick("favorites")}
        >
          Rated movies
        </Button>
      </div>
    </div>
  );
}

export default Navigate;
