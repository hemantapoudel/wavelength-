import { StatusBar } from "expo-status-bar";
import { View } from "native-base";
import { StyleSheet, Text } from "react-native";

export default function Home() {
  return (
    <View p="4">
      <Text>Home</Text>
      <StatusBar style="auto" />
    </View>
  );
}
