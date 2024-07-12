import { Text, TouchableOpacity, View, Alert } from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import React, { useCallback, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DataContext } from "../../context/DataContext";
import * as Notifications from "expo-notifications";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function CardsSmall(props) {
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
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.prayertitle}>{props.salah}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 0.4,
        }}
      >
        <View
          style={{
            justifyContent: "center",

            flexDirection: "row",
          }}
        >
          <Text style={styles.prayertime}>{props.time}</Text>

          <View style={styles.seperator} />
        </View>
        <TouchableOpacity onPress={HandleBellClick}>
          <MaterialCommunityIcons
            name={times[props.salah] ? "bell-outline" : "bell-off-outline"}
            size={hp(3)}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CardsSmall;
