import "./filter.css";
import { Button, Select } from "@mantine/core";
import { ChevronDown } from "tabler-icons-react";
import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../app/App";
import { DEFAULT_GENRES } from "./GenresArray";

function Filter() {
  const {
    genres,
    filters,
    setFilters,
    sortByOptions,
    firstRequest,
    setData,
    initialFilters,
    setLoading,
    setPageForRequest,
    setCurrentPage,
    setLoadedPages,
    setTotalPages,
  } = useContext(MovieContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);

  const ratingOptions = Array.from({ length: 11 }, (_, i) => ({
    value: i.toString(),
    label: i.toString(),
  }));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 750);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /*   const handleSelectChange = (field, value) => {
    if (value < 0) {
      value = 0;
    }
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };
 */

  const handleSelectChange = (field, value) => {
    setFilters((prevFilters) => {
      const newValue = Number(value);

      if (
        field === "voteAverageto" &&
        newValue < Number(prevFilters.voteAveragefrom)
      ) {
        return prevFilters;
      }

      if (
        field === "voteAveragefrom" &&
        newValue > Number(prevFilters.voteAverageto)
      ) {
        return {
          ...prevFilters,
          [field]: value,
          voteAverageto: value,
        };
      }

      return { ...prevFilters, [field]: value };
    });
  };

  const options = (genres.length > 0 ? genres : DEFAULT_GENRES).map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  const generateYearsOptions = (startYear, endYear) => {
    const yearsOptions = [];

    for (let year = endYear; year >= startYear; year--) {
      yearsOptions.push({ value: year.toString(), label: year.toString() });
    }

    return yearsOptions;
  };
  const yearsOptions = generateYearsOptions(1900, 2024);
  const handleResetFilters = () => {
    setData(firstRequest);
    setFilters(initialFilters);
    setLoading(false);
    setPageForRequest(2);
    setCurrentPage(1);
    setLoadedPages([1]);
    setTotalPages(3);
  };

  const sortByJsx = (
    <div className="select">
      <p className="select-label">Sort by</p>
      <Select
        radius="md"
        rightSection={
          <ChevronDown color={"#ACADB9"} size={30} strokeWidth={1.5} />
        }
        styles={{
          rightSection: { pointerEvents: "none" },
        }}
        size="md"
        transitionProps={{
          transition: "pop-top-left",
          duration: 200,
          timingFunction: "ease",
        }}
        data={sortByOptions}
        value={filters.sort_by}
        onChange={(value) => handleSelectChange("sort_by", value)}
        placeholder="Select sort"
      />
    </div>
  );

  return (
    <div className="filter">
      <p className="filter-label">Movies</p>
      <div className="filter-inputs">
        <div className="select">
          <p className="select-label">Geners</p>
          <Select
            radius="md"
            rightSection={
              <ChevronDown color={"#ACADB9"} size={30} strokeWidth={1.5} />
            }
            styles={{
              rightSection: { pointerEvents: "none" },
            }}
            size="md"
            transitionProps={{
              transition: "pop-top-left",
              duration: 200,
              timingFunction: "ease",
            }}
            data={options}
            placeholder="Select genre"
            value={filters.genres}
            onChange={(value) => handleSelectChange("genres", value)}
          />
        </div>

        <div className="select">
          <p className="select-label">Release year</p>
          <Select
            className=""
            radius="md"
            rightSection={
              <ChevronDown color={"#ACADB9"} size={30} strokeWidth={1.5} />
            }
            styles={{
              rightSection: { pointerEvents: "none" },
            }}
            size="md"
            transitionProps={{
              transition: "pop-top-left",
              duration: 200,
              timingFunction: "ease",
            }}
            data={yearsOptions}
            placeholder="Select release year"
            value={filters.release_date}
            onChange={(value) => handleSelectChange("release_date", value)}
          />
        </div>

        <div className="select">
          <div className="select-label">Ratings</div>
          <div className="filter-inputs">
            <Select
              className="filter-raiting-from"
              placeholder="from"
              radius="md"
              rightSection={
                <ChevronDown color={"#ACADB9"} size={30} strokeWidth={1.5} />
              }
              styles={{
                rightSection: { pointerEvents: "none" },
              }}
              size="md"
              transitionProps={{
                transition: "pop-top-left",
                duration: 200,
                timingFunction: "ease",
              }}
              data={ratingOptions}
              value={
                filters.voteAveragefrom
                  ? filters.voteAveragefrom.toString()
                  : ""
              }
              onChange={(value) => handleSelectChange("voteAveragefrom", value)}
            />

            <Select
              className="filter-raiting-to"
              placeholder="to"
              radius="md"
              rightSection={
                <ChevronDown color={"#ACADB9"} size={30} strokeWidth={1.5} />
              }
              styles={{
                rightSection: { pointerEvents: "none" },
              }}
              size="md"
              transitionProps={{
                transition: "pop-top-left",
                duration: 200,
                timingFunction: "ease",
              }}
              data={ratingOptions}
              value={
                filters.voteAverageto ? filters.voteAverageto.toString() : ""
              }
              onChange={(value) => handleSelectChange("voteAverageto", value)}
            />
          </div>
        </div>
        {isMobile && sortByJsx}
        <Button
          className="filter-reset-button"
          variant="link"
          onClick={handleResetFilters}
        >
          Reset filters
        </Button>
      </div>
      {!isMobile /* Рендерим sort-by здесь на десктопе */ && (
        <div className="filter-sort-by">{sortByJsx}</div>
      )}
    </div>
  );
}

export default Filter;
