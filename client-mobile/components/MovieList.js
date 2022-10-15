import {
  View,
  ActivityIndicator,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import Hero from "./Hero";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../queries/movie";

const baseUrl = `https://boxflix.herokuapp.com`;

export default function MovieList({ genreHome }) {
  // const [movies, setMovies] = useState([]);
  // const [loadingMovie, setLoadingMovie] = useState(true);

  const { loading, error, data } = useQuery(GET_MOVIES);

  let dataToDisplay = data?.getMovies;

  if (genreHome != "All" && genreHome) {
    let filteredMovies = dataToDisplay.filter((el) => el.Genre.name == genreHome);
    dataToDisplay = filteredMovies;
  }

  const renderItem = ({ item }) => {
    return <MovieCard item={item} />;
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(`${baseUrl}/pub/movies`);
  //       if (genreHome != "All" && genreHome) {
  //         let filteredMovies = data.filter((el) => el.Genre.name == genreHome);
  //         setMovies(filteredMovies);
  //       } else {
  //         setMovies(data);
  //       }
  //     } catch (err) {
  //       Alert.alert("Error", `${err.response.data.message}`);
  //     } finally {
  //       setLoadingMovie(false);
  //     }
  //   };
  //   fetchData();
  // }, [genreHome]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <View style={styles.movieList}>
      <FlatList
        style={{ flex: 1 }}
        data={dataToDisplay}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        ListHeaderComponent={<Hero />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  movieList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  movieCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  poster: {
    margin: 5,
    borderRadius: 10,
    width: 115,
    height: 175,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
