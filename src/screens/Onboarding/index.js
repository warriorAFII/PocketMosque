import Onboarding from "react-native-onboarding-swiper";
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";

import styles from "../Onboarding/styles";
import LottieView from "lottie-react-native";
import { getData } from "../../PocketMosque";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome } from "@expo/vector-icons";
import { DataContext } from "../../context/DataContext";
import DropDownPicker from "react-native-dropdown-picker";
// TODO: Refine no location logic
const cities = {
  "New York": { latitude: 40.7128, longitude: -74.006 },
  London: { latitude: 51.5074, longitude: -0.1278 },
  Tokyo: { latitude: 35.6895, longitude: 139.6917 },
  // Add more cities as needed
};

const OnboardingScreen = ({ route }) => {
  const [open, setOpen] = useState(false);
  const [chosenCity, setChosenCity] = useState(null);
  const [items, setItems] = useState([
    { label: "New York", value: 0 },
    { label: "London", value: 1 },
    { label: "Tokyo", value: 2 },
  ]);
  const { asyncSetTime } = useContext(DataContext);
  const [notificationsPermissions, setNotificationsPermissions] = useState({
    clicked: false,
    enabled: false,
  });
  const [locationPermissions, setLocationPermissions] = useState({
    clicked: false,
    enabled: false,
  });
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.log(e, "onboarding error");
      }
    })();
  }, []);

  useEffect(() => {
    if (chosenCity !== null) {
      const selectedCityName = items.find(
        (item) => item.value === chosenCity
      ).label;
      const cityCoordinates = cities[selectedCityName];

      // Save selected city and its coordinates to AsyncStorage
      (async () => {
        try {
          const locationData = {
            city: selectedCityName,
            coordinates: cityCoordinates,
          };

          await AsyncStorage.setItem(
            "selectedCity",
            JSON.stringify(locationData)
          );
        } catch (e) {
          console.log(e, "async storage error");
        }
      })();
    }
  }, [chosenCity]);

  const getLocationPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setLocationPermissions({ clicked: true, enabled: false });
    }

    if (status === "granted") {
      setLocationPermissions({ clicked: true, enabled: true });

      if (status !== "granted" && locationPermissions.clicked) {
        Linking.openSettings();
      }
      await AsyncStorage.setItem("onBoardingCompleted", "true");
    }
  };

  const getNotificationsPermissions = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    await AsyncStorage.setItem("onBoardingCompleted", "true");

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      setNotificationsPermissions({ clicked: true, enabled: false });
      asyncSetTime({
        Fajr: false,
        Dhuhr: false,
        Zuhr: false,
        Asr: false,
        Maghrib: false,
        Isha: false,
      });
      return;
    }

    setNotificationsPermissions({ clicked: true, enabled: true });

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "6e7caf84-1584-4bf0-8649-2eecaca1c41a",
      })
    ).data;
  };

  const Pagination = ({ selected }) => {
    let backgroundColor = selected ? "#177bac" : "rgba(0, 0, 0, 0.3)";

    return (
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 10,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };
  const Done = ({ ...props }) => (
    <TouchableOpacity
      {...props}
      style={{
        backgroundColor: "#177bac",
        borderRadius: 40,
        marginRight: 20,
      }}
    >
      <MaterialCommunityIcons name="check" size={30} color="#fff6e3" />
    </TouchableOpacity>
  );

  return (
    <Onboarding
      showNext={false}
      bottomBarHighlight={false}
      bottomBarColor={"transparent"}
      DotComponent={Pagination}
      DoneButtonComponent={Done}
      showSkip={false}
      showDone={locationPermissions.enabled || chosenCity !== null}
      bottomBarHeight={40}
      onDone={() => {
        const { onDone } = route.params;
        onDone();

        (async () => {
          await AsyncStorage.setItem("alreadyLaunched", "true");
        })();
      }}
      pages={[
        {
          backgroundColor: "#fff6e3",
          image: (
            <View>
              <LottieView
                autoPlay
                loop
                image
                style={[styles.imageMain]}
                source={require("../../assets/Images/imageMain.json")}
              />
            </View>
          ),
          title: (
            <Text style={styles.titleMain}>Welcome to Pocket Mosque!</Text>
          ),
          subtitle: (
            <Text style={styles.subtitleMain}>
              A ad free, multifunctional app, aiding you on your journey in this
              dunya.
            </Text>
          ),
        },

        {
          backgroundColor: "#fff6e3",
          image: (
            <LottieView
              autoPlay
              loop
              style={styles.imageNotif}
              source={require("../../assets/Images/imageNotif.json")}
            />
          ),
          title: (
            <View>
              <Text style={styles.titleNotif}>Never Miss a Prayer time!</Text>
            </View>
          ),
          subtitle: (
            <>
              <Text style={styles.subtitleNotif}>
                Turn notifications on and be alerted on prayer times as they
                happen!
              </Text>
              <TouchableOpacity
                onPress={() => getNotificationsPermissions()}
                style={{
                  backgroundColor: !notificationsPermissions.clicked
                    ? "#177bac"
                    : notificationsPermissions.enabled
                    ? "#4CAF50"
                    : "red",
                  height: 50,
                  width: 180,
                  alignItems: "center",
                  borderRadius: 16,
                  marginTop: 8,
                  justifyContent: "center",
                  bottom: 105,
                }}
                disabled={notificationsPermissions.clicked}
              >
                <Text
                  style={{
                    fontFamily: "Righteous_400Regular",
                    color: "white",
                  }}
                >
                  {notificationsPermissions.clicked ? (
                    notificationsPermissions.enabled ? (
                      <FontAwesome name="check" size={24} color="white" />
                    ) : (
                      <FontAwesome name="times" size={24} color="white" />
                    )
                  ) : (
                    "Enable Notifications"
                  )}
                </Text>
              </TouchableOpacity>
            </>
          ),
        },

        {
          backgroundColor: "#fff6e3", //"#743e5f",
          image: (
            <LottieView
              autoPlay
              loop
              style={styles.imagelocation}
              source={require("../../assets/Images/imageLocation.json")}
            />
          ),
          title: (
            <Text style={styles.titleLocation}>Works Wherever you are!</Text>
          ),

          subtitle: (
            <>
              <Text style={styles.subtitleLocation}>
                Allow location services for accurate prayer times and Qibla
                direction!
              </Text>

              <TouchableOpacity
                onPress={() => getLocationPermissions()}
                style={{
                  backgroundColor: locationPermissions.enabled
                    ? "#4CAF50"
                    : "#177bac",
                  height: 50,
                  width: 180,
                  alignItems: "center",
                  borderRadius: 16,
                  marginTop: 8,
                  justifyContent: "center",
                  bottom: 30,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Righteous_400Regular",
                    color: "white",
                  }}
                >
                  {locationPermissions.enabled ? (
                    <FontAwesome name="check" size={24} color="white" />
                  ) : (
                    "Enable Location"
                  )}
                </Text>
              </TouchableOpacity>

              {!locationPermissions.enabled && locationPermissions.clicked && (
                <>
                  <Text
                    style={{
                      fontFamily: "Righteous_400Regular",
                      marginTop: -20,
                    }}
                  >
                    Or
                  </Text>
                  <DropDownPicker
                    open={open}
                    value={chosenCity}
                    items={items}
                    setOpen={setOpen}
                    setValue={setChosenCity}
                    setItems={setItems}
                    style={{
                      width: 200,
                      alignSelf: "center",
                      borderColor: "white",
                      marginTop: 10,
                      marginBottom: height < 700 ? 100 : 0,
                    }}
                    containerStyle={{
                      width: 200,
                      borderColor: "white",
                    }}
                  />
                </>
              )}
              {/* <Text style={styles.subtitleLocationAsterisk}>
                * If your using the app from outside UK, be sure to change the
                prayer calculation method to your region in settings!
              </Text> */}
            </>
          ),
        },
      ]}
    />
  );
};

export default OnboardingScreen;
