import {
  Linking,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles";
import Header from "../../components/Header";
import { Entypo } from "@expo/vector-icons";
import { DataContext } from "../../context/DataContext";
import BottomSheet from "react-native-gesture-bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPrayer } from "../../services/";
import * as Notifications from "expo-notifications";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SplashScreen from "expo-splash-screen";
export default function Settings() {
  const {
    data,
    times,
    asyncSetTime,
    setData,
    asyncTwelveHourFormat,
    twelveHourFormat,
  } = useContext(DataContext);
  const [isEnabled, setIsEnabled] = useState();
  const [buttonText, setButtonText] = useState();
  const [method, setMethod] = useState(15);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const notificationToggle = Object.keys(times)
    .map((p) => times[p])
    .includes(true);

  const twelveHourFormatToggle = twelveHourFormat === true;
  const bottomSheet = useRef();
  const toggleSwitch = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync(); // Check if notification permissions are granted
    if (existingStatus !== "granted") {
      Linking.openSettings();
      return;
    }
    asyncSetTime({
      Fajr: !notificationToggle,
      Dhuhr: !notificationToggle,
      Zuhr: !notificationToggle,
      Asr: !notificationToggle,
      Maghrib: !notificationToggle,
      Isha: !notificationToggle,
    });
  };
  const toggleTwelveHourFormat = async () => {
    asyncTwelveHourFormat(!twelveHourFormatToggle);
  };

  const storeMethod = async (number: number) => {
    try {
      await AsyncStorage.setItem("userChosenMethod", JSON.stringify(number));
      const prayers = await getPrayer(data.latitude, data.longitude, number);
      setData({
        ...data,
        prayers,
      });
    } catch (e) {
      console.log(e, "settings page call");
    }
  };

  const getMethod = async () => {
    try {
      const USER_CHOSEN_METHOD = await AsyncStorage.getItem("userChosenMethod");
      const DEFAULT_METHOD = await AsyncStorage.getItem("defaultMethod");

      let methodToSet = 15; // Default value if nothing is found

      if (
        //Uk Method Hotfix TODO: fix it
        data.latitude >= 50.0001 &&
        data.latitude <= 60.0 &&
        data.longitude >= -8.0 &&
        data.longitude <= 2.0
      ) {
        // If the user is in the UK, set method to 15
        setMethod(15);
        return;
      }

      if (USER_CHOSEN_METHOD !== null) {
        methodToSet = parseInt(USER_CHOSEN_METHOD, 10); // Parse the value to an integer
      } else if (DEFAULT_METHOD) {
        methodToSet = parseInt(DEFAULT_METHOD, 10); // Parse the default value to an integer
      }

      setMethod(methodToSet);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getMethod();

      if (method === 15) {
        setButtonText("Moonsighting Committee");
        setSelectedIndex(15);
      } else if (method === 2) {
        setButtonText("ISNA");
        setSelectedIndex(2);
      } else if (method === 1) {
        setButtonText("Karachi");
        setSelectedIndex(1);
      } else if (method === 3) {
        setButtonText("Muslim World League");
        setSelectedIndex(3);
      } else if (method === 5) {
        setButtonText("Egypt");
        setSelectedIndex(5);
      } else if (method === 8) {
        setButtonText("Gulf Region");
        setSelectedIndex(8);
      } else if (method === 9) {
        setButtonText("Kuwait");
        setSelectedIndex(9);
      } else if (method === 4) {
        setButtonText("Makkah");
        setSelectedIndex(4);
      }
    })();
  }, [method]);

  const Content = () => {
    return (
      <View>
        <ScrollView style={{ marginBottom: 30 }}>
          <Text style={styles.sheetTitle}>Calculation Methods</Text>
          <Text style={styles.sheetSubtitle}>
            Methods identify various schools of thought about how to compute the
            prayer timings
          </Text>
          <TouchableOpacity
            style={
              selectedIndex === 15 ? styles.selectedButton : styles.sheetButton
            }
            onPress={() => {
              storeMethod(15);
              setButtonText("Moonsighting Committee");
              setSelectedIndex(15);
            }}
          >
            <Text style={styles.sheetButtonTitle}>Moonsighting Committee</Text>
            <Text style={styles.sheetButtonSubtitle}>Used in UK </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              buttonText === "ISNA" ? styles.selectedButton : styles.sheetButton
            }
            onPress={() => {
              storeMethod(2);
              setButtonText("ISNA");
              setSelectedIndex(2);
            }}
          >
            <Text style={styles.sheetButtonTitle}>
              Islamic Society of North America
            </Text>
            <Text style={styles.sheetButtonSubtitle}>
              {" "}
              Used in USA and Canada
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selectedIndex === 1 ? styles.selectedButton : styles.sheetButton
            }
            onPress={() => {
              storeMethod(1);
              setButtonText("Karachi");
              setSelectedIndex(1);
            }}
          >
            <Text style={styles.sheetButtonTitle}>
              Karachi, University of Islamic Sciences
            </Text>
            <Text style={styles.sheetButtonSubtitle}>
              Used in Pakistan, Bangladesh, Afghanistan, India
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selectedIndex === 3 ? styles.selectedButton : styles.sheetButton
            }
            onPress={() => {
              storeMethod(3);
              setButtonText("Muslim World League");
              setSelectedIndex(3);
            }}
          >
            <Text style={styles.sheetButtonTitle}>Muslim World League</Text>
            <Text style={styles.sheetButtonSubtitle}>
              {" "}
              Used in Europe, Far East, parts of US
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selectedIndex === 5 ? styles.selectedButton : styles.sheetButton
            }
            onPress={() => {
              storeMethod(5);
              setButtonText("Egypt");
              setSelectedIndex(5);
            }}
          >
            <Text style={styles.sheetButtonTitle}>Egypt</Text>
            <Text style={styles.sheetButtonSubtitle}>
              Used in Africa, Syria, Lebanon, Malaysia
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selectedIndex === 8 ? styles.selectedButton : styles.sheetButton
            }
            onPress={() => {
              storeMethod(8);
              setButtonText("Gulf Region");
              setSelectedIndex(8);
            }}
          >
            <Text style={styles.sheetButtonTitle}>Gulf Region</Text>
            <Text style={styles.sheetButtonSubtitle}>
              Used Bahrain, Kuwait, Oman, Qatar, and the United Arab Emirates
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selectedIndex === 9 ? styles.selectedButton : styles.sheetButton
            }
            onPress={() => {
              storeMethod(9);
              setButtonText("Kuwait");
              setSelectedIndex(9);
            }}
          >
            <Text style={styles.sheetButtonTitle}>Kuwait</Text>
            <Text style={styles.sheetButtonSubtitle}> Used in Kuwait</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selectedIndex === 4 ? styles.selectedButton : styles.sheetButton
            }
            onPress={() => {
              storeMethod(4);
              setButtonText("Makkah");
              setSelectedIndex(4);
            }}
          >
            <Text style={styles.sheetButtonTitle}>
              Umm al-Qura University, Makkah
            </Text>
            <Text style={styles.sheetButtonSubtitle}>
              Used in the Arabian Peninsula
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Header city={data.city} />
      <ScrollView
        contentInsetAdjustmentBehavior={"automatic"}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.container1}>
          <View style={styles.button}>
            <Entypo style={styles.icon} name={"notification"} size={hp(3.5)} />
            <Text style={styles.text}>Notifications</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#fff", true: "#048a28" }}
              thumbColor={notificationToggle ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onChange={toggleSwitch}
              value={notificationToggle}
            />
          </View>
          <View style={styles.button}>
            <Entypo style={styles.icon} name={"calculator"} size={hp(3.5)} />
            <Text style={styles.text}>{`     Calculation 
        Method`}</Text>
            <TouchableOpacity
              style={styles.calculationButton}
              onPress={() => bottomSheet.current.show()}
            >
              <Text style={styles.buttonTitle}>{buttonText}</Text>
            </TouchableOpacity>
            <BottomSheet
              sheetBackgroundColor={"#346895"}
              hasDraggableIcon
              ref={bottomSheet}
              height={500}
            >
              <Content />
            </BottomSheet>
          </View>
          <View style={styles.button}>
            <Entypo style={styles.icon} name={"clock"} size={hp(3.5)} />
            <Text style={styles.text}>12-Hour Format</Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#fff", true: "#048a28" }}
              thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onChange={toggleTwelveHourFormat}
              value={twelveHourFormatToggle}
            />
          </View>
        </View>

        <View style={styles.container2}>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Linking.openURL("https://pocketmosque.com/");
              }}
            >
              <Entypo
                style={styles.icon}
                name={"help-with-circle"}
                size={hp(3.5)}
              />
              <Text style={styles.text}>About Us</Text>
              <Entypo
                style={styles.icon2}
                name={"chevron-right"}
                size={hp(3.5)}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Linking.openURL("https://pocketmosque.com/Privacy");
              }}
            >
              <Entypo style={styles.icon} name={"lock"} size={hp(3.5)} />
              <Text style={styles.text}>Privacy</Text>
              <Entypo
                style={styles.icon2}
                name={"chevron-right"}
                size={hp(3.5)}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Linking.openURL("https://discord.gg/4pB3StHpP7");
              }}
            >
              <Entypo style={styles.icon} name={"inbox"} size={hp(3.5)} />
              <Text style={styles.text}>Contact Us</Text>
              <Entypo
                style={styles.icon2}
                name={"chevron-right"}
                size={hp(3.5)}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container3}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking.openURL("https://www.instagram.com/pocketmosque/");
            }}
          >
            <Entypo style={styles.icon} name={"instagram"} size={hp(3.5)} />
            <Text style={styles.text}>Instagram</Text>
            <Entypo
              style={styles.icon2}
              name={"chevron-right"}
              size={hp(3.5)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking.openURL("https://twitter.com/pocketmosque");
            }}
          >
            <Entypo style={styles.icon} name={"twitter"} size={hp(3.5)} />
            <Text style={styles.text}>Twitter</Text>
            <Entypo
              style={styles.icon2}
              name={"chevron-right"}
              size={hp(3.5)}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.separator} />
    </View>
  );
}
