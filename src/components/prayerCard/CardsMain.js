import { Alert, Button, Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { duas } from "../cards/duas";
import React, { useContext, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DataContext } from "../../context/DataContext";
import isSmallDevice from "../../utils/isSmallDevice";
import * as Notifications from "expo-notifications";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const randomDua = Math.floor(Math.random() * 2);

function CardsMain({ salah, time, countdown, temp, afterIsha }) {
  const { times, asyncSetTime } = useContext(DataContext);

  const HandleBellClick = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync(); // Check if notification permissions are granted
    if (existingStatus !== "granted") {
      Alert.alert(
        "Turn on Notifications in settings to start receiving notifications"
      );
      return;
    }
    asyncSetTime({ [salah]: !times[salah] });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          zIndex: 2,
          position: "absolute",
          alignSelf: "flex-end",
          justifyContent: "center",
          paddingRight: 15,
          paddingTop: 10,
        }}
      >
        <TouchableOpacity onPress={HandleBellClick}>
          <MaterialCommunityIcons
            name={times[salah] ? "bell-outline" : "bell-off-outline"}
            size={hp(3)}
            color="white"
            style={styles.bellIconMain}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.prayertitlemain}>{salah}</Text>
      {afterIsha ? <Text style={styles.tomorrowTitle}>(Tomorrow)</Text> : null}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.prayertimemain}>{time}</Text>
          <Text style={styles.prayertimer}>{countdown}</Text>
        </View>
        <View style={styles.seperatormain} />
        <Text style={styles.temp}>{Math.round(temp)}°C</Text>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 5,
          paddingVertical: 10,

          justifyContent: "flex-end",
        }}
      >
        <Text style={styles.dua}>{duas.dua[randomDua]}</Text>
        {!isSmallDevice(700) && (
          <Text style={styles.duameaning}>{duas.duaMeaning[randomDua]}</Text>
        )}
      </View>
    </View>
  );
}

export default CardsMain;
