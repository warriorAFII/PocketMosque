import { ImageBackground } from "react-native";
import styles from "./styles";
import React from "react";
import { Images } from "../../assets/constants";
import CardsSmall from "./CardsSmall";
import CardsMain from "./CardsMain";

function PrayerCard({ currentSalah, time, salah, temp, countdown, afterIsha }) {
  const getImage = () => {
    switch (salah) {
      case "Fajr":
        return Images.fajr;
      case "Zuhr":
        return Images.zuhr;
      case "Asr":
        return Images.asr;
      case "Maghrib":
        return Images.maghrib;
      case "Isha":
        return Images.isha;
      default:
        return Images.fajr;
    }
  };

  if (currentSalah) {
    return (
      <ImageBackground
        style={styles.card}
        imageStyle={{ borderRadius: 10 }}
        source={getImage()}
      >
        <CardsMain
          afterIsha={afterIsha}
          salah={salah}
          time={time}
          temp={temp}
          countdown={countdown}
        />
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        style={styles.card1}
        imageStyle={{ borderRadius: 10 }}
        source={getImage()}
      >
        <CardsSmall salah={salah} time={time} />
      </ImageBackground>
    );
  }
}

export default PrayerCard;
