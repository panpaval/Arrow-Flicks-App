let fetch;
(async () => {
  fetch = (await import("node-fetch")).default;
})();

require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001; //////изменил с 3000
const API_KEY = process.env.TMDB_API_KEY;

const MOVIE_LIST_ENDPOINT = "/discover/movie";
const GENRES_LIST_ENDPOINT = "/genre/movie/list";
const MOVIE_DESCRIPTION_ENDPOINT = "/movie/";

app.use(cors());
app.use(express.json());

const buildApiUrl = (path, queryParams = {}) => {
  const query = new URLSearchParams({ ...queryParams, api_key: API_KEY });
  return `https://api.themoviedb.org/3${path}?${query}`;
};

app.get("/api/movies", async (req, res) => {
  const url = buildApiUrl(MOVIE_LIST_ENDPOINT, req.query);

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.get("/api/genres", async (req, res) => {
  const url = buildApiUrl(GENRES_LIST_ENDPOINT);

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching genres" });
  }
});

app.get("/api/movie/:id/description", async (req, res) => {
  const { id } = req.params;
  const url = buildApiUrl(`${MOVIE_DESCRIPTION_ENDPOINT}${id}`);

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching movie description" });
  }
});

app.get("/api/movie/:id/videos", async (req, res) => {
  const { id } = req.params;
  const url = buildApiUrl(`${MOVIE_DESCRIPTION_ENDPOINT}${id}/videos`);

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching movie trailers" });
  }
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
