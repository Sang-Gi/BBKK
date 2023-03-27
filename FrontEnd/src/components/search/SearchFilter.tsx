import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useMediaQuery } from "@mui/material";
import LocationForm from "@components/search/filter/LocationForm";
import GenreForm from "./filter/GenreForm";
import DifficultyForm from "./filter/DifficultyForm";
import PeopleForm from "./filter/PeopleForm";
import TimeForm from "./filter/TimeForm";
import TuneIcon from "@mui/icons-material/Tune";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import { useState } from "react";
import styled from "styled-components";

export default function SearchFilter() {
  const [filterButtonState, setFilterButtonState] = useState(false);
  const openFilter = () => {
    setFilterButtonState(true);
  };
  const closeFilter = () => {
    setFilterButtonState(false);
  };
  // 필터 적용 API를 사용
  const setFilter = () => {
    setFilterButtonState(false);
  };

  const isLabtop = useMediaQuery("(max-height: 800px)");

  return (
    <>
      <FilterButton onClick={filterButtonState ? closeFilter : openFilter}>
        <TuneIcon fontSize="inherit" />
        <p>필터</p>
      </FilterButton>
      <Modal
        open={filterButtonState}
        onClose={setFilterButtonState}
        sx={isLabtop ? ModalStyleOnLabtop768p : ModalStyleOnDesktop1080p}
        hideBackdrop={true}
      >
        <FilterContainer>
          <LocationForm />
          <GenreForm />
          <DifficultyForm />
          <PeopleForm />
          <TimeForm />
          <ButtonContainer>
            <OkButton onClick={setFilter}>필터 적용</OkButton>
            <CancelButton onClick={closeFilter}>취소</CancelButton>
          </ButtonContainer>
        </FilterContainer>
      </Modal>
    </>
  );
}

const FilterButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 4rem;
  width: 8rem;
  font-size: 1.8rem;
  font-weight: 600;
  border-radius: 10px;
  color: white;
  border: 1px solid white;
  background: none;
  cursor: pointer;
`;

const FilterContainer = mstyled(Box)`
  display: flex;
  flex-direction: column;
  font-size: 1.7rem;
  font-weight: 600;
  width: 31rem;
  gap: 1.5rem;
  padding: 4rem;
  border: 0.2rem solid white;
  border-radius: 1.5rem;
  background-color: ${theme.colors.background};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

const ModalStyleOnLabtop768p = {
  position: "absolute",
  top: "21vh",
  left: "66vw",
  border: "none",
  background: "none",
  color: "white",
};

const ModalStyleOnDesktop1080p = {
  position: "absolute",
  top: "20vh",
  left: "73vw",
  border: "none",
  background: "none",
  color: "white",
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  margin-top: 2rem;
`;

const OkButton = styled.button`
  color: ${theme.colors.white};
  background-color: ${theme.colors.pink};
  border-radius: 10px;
  border: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  width: 100%;
`;

const CancelButton = styled.button`
  color: ${theme.colors.pink};
  background-color: ${theme.colors.white};
  border-radius: 10px;
  border: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  width: 100%;
`;