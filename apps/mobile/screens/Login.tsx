import { StatusBar } from "expo-status-bar";
import {
  Button,
  useDisclose,
  Center,
  Heading,
  Box,
  VStack,
  FormControl,
  Input,
  Link,
  HStack,
  Text,
} from "native-base";
import { useAuth } from "store/useAuth";
import { OnBoard } from "../components/auth/Onboard";

export default function Login() {
  const setUser = useAuth((s) => s.setUser);
  const showOnboard = useAuth((s) => s.showOnboard);
  const setOnboardFalse = useAuth((s) => s.setOnboardFalse);

  if (showOnboard)
    return (
      <>
        <OnBoard
          onSkip={() => {
            setOnboardFalse();
          }}
        />
      </>
    );
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => setUser({ name: "Gaurav Pandey" })}
          >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              href="#"
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
