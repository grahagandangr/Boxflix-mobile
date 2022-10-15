import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  Button,
  Dimensions,
} from "react-native";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function Landing() {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const itemLanding = [
    {
      id: 1,
      title: "Unlimited movies, TV shows & more",
      desc: "Watch anywhere. Cancel anytime",
      imgUri:
        "https://assets.nflxext.com/ffe/siteui/vlv3/0f07b807-7be1-457d-be88-eb9153d5d4e9/896b6ae7-1835-4a81-8433-40e1ed006c6e/ID-en-20220815-popsignuptwoweeks-perspective_alpha_website_large.jpg",
    },
    {
      id: 2,
      title: "Download and watch offline",
      desc: "Always have something to watch offline",
      imgUri:
        "https://assets.nflxext.com/ffe/siteui/vlv3/ac824598-245b-4828-b14f-5cff9074f4d0/56e5c097-e1b8-4dca-ae8d-908ab2ad0854/ID-en-20220822-popsignuptwoweeks-perspective_alpha_website_small.jpg",
    },
    {
      id: 3,
      title: "No pesky contract",
      desc: "Join today, cancel anytime",
      imgUri:
        "https://assets.nflxext.com/ffe/siteui/vlv3/0f07b807-7be1-457d-be88-eb9153d5d4e9/896b6ae7-1835-4a81-8433-40e1ed006c6e/ID-en-20220815-popsignuptwoweeks-perspective_alpha_website_large.jpg",
    },
    {
      id: 4,
      title: "Watch everywhere",
      desc: "Stream on your phone, tablet, laptop, TV and more",
      imgUri:
        "https://assets.nflxext.com/ffe/siteui/vlv3/ac824598-245b-4828-b14f-5cff9074f4d0/56e5c097-e1b8-4dca-ae8d-908ab2ad0854/ID-en-20220822-popsignuptwoweeks-perspective_alpha_website_small.jpg",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <>
        <ImageBackground
          style={{
            height: 525,
            width: windowWidth,
            shadowColor: "black",
            shadowRadius: 15,
            shadowOpacity: 0.5,
          }}
          source={{
            uri: item.imgUri,
          }}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,1)", "transparent"]}
            style={{ height: 200 }}
          />
          <LinearGradient
            // Background Linear Gradient
            colors={["transparent", "rgba(0,0,0,1)"]}
            style={{ height: 200, bottom: -125 }}
          >
            <View>
              <Text style={{ color: "white", textAlign: "center", fontSize: 36, fontWeight: "bold", marginBottom: 22 }}>
                {item.title}
              </Text>
              <Text style={{ color: "white", textAlign: "center" }}> {item.desc}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={itemLanding}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      {/* <ImageBackground
        style={styles.imageBackground}
        source={{
          uri: "https://assets.nflxext.com/ffe/siteui/vlv3/0f07b807-7be1-457d-be88-eb9153d5d4e9/896b6ae7-1835-4a81-8433-40e1ed006c6e/ID-en-20220815-popsignuptwoweeks-perspective_alpha_website_large.jpg",
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(0,0,0,1)", "transparent"]}
          style={{ height: 200 }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,1)"]}
          style={{ height: 200, bottom: -125 }}
        >
          <View>
            <Text style={{ color: "white", textAlign: "center", fontSize: 36, fontWeight: "bold", marginBottom: 22 }}>
              Unlimited movies, TV shows & more
            </Text>
            <Text style={{ color: "white", textAlign: "center" }}>Watch anywhere. Cancel anytime</Text>
          </View>
        </LinearGradient>
      </ImageBackground> */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 15, marginTop: 10, marginBottom: 60 }}>
        <Button
          title="Get Started"
          color={"red"}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "space-between",
  },
  imageBackground: {
    height: 525,
    width: 400,
    shadowColor: "black",
    shadowRadius: 15,
    shadowOpacity: 0.5,
  },
});
