import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { fetchMovieDetails } from "../ApiService";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1c1c1c;
  color: #fff;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const MoviePoster = styled.img`
  width: 120px;
  height: 180px;
  margin-right: 20px;
`;

const HeaderInfo = styled.div`
  h1 {
    margin: 0;
    font-size: 24px;
  }

  p {
    margin: 5px 0 0;
    font-size: 14px;
  }
`;

const Overview = styled.div`
  p {
    font-size: 16px;
  }
`;

const Cast = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
`;

const CastMember = styled.div`
  img {
    width: 100%;
    height: auto;
  }

  p {
    text-align: center;
    margin-top: 5px;
    font-size: 14px;
  }
`;
const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const Api_Key = "c45a857c193f6302f2b5061c3b85e743";
  const BASE_URL5 = `https://api.themoviedb.org/3/movie/${id}?api_key=${Api_Key}&language=en-US`;

  useEffect(() => {

      const fetchData = async () => {
        try {
          const detail = await fetchMovieDetails(id);
          setMovieDetail(detail);
        } catch (error) {
          console.error("Failed to fetch movie details", error);
        }
      };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <MoviePoster src={movie.poster_path} alt={movie.title} />
        <HeaderInfo>
          <h1>{movie.title}</h1>
          <p>Rating: {movie.vote_average}</p>
          <p>{movie.runtime} min | {movie.genres.map((genre) => genre.name).join(", ")}</p>
          <p>Release Date: {movie.release_date}</p>
        </HeaderInfo>
      </Header>
      <Overview>
        <p>{movie.overview}</p>
      </Overview>
      <Cast>
        {movie.cast.map((castMember) => (
          <CastMember key={castMember.id}>
            <img src={castMember.profile_path} alt={castMember.name} />
            <p>{castMember.name}</p>
          </CastMember>
        ))}
      </Cast>
    </Container>
  );
};

export default MovieDetails;