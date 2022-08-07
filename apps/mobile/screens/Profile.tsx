import { StatusBar } from "expo-status-bar";
import { Button, Center, View, Text } from "native-base";
import { useAuth } from "store/useAuth";

export default function Login() {
  const logOut = useAuth((s) => s.logOut);
  return (
    <View px="4">
      <Text>Register</Text>
      <StatusBar style="auto" />
      <Center h="full">
        <Button w="full" onPress={() => logOut()}>
          Logout
        </Button>
      </Center>
    </View>
  );
}
