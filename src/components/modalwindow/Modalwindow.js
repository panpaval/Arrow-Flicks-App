import { useState } from "react";
import { Modal, Group, Button } from "@mantine/core";
import "./modalwindow.css";
import { Divider } from "@mantine/core";

function RatingModal({
  opened,
  setOpened,
  saveRating,
  currentRating,
  removeRating,
  movieTitle,
}) {
  const [rating, setRating] = useState(currentRating || 0);

  const handleStarClick = (index, event) => {
    event.stopPropagation();
    setRating(index + 1);
  };

  const handleSaveClick = (event) => {
    event.stopPropagation();
    saveRating(rating);
    setOpened(false);
  };

  const handleRemoveClick = (event) => {
    event.stopPropagation();
    removeRating();
    setOpened(false);
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const stars = Array.from({ length: 10 }, (_, index) => (
    <svg
      key={index}
      onClick={(event) => handleStarClick(index, event)}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer", marginRight: "-11px" }}
    >
      <path
        d="M14 20.7084L6.79929 24.4942L8.17479 16.4757L2.34146 10.7975L10.3915 9.63086L13.9918 2.33569L17.5921 9.63086L25.6421 10.7975L19.8088 16.4757L21.1843 24.4942L14 20.7084Z"
        fill={index < rating ? "#FAB005" : "#d5d6dc"}
        stroke={index < rating ? "#FAB005" : "#d5d6dc"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ));

  return (
    <div>
      {/*  <Modal
        onClick={handleModalClick}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Your raiting"
        centered
        size={380}
        radius="md"
      > */}
      <Modal
        onClick={handleModalClick}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Your raiting"
        centered
        size={{
          base: "85%",
          xs: "380px",
        }}
        radius="md"
      >
        <Divider size="xs" className="devider-modal" />
        <p className="film-name-modal">{movieTitle}</p>
        <div className="star-container">
          <Group position="center">{stars}</Group>
        </div>
        <Button onClick={handleSaveClick} radius="md" color="grape">
          Save
        </Button>
        <Button
          onClick={handleRemoveClick}
          radius="md"
          variant="subtle"
          color="grape"
        >
          Remove rating
        </Button>
      </Modal>
    </div>
  );
}

export default RatingModal;
