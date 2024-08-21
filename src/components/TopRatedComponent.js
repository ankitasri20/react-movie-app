import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchTopRatedData } from "../ApiService"; // Make sure to add this function in ApiService

const TopRatedContainer = styled.div`
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
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  text-transform: capitalize;
  margin-right: 10px; /* Space between info items */
`;

const Overview = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

const TopRatedComponent = () => {
  const [topRatedData, setTopRatedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetchTopRatedData();
      setTopRatedData(movies);
    };

    fetchData();
  }, []);

  if (!topRatedData || topRatedData.length === 0) {
    return <div>No Top Rated Movies Found</div>;
  }

  return (
    <TopRatedContainer>
      {topRatedData.map((movie) => (
        <MovieContainer key={movie.id}>
          <CoverImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <MovieName>{movie.title || movie.original_title}</MovieName>
          <InfoColumn>
            <MovieInfo>Rating: {movie.vote_average.toFixed(1)}</MovieInfo>
          </InfoColumn>
          {/* <Overview>{movie.overview}</Overview> */}
        </MovieContainer>
      ))}
    </TopRatedContainer>
  );
};

export default TopRatedComponent;
