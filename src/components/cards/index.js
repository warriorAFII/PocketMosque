import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import moment from "moment";
import { isEmpty } from "lodash";
import PrayerCard from "../prayerCard";
import { useFocusEffect } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
const Salahs = {
  Fajr: "Fajr",
  Zuhr: "Zuhr",
  Asr: "Asr",
  Maghrib: "Maghrib",
  Isha: "Isha",
};

export default function Cards({
  prayer,
  temp,
  twelveHourFormat,
  setSplashScreenHiddenForHome,
}) {
  const [currentSalah, setCurrentSalah] = useState(null);
  const [countdown, setCountDown] = useState("");
  const [hideSplash, setHideSplash] = useState(false);
  const [afterIsha, setAfterIsha] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let intervalCB = null;

      if (!isEmpty(prayer)) {
        // Run timer immediately and set interval for subsequent executions
        timer();
        intervalCB = setInterval(timer, 1000);
      }

      return () => {
        if (intervalCB) {
          clearInterval(intervalCB);
        }
      };
    }, [prayer])
  );

  useEffect(() => {
    if (hideSplash) {
      (async () => {
        await SplashScreen.hideAsync();
        setSplashScreenHiddenForHome(true);
      })();
    }
  }, [hideSplash]);

  const timer = () => {
    const fajrTimeString =
      moment().utc(true).toISOString().split("T")[0] +
      `T${prayer.data?.timings.Fajr}:00.000Z`;
    const fajrTime = moment(fajrTimeString);

    const dhuhrTimeString =
      moment().utc(true).toISOString().split("T")[0] +
      `T${prayer.data?.timings.Dhuhr}:00.000Z`;
    const dhuhrTime = moment(dhuhrTimeString);

    const asrTimeString =
      moment().utc(true).toISOString().split("T")[0] +
      `T${prayer.data?.timings.Asr}:00.000Z`;
    const asrTime = moment(asrTimeString);

    const maghribTimeString =
      moment().utc(true).toISOString().split("T")[0] +
      `T${prayer.data?.timings.Maghrib}:00.000Z`;
    const maghribTime = moment(maghribTimeString);

    const ishaTimeString =
      moment().utc(true).toISOString().split("T")[0] +
      `T${prayer.data?.timings.Isha}:00.000Z`;
    const ishaTime = moment(ishaTimeString);

    const now = moment().utc(true);

    if (fajrTime.isAfter(now)) {
      setCountDown(getRemainingTime(now, fajrTime));
      setCurrentSalah(Salahs.Fajr);
      setAfterIsha(false);
    } else if (dhuhrTime.isAfter(now)) {
      setCountDown(getRemainingTime(now, dhuhrTime));
      setCurrentSalah(Salahs.Zuhr);
    } else if (asrTime.isAfter(now)) {
      setCountDown(getRemainingTime(now, asrTime));
      setCurrentSalah(Salahs.Asr);
    } else if (maghribTime.isAfter(now)) {
      setCountDown(getRemainingTime(now, maghribTime));
      setCurrentSalah(Salahs.Maghrib);
    } else if (ishaTime.isAfter(now)) {
      setCountDown(getRemainingTime(now, ishaTime));
      setCurrentSalah(Salahs.Isha);
    } else {
      fajrTime.add(1, "days");
      setCountDown(getRemainingTime(now, fajrTime));
      setCurrentSalah(Salahs.Fajr);
      setAfterIsha(true);
    }
    setHideSplash(true);
  };

  const getRemainingTime = (now, nextPrayer) => {
    const duration = moment.duration(nextPrayer.diff(now));
    const hours = duration.get("hours");
    const minutes = duration.get("minutes");
    const seconds = duration.get("seconds");
    return `${hours > 9 ? hours : `0${hours}`}:${
      minutes > 9 ? minutes : `0${minutes}`
    }:${seconds > 9 ? seconds : `0${seconds}`}`;
  };

  return (
    <View style={styles.container}>
      <PrayerCard
        afterIsha={afterIsha}
        salah={Salahs.Fajr}
        currentSalah={currentSalah === Salahs.Fajr}
        temp={temp}
        countdown={countdown}
        time={
          afterIsha && prayer.all !== undefined
            ? prayer.all[1].timings.Fajr
            : prayer.data?.timings.Fajr
        }
      />
      <PrayerCard
        afterIsha={afterIsha}
        salah={Salahs.Zuhr}
        currentSalah={currentSalah === Salahs.Zuhr}
        temp={temp}
        countdown={countdown}
        time={
          twelveHourFormat
            ? moment(prayer.data?.timings.Dhuhr, ["HH.mm"]).format("h:mm")
            : prayer.data?.timings.Dhuhr
        }
      />
      <PrayerCard
        afterIsha={afterIsha}
        salah={Salahs.Asr}
        currentSalah={currentSalah === Salahs.Asr}
        temp={temp}
        countdown={countdown}
        time={
          twelveHourFormat
            ? moment(prayer.data?.timings.Asr, ["HH.mm"]).format("h:mm")
            : prayer.data?.timings.Asr
        }
      />
      <PrayerCard
        afterIsha={afterIsha}
        salah={Salahs.Maghrib}
        currentSalah={currentSalah === Salahs.Maghrib}
        temp={temp}
        countdown={countdown}
        time={
          twelveHourFormat
            ? moment(prayer.data?.timings.Maghrib, ["HH.mm"]).format("h:mm")
            : prayer.data?.timings.Maghrib
        }
      />
      <PrayerCard
        afterIsha={afterIsha}
        salah={Salahs.Isha}
        currentSalah={currentSalah === Salahs.Isha}
        temp={temp}
        countdown={countdown}
        time={
          twelveHourFormat
            ? moment(prayer.data?.timings.Isha, ["HH.mm"]).format("h:mm")
            : prayer.data?.timings.Isha
        }
      />
    </View>
  );
}
