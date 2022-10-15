import { StatusBar } from "expo-status-bar";
import { View, Text, Button, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MovieCard({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Detail", {
          id: item.id,
          title: item.title,
          genreName: item.Genre.name,
        });
      }}
    >
      <View style={styles.movieCard}>
        <Image
          style={styles.poster}
          source={{
            uri: item.posterImgUrl,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
