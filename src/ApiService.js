import axios from "axios";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743"; 
const BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const BASE_URL2 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const BASE_URL3 = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
export const fetchMovieData = async () => {
  try {
    const response = await axios.get(BASE_URL);

    if (response.data && response.data.results) {
      return response.data.results;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching movie data", error);
    return [];
  }
};



// Fetch top-rated movies
export const fetchTopRatedData = async () => {
  try {
    const response = await axios.get(BASE_URL2, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1
      }
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top-rated movies", error);
    return [];
  }
};

// Fetch new releases (upcoming movies)
export const fetchNewReleasesData = async () => {
  try {
    const response = await axios.get(BASE_URL3, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1
      }
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching new releases", error);
    return [];
  }
};
