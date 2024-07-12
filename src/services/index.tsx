import axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getWeather = async (
  latitude: number,
  longitude: number
): Promise<number> => {
  try {
    const {
      data: {
        main: { temp },
      },
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`
    );

    return temp;
  } catch (e) {
    console.log(e, "temp error");
    return 15;
  }
};

export const getPrayer = async (
  latitude: number,
  longitude: number,
  userChosenMethod: number | null
) => {
  try {
    const date = moment();
    const day = date.get("date");
    const month = date.get("month") + 1;
    const year = date.get("year");
    const thisMonth = await axios.get(
      `https://api.aladhan.com/v1/calendar?latitude=${latitude}6&longitude=${longitude}${
        userChosenMethod ? "&method=" + userChosenMethod : ""
      }&month=${month}&year=${year}`
    );

    let currentMonth = thisMonth.data.data.filter((obj) => {
      return (
        moment(obj.date.readable, "DD-MMM-YYYY")
          .startOf("day")
          .toDate()
          .getTime() >= date.startOf("day").toDate().getTime()
      );
    });
    if (day >= 25) {
      const nextMonthDate = moment().add(1, "month");
      const nextMonth = await axios.get(
        `https://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}${
          userChosenMethod ? "&method=" + userChosenMethod : ""
        }&month=${nextMonthDate.get("month") + 1}&year=${nextMonthDate.get(
          "year"
        )}`
      );
      currentMonth = [...currentMonth, ...nextMonth.data.data];
    }

    currentMonth = currentMonth.map((d) => {
      let timings = d.timings;
      Object.keys(timings).map((key) => {
        timings[key] = moment(timings[key], "HH:mm").utc(true).format("HH:mm");
      });
      return { ...d, timings };
    });
    const DEFAULT_METHOD = thisMonth.data.data[0].meta.method.id;

    if (!userChosenMethod) {
      await AsyncStorage.setItem(
        "defaultMethod",
        JSON.stringify(DEFAULT_METHOD)
      );
    }

    await AsyncStorage.setItem("prayerTimes", JSON.stringify(currentMonth));

    let today = currentMonth[0];

    return {
      data: today,
      all: currentMonth,
    };
  } catch (e) {
    return console.log(e, "prayer error");
  }
};

export const getLocationName = async (latitude: number, longitude: number) => {
  try {
    const location = await axios.get(
      `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apikey=${process.env.EXPO_PUBLIC_LOCATION_API_KEY}`
    );
    await AsyncStorage.setItem("city", location.data.items[0].address.city);
    return (
      location.data.items[0].address.city ??
      location.data.items[0].address.countryName
    );
  } catch (e) {
    console.log(e, "locationName error");
    return e;
  }
};
