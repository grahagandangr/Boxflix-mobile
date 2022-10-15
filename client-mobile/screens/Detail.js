import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import MovieList from "../components/MovieList";
import MoreLikeThis from "../components/MoreLikeThis";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { GET_MOVIES_BY_ID } from "../queries/movie";

const baseUrl = `https://boxflix.herokuapp.com`;

export default function Detail({ route }) {
  // const [movie, setMovie] = useState({});
  // const [loadingMovie, setLoadingMovie] = useState(true);
  const { id, title, genreName } = route.params;
  const { loading, error, data } = useQuery(GET_MOVIES_BY_ID, {
    variables: {
      movieId: id,
    },
  });
  let videoId = data?.getMovieById?.trailerUrl.split("/")[4];

  let allCastName = data?.getMovieById?.Casts.map((el) => el.name).join(", ");

  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchDataById = async () => {
  //       try {
  //         const { data } = await axios.get(`${baseUrl}/pub/movies/${id}`);
  //         let videoId = data.trailerUrl.split("/")[4];
  //         let allCastName = data.Casts.map((el) => el.name).join(", ");
  //         let genreName = data.Genre.name;
  //         setMovie({ ...data, videoId, allCastName, genreName });
  //       } catch (err) {
  //         Alert.alert("Error", `${err.response.data.message}`);
  //       } finally {
  //         setLoadingMovie(false);
  //       }
  //     };
  //     fetchDataById();
  //   }, [id])
  // );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "black", width: "100%" }}>
        <Header />
        <YoutubePlayer webViewStyle={{ marginTop: 10 }} height={250} videoId={videoId} />
        <View style={styles.text}>
          <Text style={{ color: "white", fontSize: 20, paddingBottom: 3, paddingHorizontal: 3, fontWeight: "bold" }}>
            {data?.getMovieById?.title}
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "white", padding: 3, fontWeight: "bold" }}>
              {data?.getMovieById?.Genre?.name} ⭐ {data?.getMovieById?.rating}/10
            </Text>
            <Text style={{ color: "grey", padding: 3 }}>Posted by {data?.getMovieById?.User?.username}</Text>
          </View>

          <Text style={{ color: "white", textAlign: "justify", padding: 3 }}>{data?.getMovieById?.synopsis}</Text>
          <Text style={{ color: "grey", paddingTop: 3, paddingHorizontal: 3 }}>Starring: {allCastName}</Text>
        </View>
        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", paddingHorizontal: 8 }}>
          More {genreName} Movies
        </Text>
        <MoreLikeThis idDetail={id} genreName={genreName} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
