import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabNavigator from "../src/navigations/BottomTabNavigator";
import { StatusBar, ImageBackground, StyleSheet } from "react-native";
import { getLocationName, getPrayer, getWeather } from "./services";
import { DataContext } from "./context/DataContext";
import * as Location from "expo-location";
import OnBoardingStack from "./navigations/OnBoardingStack";
import isSmallDevice from "./utils/isSmallDevice";

export default function PocketMosque() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const { setData } = useContext(DataContext);

  const backgroundImage = isSmallDevice(820)
    ? require("../src/assets/appBackground.png")
    : require("../src/assets/tabletAppBackground.png");

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem("alreadyLaunched");
      if (value === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          const savedCity = await AsyncStorage.getItem("selectedCity");
          if (savedCity) {
            const { coordinates } = JSON.parse(savedCity);
            await getData(coordinates.latitude, coordinates.longitude);
          }
          return;
        }

        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });

        await getData(latitude, longitude);
      }
    })();
  }, [isFirstLaunch]);

  const getData = async (latitude: number, longitude: number) => {
    let method = (await AsyncStorage.getItem("userChosenMethod")) ?? null;
    let city;
    let weather;

    if (
      //Uk Method Hotfix TODO: fix it
      latitude >= 50.0001 &&
      latitude <= 60.0 &&
      longitude >= -8.0 &&
      longitude <= 2.0 &&
      !method
    ) {
      // If the user is in the UK, set userChosenMethod to 15
      method = 15;
    }

    const prayers = await getPrayer(latitude, longitude, method);

    if (process.env.EXPO_PUBLIC_LOCATION_API_KEY) {
      city = await getLocationName(latitude, longitude);
    } else {
      city = "London";
    }

    if (process.env.EXPO_PUBLIC_WEATHER_API_KEY) {
      weather = await getWeather(latitude, longitude);
    } else {
      weather = "24";
    }

    try {
      setData({
        latitude,
        longitude,
        weather,
        prayers,
        city,
      });
    } catch (error) {
      console.log(error, "error setting data pocketmosque.tsx");
    }
  };

  const onDone = () => {
    setIsFirstLaunch(false);
  };
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#346894" barStyle="light-content" />
      <ImageBackground style={styles.background} source={backgroundImage} />
      {isFirstLaunch ? (
        <OnBoardingStack onDone={onDone} />
      ) : (
        <BottomTabNavigator />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    height: "100%",
    width: "100%",
    zIndex: 0,
    position: "absolute",
  },
});
