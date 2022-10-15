import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies {
    getMovies {
      id
      posterImgUrl
      Genre {
        id
        name
      }
    }
  }
`;

export const GET_MOVIES_BY_ID = gql`
  query Query($movieId: ID) {
    getMovieById(id: $movieId) {
      id
      title
      synopsis
      trailerUrl
      rating
      Genre {
        name
        id
      }
      User {
        username
        _id
      }
      Casts {
        name
        id
      }
    }
  }
`;
