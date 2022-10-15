import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { AntDesign, MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { ApolloProvider } from "@apollo/client";
import client from "./config";

import Home from "./screens/Home";
import Detail from "./screens/Detail";
import Landing from "./screens/Landing";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: "white",
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home-sharp" : "home-outline";
                return <Ionicons name={iconName} size={size} color={color} />;
              } else if (route.name === "Landing") {
                iconName = focused ? "view-dashboard" : "view-dashboard-outline";
                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
            tabBarActiveBackgroundColor: "#0d0d0d",
            tabBarInactiveBackgroundColor: "#0d0d0d",
            tabBarStyle: {
              borderTopWidth: 0,
            },
          })}
        >
          <Tab.Screen name="Landing" component={Landing} />
          <Tab.Screen name="Home" component={AppNavigator} />
        </Tab.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </ApolloProvider>
  );
}
