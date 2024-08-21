import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// Define your styled components
const NewReleasesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;

const CoverImage = styled.img`
  object-fit: cover;
  margin-bottom: 10px;
  height: 362px;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  text-transform: capitalize;
`;

const Overview = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

// Create the NewReleasesComponent
const NewReleasesComponent = () => {
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/upcoming", {
          params: {
            api_key: "c45a857c193f6302f2b5061c3b85e743",
            language: "en-US",
            page: 1
          }
        });
        setNewReleases(response.data.results);
      } catch (error) {
        console.error("Error fetching new releases", error);
      }
    };

    fetchNewReleases();
  }, []);

  if (!newReleases || newReleases.length === 0) {
    return <div>No New Releases Found</div>;
  }

  return (
    <NewReleasesContainer>
      {newReleases.map((movie) => (
        <MovieContainer key={movie.id}>
          <CoverImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <MovieName>{movie.title || movie.original_title}</MovieName>
          <InfoColumn>
            <MovieInfo>Rating: {movie.vote_average.toFixed(1)}</MovieInfo>
          </InfoColumn>
          {/* <Overview>{movie.overview}</Overview> */}
        </MovieContainer>
      ))}
    </NewReleasesContainer>
  );
};

export default NewReleasesComponent;
