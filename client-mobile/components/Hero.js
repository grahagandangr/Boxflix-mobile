import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialIcons, Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { GET_GENRES } from "../queries/genre";

const baseUrl = `https://boxflix.herokuapp.com`;

export default function Hero() {
  // const [genres, setGenres] = useState([]);
  const { loading, error, data } = useQuery(GET_GENRES);
  let dataToDisplay;
  if (!loading) {
    dataToDisplay = [{ id: 100, name: "All" }, ...data?.getGenres];
  }

  const navigation = useNavigation();
  const route = useRoute();
  let genreHome;
  if (route.params) {
    genreHome = route.params.genreHome;
  }

  const windowWidth = Dimensions.get("window").width;

  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingHorizontal: 10, paddingBottom: 15 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HomeScreen", {
              genreHome: item.name,
            });
          }}
        >
          {item.name == genreHome ? (
            <Text style={{ color: "red" }}>{item.name}</Text>
          ) : (
            <Text style={{ color: "white" }}>{item.name}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(`${baseUrl}/pub/genres`);
  //       data.splice(0, 0, { id: 100, name: "All" });
  //       setGenres(data);
  //     } catch (err) {
  //       Alert.alert("Error", `${err.response.data.message}`);
  //     }
  //   };
  //   fetchData();
  // }, []);
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
    <>
      <View style={styles.hero}>
        <ImageBackground
          style={{
            flex: 1,
            width: windowWidth,
            height: 525,
            shadowColor: "black",
          }}
          source={{ uri: "https://www.themoviedb.org/t/p/original/Ao9NbKPlfpmWp87x9lAZZCr1ey5.jpg" }}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            style={{ height: 200 }}
          />
          <LinearGradient
            // Background Linear Gradient
            colors={["transparent", "rgba(0,0,0,1)"]}
            style={{ height: 200, bottom: -125, width: "100%" }}
          >
            <View
              style={{
                width: "95%",
                marginTop: 110,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", marginBottom: 20, fontSize: 30, textAlign: "center", fontWeight: "bold" }}>
                Doctor Strange in the Multiverse of Madness
              </Text>
              <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("Sorry", `Feature not available yet`);
                  }}
                  style={{ width: 100 }}
                >
                  <Feather style={{ textAlign: "center" }} name="check" size={24} color="#fff" />
                  <Text style={{ color: "white", textAlign: "center" }}>My List</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: 100 }}
                  onPress={() => {
                    navigation.navigate("Detail", {
                      id: 8,
                      title: "Doctor Strange in the Multiverse of Madness",
                      genreName: "Fantasy",
                    });
                  }}
                >
                  <Ionicons style={{ textAlign: "center" }} name="ios-play" size={24} color="#fff" />
                  <Text style={{ color: "white", textAlign: "center" }}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: 100 }}
                  onPress={() => {
                    navigation.navigate("Detail", {
                      id: 8,
                      title: "Doctor Strange in the Multiverse of Madness",
                      genreName: "Fantasy",
                    });
                  }}
                >
                  <Feather style={{ textAlign: "center" }} name="info" size={24} color="#fff" />
                  <Text style={{ color: "white", textAlign: "center" }}>Info</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <FlatList data={dataToDisplay} renderItem={renderItem} keyExtractor={(item) => item.id} horizontal />
      {genreHome ? (
        <Text style={{ color: "white", paddingHorizontal: 5, marginBottom: 5, fontWeight: "bold" }}>
          {genreHome} Movies
        </Text>
      ) : (
        <Text style={{ color: "white", paddingHorizontal: 5, marginBottom: 5, fontWeight: "bold" }}> All Movies</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 4,
    marginBottom: 75,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: 525,
    shadowColor: "black",
    shadowRadius: 15,
    shadowOpacity: 0.5,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
