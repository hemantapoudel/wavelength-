import Onboarding from "react-native-onboarding-swiper";
import { Image } from "react-native";
import { useRef } from "react";
import { Button, Icon, Text } from "native-base";

export function OnBoard({ onSkip = () => {} }) {
  const onboardingRef = useRef<Onboarding>(null);

  const NextButton = () => (
    <Button
      variant={"ghost"}
      px="4"
      onPress={() => onboardingRef.current.goNext()}
      colorScheme="coolGray"
      _text={{
        fontWeight: "semibold",
      }}
    >
      Next
    </Button>
  );
  const SkipButton = () => (
    <Button
      variant={"ghost"}
      colorScheme="coolGray"
      px="4"
      onPress={onSkip}
      _text={{
        fontWeight: "semibold",
      }}
    >
      Skip
    </Button>
  );
  const FinishButton = () => (
    <Button
      variant={"ghost"}
      colorScheme="coolGray"
      px="4"
      onPress={onSkip}
      _text={{
        fontWeight: "semibold",
      }}
    >
      Finish
    </Button>
  );

  return (
    <>
      <Onboarding
        ref={onboardingRef}
        NextButtonComponent={NextButton}
        SkipButtonComponent={SkipButton}
        DoneButtonComponent={FinishButton}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={{ height: 200, width: 200 }}
                source={require("../../assets/reminder.png")}
              />
            ),
            title: "Dami Cha",
            subtitle: "Best of the best on the market",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={{ height: 200, width: 200 }}
                source={require("../../assets/reminder.png")}
              />
            ),
            title: "Ek Dam Babal",
            subtitle: "Best of the best on the market",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={{ height: 200, width: 200 }}
                source={require("../../assets/reminder.png")}
              />
            ),
            title: "Nepal Khanxa",
            subtitle: "Best of the best on the market",
          },
        ]}
      />
    </>
  );
}
