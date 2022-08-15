import { extendTheme, NativeBaseProvider } from "native-base";
import Main from "./Main";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const theme = extendTheme({
    components: {
      Button: {
        baseStyle: {
          rounded: "md",
        },
        defaultProps: {
          colorScheme: "blue",
        },
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar />

        <Main />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
