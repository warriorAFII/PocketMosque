import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import Cards from "../../components/cards";
import CardsDays from "../../components/cardsDays";
import Header from "../../components/Header";
import { DataContext } from "../../context/DataContext";
// @ts-ignore
import { Pages } from "react-native-pages";
import UpdateMessage from "../../components/bottomSheets/UpdateMessage";
import { isEmpty } from "lodash";
import * as Notifications from "expo-notifications";
import moment from "moment";

export default function Home() {
  const { data, times, twelveHourFormat } = useContext(DataContext);
  const [splashScreenHiddenForHome, setSplashScreenHiddenForHome] =
    useState(false);

  useEffect(() => {
    (async () => {
      // setTimeout(async () => await viewNotifications(), 2000);
      await setNotifications();
    })();
  }, [data, times]);

  const setNotifications = useCallback(async () => {
    try {
      if (!isEmpty(data) && !isEmpty(times)) {
        await Notifications.cancelAllScheduledNotificationsAsync();
        if (!isEmpty(data?.prayers) && data?.prayers.all.length > 0) {
          data.prayers.all.slice(0, 7).map(async (prayer, ind, { length }) => {
            await getPrayerTimings(prayer, times, ind === length - 1);
          });
        }
      }
    } catch (error) {
      console.log("rejections  error", error);
    }
  }, [data, times]);

  function formatPrayerTime(date, prayer) {
    return moment(`${date} ${prayer}`, "DD MMM YYYY HH:mm");
  }

  // async function viewNotifications() {
  //   const test = await Notifications.getAllScheduledNotificationsAsync();
  //   console.log(test);
  // }

  async function getPrayerTimings(prayer, times) {
    const PRAYERNAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    Object.keys(prayer.timings).map((prayerName) => {
      if (PRAYERNAMES.includes(prayerName)) {
        let namazTime = formatPrayerTime(
          prayer.date.readable,
          prayer.timings[prayerName]
        );
        if (moment().isBefore(namazTime))
          return schedulePushNotification(namazTime, prayerName, times);
      }
    });
  }

  async function schedulePushNotification(seconds, prayerName, times) {
    if (times[prayerName]) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: `${prayerName} at ${seconds.format("HH:mm")} `,
          body: `🕒 ${prayerName} is now`,
        },

        // when: seconds.toDate(),
        trigger: {
          date: seconds.toDate(),
        },

        // time for notifications

        // ...(isLast ? { repeatType: "day" } : {}),
      });
    }
  }

  return (
    <>
      <Header city={data?.city} />
      <Pages>
        <View style={styles.container}>
          <Cards
            prayer={data?.prayers ?? {}}
            temp={data?.weather}
            twelveHourFormat={twelveHourFormat}
            setSplashScreenHiddenForHome={setSplashScreenHiddenForHome}
          />
        </View>

        <View style={styles.container}>
          <CardsDays
            prayer={data?.prayers ?? {}}
            temp={data?.weather}
            twelveHourFormat={twelveHourFormat}
          />
        </View>
      </Pages>

      <View style={styles.separator} />
      <UpdateMessage splashScreenHiddenForHome={splashScreenHiddenForHome} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  separator: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "80%",
    marginTop: 10,
    alignSelf: "center",
  },
});
