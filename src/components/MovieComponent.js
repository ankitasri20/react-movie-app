import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchMovieData } from "../ApiService";

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

const MovieComponent = ({ searchQuery }) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await fetchMovieData(searchQuery);
      setMovieData(movies);
    };

    fetchData();
  }, [searchQuery]);

  if (!movieData || movieData.length === 0) {
    return <div>No Movies Found</div>;
  }

  return movieData.map((movie) => (
    <MovieContainer key={movie.id}>

      <CoverImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <MovieName>{movie.title || movie.original_title}</MovieName>
      <InfoColumn>
        <MovieInfo>Rating: {movie.vote_average.toFixed(1)}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  ));
};

export default MovieComponent;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { fetchMovieDetails} from "../ApiService";

// const MovieContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 20px;
//   padding: 10px;
//   width: 280px;
//   box-shadow: 0 3px 10px 0 #aaa;
//   cursor: pointer;
// `;

// const CoverImage = styled.img`
//   object-fit: cover;
//   margin-bottom: 10px;
//   height: 362px;
// `;

// const MovieName = styled.span`
//   font-size: 18px;
//   font-weight: 600;
//   color: black;
//   margin-bottom: 10px;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   overflow: hidden;
// `;

// const InfoColumn = styled.div`
//   display: flex;
//   margin-bottom: 10px;
//   flex-direction: row;
//   justify-content: space-between;
// `;

// const MovieInfo = styled.span`
//   font-size: 16px;
//   font-weight: 500;
//   color: black;
//   text-transform: capitalize;
//   margin-right: 10px; /* Space between info items */
// `;

// const Overview = styled.div`
//   font-size: 14px;
//   color: #666;
//   margin-top: 10px;
// `;

// const MovieComponent = ({ searchQuery }) => {
//   const [movieData, setMovieData] = useState([]);
//   const navigate = useNavigate();  // Hook for navigation

//   useEffect(() => {
//     const fetchData = async () => {
//       const movies = await fetchMovieDetails(searchQuery);
//       setMovieData(movies);
//     };

//     fetchData();
//   }, [searchQuery]);

//   const handleClick = (movieId) => {
//     navigate(`/movie/${movieId}`);  // Navigate to the movie detail page
//   };

//   if (!movieData || movieData.length === 0) {
//     return <div>No Movies Found</div>;
//   }

//   return movieData.map((movie) => (
//     <MovieContainer key={movie.id} onClick={() => handleClick(movie.id)}>
//       <CoverImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
//       <MovieName>{movie.title || movie.original_title}</MovieName>
//       <InfoColumn>
//         <MovieInfo>Rating: {movie.vote_average.toFixed(1)}</MovieInfo>
//       </InfoColumn>
//     </MovieContainer>
//   ));
// };

// export default MovieComponent;
