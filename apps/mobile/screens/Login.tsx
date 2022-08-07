import { StatusBar } from "expo-status-bar";
import { Button, Center, View, Text } from "native-base";
import { useAuth } from "store/useAuth";

export default function Login() {
  const setUser = useAuth((s) => s.setUser);
  return (
    <View px="4">
      <StatusBar style="auto" />
      <Center h="full">
        <Button w="full" onPress={() => setUser({ name: "Gaurav Pandey" })}>
          Login
        </Button>
      </Center>
    </View>
  );
}
