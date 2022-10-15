import { View, Text, Button, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MovieList from "../components/MovieList";
import { AntDesign, MaterialIcons, Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function Home() {
  const route = useRoute();
  let genreHome;
  if (route.params) {
    genreHome = route.params.genreHome;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ flex: 1, backgroundColor: "black", width: "100%" }}>

        <MovieList genreHome={genreHome} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  hero: {
    flex: 4,
  },
  menu: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 30,
    marginBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: 500,
    shadowColor: "black",
    shadowRadius: 10,
  },
});
