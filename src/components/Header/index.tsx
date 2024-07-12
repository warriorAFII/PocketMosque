import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import moment from "moment-hijri";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { vw, vh } from "../../utils/viewport-units";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  city: string | unknown;
}

function SafeAreaTop({ children }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[{ paddingTop: insets.top }, styles.container]}>
      {children}
    </View>
  );
}

const Header: React.FC<HeaderProps> = ({ city }) => {
  const [date] = useState<string>(moment().format("D MMMM YYYY"));
  const [dayOfWeek] = useState<string>(moment().format("dddd"));
  const [hijriDate, setHijriDate] = useState<string>("");

  useEffect(() => {
    setHijriDate(moment().format("iD iMMMM iYYYY"));
  }, []);

  moment.locale("en");
  const headerDate = `${dayOfWeek} ${date}\n${hijriDate} `;

  return (
    <SafeAreaTop>
      <Text style={[styles.text, { fontSize: 3 * vw }]}>{headerDate}</Text>

      <View style={styles.separatorMain} />
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <MaterialCommunityIcons name="map-marker" size={30} color="white" />
        <Text
          style={styles.textLocation}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {city}
        </Text>
      </View>
    </SafeAreaTop>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 25,
    marginBottom: 10,
    justifyContent: "center",
  },
  textLocation: {
    color: "white",
    marginLeft: 10,
    width: 100,
    fontSize: 5 * vw,
    fontFamily: "Righteous_400Regular",
  },
  text: {
    color: "#FFF",

    fontFamily: "Righteous_400Regular",
  },

  separatorMain: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginTop: 5,
    width: 30,
    alignSelf: "center",
    transform: [{ rotate: "90deg" }],
  },
});

export default Header;
