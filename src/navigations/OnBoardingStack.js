import OnboardingScreen from "../screens/Onboarding";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";

const AppStack = createStackNavigator();

const OnBoardingStack = ({ onDone }) => {
  return (
    <AppStack.Navigator
      style
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <AppStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        initialParams={{ onDone }}
      />
      <AppStack.Screen name="Tabs" component={BottomTabNavigator} />
    </AppStack.Navigator>
  );
};

export default OnBoardingStack;
