const baseUrl = `${process.env.REACT_APP_BASE_URL}/api`;

export async function request(filters, page) {
  if (!page) {
    page = 1;
  }

  let url = `${baseUrl}/movies?page=${page}`;

  if (filters) {
    if (filters.genres) {
      url += `&with_genres=${filters.genres}`;
    }
    if (filters.release_date) {
      url += `&primary_release_year=${filters.release_date}`;
    }
    if (filters.voteAveragefrom) {
      url += `&vote_average.gte=${filters.voteAveragefrom}`;
    }
    if (filters.voteAverageto) {
      url += `&vote_average.lte=${filters.voteAverageto}`;
    }
    if (filters.sort_by) {
      url += `&sort_by=${filters.sort_by}`;
    }
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching movies list");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in movies request:", error);
    throw error;
  }
}

export async function genresRequest() {
  let url = `${baseUrl}/genres`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching genres");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error in genres request:", error);
    throw error;
  }
}

export async function descriptionRequest(movieId) {
  let url = `${baseUrl}/movie/${movieId}/description`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching movie description");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie description:", error);
    throw error;
  }
}

export async function trailerRequest(movieId) {
  let url = `${baseUrl}/movie/${movieId}/videos`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching movie trailers");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
    throw error;
  }
}

//сервисный компонент для работы без проксирования, если вдруг отвалится server.js
/* const API_KEY = "06daef32dd30e319a5583e95b29ce1ef";
const baseUrl = `https://api.themoviedb.org/3`;
const movieListEndpoint = "/discover/movie";
const genersListEndpoint = "/genre/movie/list";
const descriptionEndpoint = "/movie/";
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/11?api_key=06daef32dd30e319a5583e95b29ce1ef

export async function request(filters, page) {
  if (!page) {
    page = 1;
  }

  let url = `${baseUrl}${movieListEndpoint}?api_key=${API_KEY}&language=en-US&page=${page}`;

  if (filters && filters.genres) {
    url += `&with_genres=${filters.genres}`;
  }
  if (filters && filters.release_date) {
    url += `&primary_release_year=${filters.release_date}`;
  }
  if (filters && filters.voteAveragefrom) {
    url += `&vote_average.gte=${filters.voteAveragefrom}`;
  }
  if (filters && filters.voteAverageto) {
    url += `&vote_average.lte=${filters.voteAverageto}`;
  }
  if (filters && filters.sort_by) {
    url += `&sort_by=${filters.sort_by}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error("Error!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function genresRequest() {
  let url = `${baseUrl}${genersListEndpoint}?api_key=${API_KEY}&language=en-US`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error("Error!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


export async function descriptionRequest(movieId) {
  let url = `${baseUrl}${descriptionEndpoint}${movieId}?api_key=${API_KEY}&language=en-US`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error("Error!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function trailerRequest(movieId) {
  let url = `${baseUrl}${descriptionEndpoint}${movieId}/videos?api_key=${API_KEY}&language=en-US`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error("Error!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
 */
