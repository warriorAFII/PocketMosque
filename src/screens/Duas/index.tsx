import React, { useState, useContext, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Header from "../../components/Header";
import duas from "../../utils/constants/duas.json";
import dhikr from "../../utils/constants/dhikr.json";
import Carousel from "react-native-reanimated-carousel";
import DuasNavBar from "../../components/DuasNavBar";
import { DataContext } from "../../context/DataContext";
import isSmallDevice from "../../utils/isSmallDevice";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface DuasObject {
  id: number;
  title: string;
  arabic: string;
  translation: string;
  meaning: string;
  color: string;
}
const Duas = () => {
  const [toggleDuas, setToggleDuas] = useState("duas");
  const [activeIndex, setActiveIndex] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  const { data } = useContext(DataContext);
  const deviceHeight = Dimensions.get("window").height;

  const heightResponsiveDuas = deviceHeight / 1.5;

  const dynamicCardWidth = deviceHeight < 750 ? 290 : 250;

  function _renderItem({ item }: { item: DuasObject }): JSX.Element {
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: item.color,
            width: dynamicCardWidth,
            marginLeft: isSmallDevice(750) ? 40 : 70,
          },
        ]}
      >
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardArabic}>{item.arabic}</Text>
        <View style={styles.separatorUnderArabic} />
        <Text style={styles.cardTransliteration}>{item.translation}</Text>
        <View style={styles.separatorUnderTransliteration} />
        <Text style={styles.cardMeaning}>{item.meaning}</Text>
      </View>
    );
  }

  useEffect(() => {
    if (randomNumber === 0) {
      setRandomNumber(Math.floor(Math.random() * (10 - 0)) + 0);
    }
  }, [randomNumber]);

  return (
    <View style={styles.container}>
      <Header city={data?.city} />
      <DuasNavBar
        toggleDuas={toggleDuas}
        setToggleDuas={setToggleDuas}
        setActiveIndex={setActiveIndex}
      />
      <GestureHandlerRootView>
        <Carousel
          loop={false}
          mode={"horizontal-stack"}
          modeConfig={{
            showLength: 3,
            scaleInterval: isSmallDevice(750) ? 0 : 0.2,
            stackInterval: 20,
          }}
          height={heightResponsiveDuas}
          width={500}
          data={
            toggleDuas === "duas"
              ? [
                  duas[randomNumber],
                  duas[randomNumber + 10],
                  duas[randomNumber + 20],
                  duas[randomNumber + 30],
                  duas[randomNumber + 40],
                ]
              : [
                  dhikr[randomNumber % 2 === 0 ? 0 : 1],
                  dhikr[randomNumber % 2 === 0 ? 2 : 3],
                  dhikr[randomNumber % 2 === 0 ? 4 : 5],
                  dhikr[randomNumber % 2 === 0 ? 6 : 7],
                  dhikr[randomNumber % 2 === 0 ? 8 : 9],
                ]
          }
          //sliderWidth={430}
          //itemWidth={300}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </GestureHandlerRootView>
      <View style={styles.seperator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    borderRadius: 16,
    height: "90%",
    marginTop: 40,
    overflow: "hidden",
    alignItems: "center",
  },

  cardTitle: {
    color: "white",
    fontFamily: "Righteous_400Regular",
    fontSize: 18,
    textAlign: "center",
    padding: 5,
  },

  cardArabic: {
    color: "white",
    fontSize: 20,
    lineHeight: 40,
    marginTop: 5,
    padding: 10,
    textAlign: "right",
    fontWeight: "600",
    width: 240,
    height: 160,
  },
  separatorUnderArabic: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "80%",
  },
  cardTransliteration: {
    color: "white",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 17,
    textAlign: "left",
    lineHeight: 22,
    fontSize: 13,

    width: "90%",
    fontFamily: "Righteous_400Regular",
  },

  separatorUnderTransliteration: {
    flex: 1,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "80%",
  },

  cardMeaning: {
    color: "white",
    padding: 10,
    fontFamily: "Righteous_400Regular",
    lineHeight: 22,
    textAlign: "left",
    fontSize: 13,
    height: 170,
    width: "90%",
  },

  seperator: {
    flex: 1,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "80%",
    alignSelf: "center",
  },
});

export default Duas;
