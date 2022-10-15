import { Alert, View, Text, Button, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import MovieCard from "./MovieCard";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../queries/movie";

const baseUrl = `https://boxflix.herokuapp.com`;

export default function MoreLikeThis({ idDetail, genreName }) {
  const { loading, error, data } = useQuery(GET_MOVIES);

  let dataToDisplay = data?.getMovies.filter((el) => el.id !== idDetail && el.Genre.name == genreName);

  const renderItem = ({ item }) => {
    return <MovieCard item={item} />;
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchData = async () => {
  //       try {
  //         const { data } = await axios.get(`${baseUrl}/pub/movies`);
  //         let filteredMovies = data.filter((el) => el.id !== idDetail && el.Genre.name == genreName);
  //         console.log(idDetail, "<<<<<<<<<<");
  //         setMovies(filteredMovies);
  //       } catch (err) {
  //         Alert.alert("Error", `${err.response.data.message}`);
  //       }
  //     };
  //     fetchData();
  //   }, [])
  // );

  if (loading) {
    return (
      <View style={styles.moreLikeThis}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.moreLikeThis}>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <View style={styles.moreLikeThis}>
      <FlatList
        style={{ flex: 1 }}
        data={dataToDisplay}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  moreLikeThis: {
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
    height: 155,
  },
});
