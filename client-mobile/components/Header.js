import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from "react-native";
import { AntDesign, MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
        {route.name !== "HomeScreen" && route.name !== "Landing" ? (
          <AntDesign name="arrowleft" size={24} color="white" />
        ) : (
          <Image style={{ width: 24, height: 24, flex: 1 }} source={require("../assets/BOXFLIX_LOGO_FULL.png")} />
        )}
      </TouchableOpacity>
      {route.name !== "Landing" ? (
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Sorry", `Feature not available yet`);
            }}
          >
            <MaterialIcons name="search" size={24} color="white" style={{ marginRight: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Sorry", `Feature not available yet`);
            }}
          >
            <Ionicons name="person-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        ""
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 15,
  },
});
