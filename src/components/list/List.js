import { useEffect, useContext, useState } from "react";
import { MovieContext } from "../app/App";
import { request, genresRequest } from "../services/services";
import Item from "../item/Item";
import "./list.css";
import LoaderForList from "../skeleton/loader";
import { Pagination } from "@mantine/core";
import Frame from "./Frame 116046655.svg";
import { useMovieDescription } from "./useMovieDescription";

function List() {
  const itemsPerPage = 20;

  const [cachedPages, setCachedPages] = useState({});

  const {
    genres,
    setGenres,
    filters,
    data,
    setData,
    setFirstRequest,
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
  } = useContext(MovieContext);

  const handleClickToMovieDescription = useMovieDescription();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const genresResponse = await genresRequest();
        setGenres(genresResponse.genres);

        const moviesResponse = await request(filters);

        setData(moviesResponse.results);
        setFirstRequest(moviesResponse.results);
        setCurrentPage(1);
        setPageForRequest(2);
        setLoadedPages([1]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    setCachedPages({});
    fetchData();
  }, [filters]);

  const filteredData = data.map((movie) => ({
    id: movie.id,
    genre_ids: movie.genre_ids,
    original_title: movie.original_title,
    title: movie.title,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path,
    vote_count: movie.vote_count,
  }));

  const startIndex = 0;
  const endIndex = itemsPerPage;
  const limitedData = filteredData.slice(startIndex, endIndex);

  /* 
  useEffect(() => {
    setCachedPages({});
  }, [filters]); */

  console.log("cached", cachedPages);
  const handlePaginationChange = async (page) => {
    setCurrentPage(page);

    if (cachedPages[page]) {
      // Если данные уже в кэше, используем их
      setData(cachedPages[page]);
    } else {
      setLoading(true);
      try {
        const response = await request(filters, page);
        setData(response.results);
        // Сохраняем данные в кэш
        setCachedPages((prev) => ({ ...prev, [page]: response.results }));
        setLoadedPages([...new Set([...loadedPages, page])]);

        if (page >= totalPages) {
          setTotalPages(page + 1);
        }
      } catch (error) {
        console.error("Error fetching data for page:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  /*  const handlePaginationChange = async (page) => {
    setCurrentPage(page);

    // Проверяем, есть ли данные в sessionStorage
    const cachedData = sessionStorage.getItem(`page_${page}`);

    if (cachedData) {
      // Если данные есть в кэше, используем их
      setData(JSON.parse(cachedData));
    } else {
      setLoading(true);
      try {
        const response = await request(filters, page);
        setData(response.results);

        // Сохраняем данные в sessionStorage
        sessionStorage.setItem(
          `page_${page}`,
          JSON.stringify(response.results)
        );

        setLoadedPages([...new Set([...loadedPages, page])]);

        if (page >= totalPages) {
          setTotalPages(page + 1);
        }
      } catch (error) {
        console.error("Error fetching data for page:", error);
      } finally {
        setLoading(false);
      }
    }
  }; */

  /*  const handlePaginationChange = async (page) => {
    setCurrentPage(page);
    setLoading(true);

    try {
      const response = await request(filters, page);
      setData(response.results);
      setLoadedPages([...new Set([...loadedPages, page])]);

      if (page >= totalPages) {
        setTotalPages(page + 1);
      }
    } catch (error) {
      console.error("Error fetching data for page:", error);
    } finally {
      setLoading(false);
    }
  }; */

  /*   const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const limitedData = filteredData.slice(startIndex, endIndex);

  const loadMoreData = async () => {
    try {
      setLoading(true);
      const response = await request(filters, pageForRequest);

      setData([...data, ...response.results]);
      console.log("loadMoreData", data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching more data:", error);
      setLoading(false);
    }
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);

    if (!loadedPages.includes(page)) {
      setPageForRequest(page + 1);
      loadMoreData(page);
      setLoadedPages([...loadedPages, pageForRequest]);
      if (page === totalPages) {
        setTotalPages(page + 1);
      }
    }
  }; */

  console.log("Data", data);
  console.log("currentPage", currentPage);
  console.log("pageForRequest", pageForRequest);
  console.log("loadedPages", loadedPages);

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <LoaderForList />
        </div>
      ) : data.length === 0 ? (
        <div className="frame">
          <img src={Frame} alt="Logo" />
        </div>
      ) : (
        <>
          <div className="list-container">
            {limitedData.map((movie) => (
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
            total={totalPages}
            siblings={1}
            boundaries={0}
            onChange={handlePaginationChange}
            color="grape"
            style={{
              marginLeft: "auto",
              marginRight: 0,
              width: "fit-content",
              paddingTop: "24px",
            }}
          />
        </>
      )}
    </div>
  );
}

export default List;
