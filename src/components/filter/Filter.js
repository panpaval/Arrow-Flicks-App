import "./filter.css";
import { Button, Select, NumberInput } from "@mantine/core";
import { ChevronDown, ChevronUp } from "tabler-icons-react";
import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../app/App";

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
  const [error, setError] = useState(null);
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
  const handleNumberChange = (field, value) => {
    if (value < 0 || value > 10) {
      setError("Value must be between 0 and 10");
    } else {
      setError(null);
      setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    }
  };

  const options = genres.map((item) => ({
    value: item.id,
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

  //запрет ввода + и -
  const handleKeyDown = (e) => {
    if (
      !/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight/.test(e.key) &&
      !e.ctrlKey
    ) {
      e.preventDefault();
    }
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

        {/* <div className="select">
          <div className="select-label">Ratings</div>
          <div className="filter-inputs">
            <NumberInput
              className="filter-raiting-from"
              placeholder={"from"}
              radius="md"
              min={0}
              step={1}
              size="md"
              type="number"
              onKeyDown={handleKeyDown}
              error={error}
              value={filters.voteAveragefrom > 0 ? filters.voteAveragefrom : ""}
              onChange={(value) => handleNumberChange("voteAveragefrom", value)}
              rightSection={
                <div className="rightSection">
                  <div
                    onClick={() =>
                      handleNumberChange(
                        "voteAveragefrom",
                        Number(filters.voteAveragefrom) + 1
                      )
                    }
                  >
                    <ChevronUp
                      size={15}
                      color={"#ACADB9"}
                      display={"block"}
                      className="chevron"
                    />
                  </div>
                  <div
                    onClick={() =>
                      handleNumberChange(
                        "voteAveragefrom",
                        Number(filters.voteAveragefrom) - 1
                      )
                    }
                  >
                    <ChevronDown
                      size={15}
                      color={"#ACADB9"}
                      display={"block"}
                      className="chevron"
                    />
                  </div>
                </div>
              }
            />

            <NumberInput
              className="filter-raiting-to"
              placeholder={"to"}
              radius="md"
              min={0}
              step={1}
              error={error}
              size="md"
              type="number"
              value={filters.voteAverageto > 0 ? filters.voteAverageto : ""}
              onKeyDown={handleKeyDown}
              onChange={(value) => handleNumberChange("voteAverageto", value)}
              rightSection={
                <div className="rightSection">
                  <div
                    onClick={() =>
                      handleNumberChange(
                        "voteAverageto",
                        Number(filters.voteAverageto) + 1
                      )
                    }
                  >
                    <ChevronUp
                      size={15}
                      color={"#ACADB9"}
                      display={"block"}
                      className="chevron"
                    />
                  </div>
                  <div
                    onClick={() =>
                      handleNumberChange(
                        "voteAverageto",
                        Number(filters.voteAverageto) - 1
                      )
                    }
                  >
                    <ChevronDown
                      size={15}
                      color={"#ACADB9"}
                      display={"block"}
                      className="chevron"
                    />
                  </div>
                </div>
              }
            />
          </div>
        </div> */}

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
      {/*  <div className="filter-sort-by">
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
      </div> */}
    </div>
  );
}

export default Filter;
