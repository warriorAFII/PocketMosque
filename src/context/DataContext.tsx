import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, createContext, useCallback } from "react";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

type DataContextProviderProps = {
  children: React.ReactNode;
};

type TimeObj = {
  Fajr?: boolean;
  Dhuhr?: boolean;
  Zuhr?: boolean;
  Asr?: boolean;
  Maghrib?: boolean;
  Isha?: boolean;
};

type DataContextType = {
  data: Record<string, unknown>;
  all: Record<string, unknown>;
  times: TimeObj;
  twelveHourFormat: any;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  asyncSetTime: (timeObj: TimeObj) => Promise<void>;
  asyncTwelveHourFormat: (value: boolean) => Promise<void>;
};

export const DataContext = createContext<DataContextType>({
  data: {},
  all: {},
  setData: () => {},
  times: {
    Fajr: true,
    Dhuhr: true,
    Zuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true,
  },
  twelveHourFormat: {},
  asyncSetTime: async () => {},
  asyncTwelveHourFormat: async () => {},
});

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState({});
  const [twelveHourFormat, setTwelveHourFormat] = useState<boolean>(false);
  const [all, setAll] = useState({});
  const [times, setTimes] = useState<TimeObj>({
    Fajr: true,
    Dhuhr: true,
    Zuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true,
  });

  const asyncSetTime = async (timeObj: TimeObj) => {
    let updated = { ...times, ...timeObj };
    if (timeObj.hasOwnProperty("Zuhr")) {
      updated.Dhuhr = timeObj.Zuhr;
    }
    if (timeObj.hasOwnProperty("Dhuhr")) {
      updated.Zuhr = timeObj.Dhuhr;
    }
    setTimes(updated);
    await AsyncStorage.setItem("notifyTimes", JSON.stringify(updated));
  };
  const asyncTwelveHourFormat = async (value: boolean) => {
    setTwelveHourFormat(value);
    await AsyncStorage.setItem("twelveHourFormat", JSON.stringify(value));
  };

  const loadSettings = useCallback(async () => {
    const previousTimes = await AsyncStorage.getItem("notifyTimes");
    if (previousTimes) {
      setTimes(JSON.parse(previousTimes));
    }
    const previousTwelveHourFormat = await AsyncStorage.getItem(
      "twelveHourFormat"
    );
    if (previousTwelveHourFormat) {
      setTwelveHourFormat(JSON.parse(previousTwelveHourFormat));
    }
  }, []);

  useEffect(() => {
    (async () => {
      await loadSettings();
    })();
  }, [loadSettings]);

  return (
    <DataContext.Provider
      value={{
        times,
        asyncSetTime,
        data,
        all,
        setData,
        twelveHourFormat,
        asyncTwelveHourFormat,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
