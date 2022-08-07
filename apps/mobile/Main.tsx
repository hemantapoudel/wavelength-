import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import Register from "./screens/Register";
import { Text } from "react-native";
import Login from "./screens/Login";
import { useAuth } from "store/useAuth";
import { useEffect } from "react";
import { Center } from "native-base";

const Tab = createBottomTabNavigator();

export default function Main() {
  const { user, isLoading } = useAuth((s) => s);

  if (user)
    return (
      <>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "ios-home" : "ios-home";
                } else if (route.name === "Profile") {
                  iconName = focused ? "person-circle" : "person-circle";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "purple",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </NavigationContainer>
      </>
    );

  if (isLoading)
    return (
      <Center h={"full"}>
        <Text>Loading</Text>
      </Center>
    );
  return <Login />;
}
