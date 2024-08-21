
import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieComponent from "./components/MovieComponent";
import TopRatedComponent from "./components/TopRatedComponent";
import NewReleasesComponent from "./components/NewReleaseComponent";
import MovieDetailComponent from "./components/MovieDetailComponent"; // Import the detail component
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: gray;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  color: white;
  font-size: 12px;
  line-height: 25px;
  flex: 1;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SearchInput = styled.input`
  font-size: 13px;
  color: black;
  background-color: lightgray;
  padding: 5px;
  border-radius: 5px;
  width: 120px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

const SearchButton = styled.button`
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #777;
  }
`;

const Label = styled.div`
  font-size: 12px;
  color: white;
  background-color: ${(props) => (props.selected ? '#555' : 'gray')};
  padding: 5px 10px;
  border-radius: 3px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 60px;
  justify-content: space-evenly;
`;

function App() {
  const [view, setView] = useState("Popular");
  const [searchQuery, updateSearchQuery] = useState("");

  const onTextChange = (event) => {
    updateSearchQuery(event.target.value);
  };

  const handleLabelClick = (viewType) => {
    setView(viewType);
  };

  return (
    <Container>
      <Header>
        <AppName>MovieDb</AppName>
        <Label 
          selected={view === "Popular"} 
          onClick={() => handleLabelClick("Popular")}
        >
          Popular
        </Label>
        <Label 
          selected={view === "Top Rated"} 
          onClick={() => handleLabelClick("Top Rated")}
        >
          Top Rated
        </Label>
        <Label 
          selected={view === "New Releases"} 
          onClick={() => handleLabelClick("New Releases")}
        >
          Upcoming
        </Label>
        <SearchBox>
          <SearchInput 
            placeholder="Search" 
            value={searchQuery} 
            onChange={onTextChange} 
          />
          <SearchButton>Search</SearchButton>
        </SearchBox>
      </Header>

      <MovieListContainer>
        {view === "Popular" && <MovieComponent searchQuery={searchQuery} />}
        {view === "Top Rated" && <TopRatedComponent />}
        {view === "New Releases" && <NewReleasesComponent />}
      </MovieListContainer>
    </Container>
  );
}

export default App;


