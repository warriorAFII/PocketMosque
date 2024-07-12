import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

import { isEmpty } from "lodash";
import PrayerCard from "../prayerCard";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment-hijri";
const Salahs = {
  Fajr: "Fajr",
  Zuhr: "Zuhr",
  Asr: "Asr",
  Maghrib: "Maghrib",
  Isha: "Isha",
};

export default function CardsDays({ prayer, temp, twelveHourFormat }) {
  const [activeDay, setActiveDay] = useState(1);
  const date =
    activeDay === 1
      ? "Tomorrow"
      : moment().add(activeDay, "days").format("DD MMM YYYY");
  const hijriDate = moment().add(activeDay, "days").format("iD iMMMM iYYYY");

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <TouchableOpacity
          style={{}}
          onPress={() => {
            setActiveDay(activeDay - 1);
          }}
          disabled={activeDay === 1}
        >
          <MaterialCommunityIcons
            style={styles.image}
            name="chevron-left"
            size={wp(15)}
            color={"white"}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.title}>{date}</Text>
          <Text style={styles.hijriTitle}>{hijriDate}</Text>
        </View>
        <TouchableOpacity
          style={{ zIndex: 0 }}
          onPress={() => {
            setActiveDay(activeDay + 1);
          }}
          disabled={
            prayer.all === undefined
              ? activeDay === 6
              : activeDay === prayer.all.length - 1
          }
        >
          <MaterialCommunityIcons
            style={styles.image}
            name="chevron-right"
            size={wp(15)}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <PrayerCard
        salah={Salahs.Fajr}
        temp={temp}
        time={
          prayer.all === undefined
            ? prayer.data?.timings.Fajr
            : prayer.all[activeDay].timings.Fajr
        }
      />
      <PrayerCard
        salah={Salahs.Zuhr}
        temp={temp}
        time={
          prayer.all === undefined
            ? prayer.data?.timings.Dhuhr
            : twelveHourFormat
            ? moment(prayer.all[activeDay].timings.Dhuhr, ["HH.mm"]).format(
                "h:mm"
              )
            : prayer.all[activeDay].timings.Dhuhr
        }
      />
      <PrayerCard
        salah={Salahs.Asr}
        temp={temp}
        time={
          prayer.all === undefined
            ? prayer.data?.timings.Asr
            : twelveHourFormat
            ? moment(prayer.all[activeDay].timings.Asr, ["HH.mm"]).format(
                "h:mm"
              )
            : prayer.all[activeDay].timings.Asr
        }
      />
      <PrayerCard
        salah={Salahs.Maghrib}
        temp={temp}
        time={
          prayer.all === undefined
            ? prayer.data?.timings.Maghrib
            : twelveHourFormat
            ? moment(prayer.all[activeDay].timings.Maghrib, ["HH.mm"]).format(
                "h:mm"
              )
            : prayer.all[activeDay].timings.Maghrib
        }
      />
      <PrayerCard
        salah={Salahs.Isha}
        temp={temp}
        time={
          prayer.all === undefined
            ? prayer.data?.timings.Isha
            : twelveHourFormat
            ? moment(prayer.all[activeDay].timings.Isha, ["HH.mm"]).format(
                "h:mm"
              )
            : prayer.all[activeDay].timings.Isha
        }
      />
    </View>
  );
}
