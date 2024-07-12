import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  Text,
  View,
  StyleSheet,
  Vibration,
} from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import calculate from "azimuth";
import CompassHeading from "react-native-compass-heading";
import Header from "../../components/Header";
import { DataContext } from "../../context/DataContext";
// import { Images } from "../../theme";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");
const degree_update_rate = Platform.OS === "ios" ? 1 : 1; // Number of degrees changed before the callback is triggered

const Compass = () => {
  const { data } = useContext(DataContext);
  const [degree, setDegree] = useState(0);
  const [isVibrated, setIsVibrated] = useState(false); // Add a flag

  const {
    data: { latitude, longitude },
  } = useContext(DataContext);

  useFocusEffect(
    useCallback(() => {
      const callback = ({ heading, accuracy }) => {
        const degree = heading * (360 / 360);
        setDegree(degree);

        // Check if the direction is pointing to the Qibla and not currently vibrated
        if (Math.abs(degree - angleToQibla) <= 1 && !isVibrated) {
          // Vibrate for 500 milliseconds when pointing to the Qibla
          Vibration.vibrate(500);

          // Set the isVibrated flag to true
          setIsVibrated(true);

          // Set a timeout to reset the isVibrated flag after 2 seconds (adjust as needed)
        }
        if (Math.abs(degree - angleToQibla) >= 5) {
          setIsVibrated(false);
        }
      };

      CompassHeading.start(degree_update_rate, callback);

      return () => {
        // Clear the timeout when the component unmounts
        CompassHeading.stop();
      };
    }, [isVibrated])
  );

  const azimuthCalculus = (lat = 0, lng = 0) => {
    const azimuth = calculate.azimuth(
      {
        lat: lat,
        lng: lng,
        elv: 0,
      },
      {
        lat: 21.422523,
        lng: 39.826183,
        elv: 0,
      }
    );
    return Math.round(azimuth.azimuth);
  };

  const QiblaSourceFunc = (angle) => {
    if (angle <= 10) {
      return (qiblaSource = require("../../assets/Images/N.png"));
    } else if (angle >= 10 && angle < 22.5) {
      return (qiblaSource = require("../../assets/Images/NNE.png"));
    } else if (angle >= 22.5 && angle < 45) {
      return (qiblaSource = require("../../assets/Images/NE.png"));
    } else if (angle >= 45 && angle < 67.5) {
      return (qiblaSource = require("../../assets/Images/NEE.png"));
    } else if (angle >= 67.5 && angle < 90) {
      return (qiblaSource = require("../../assets/Images/NEE.png"));
    } else if (angle >= 90 && angle < 112.5) {
      return (qiblaSource = require("../../assets/Images/E.png"));
    } else if (angle >= 112.5 && angle < 135) {
      return (qiblaSource = require("../../assets/Images/SEE.png"));
    } else if (angle >= 135 && angle < 157.5) {
      return (qiblaSource = require("../../assets/Images/SE.png"));
    } else if (angle >= 157.5 && angle < 180) {
      return (qiblaSource = require("../../assets/Images/SSE.png"));
    } else if (angle >= 180 && angle < 202.5) {
      return (qiblaSource = require("../../assets/Images/S.png"));
    } else if (angle >= 202.5 && angle < 225) {
      return (qiblaSource = require("../../assets/Images/SSW.png"));
    } else if (angle >= 225 && angle < 247.5) {
      return (qiblaSource = require("../../assets/Images/SW.png"));
    } else if (angle >= 247.5 && angle < 270) {
      return (qiblaSource = require("../../assets/Images/SWW.png"));
    } else if (angle >= 270 && angle < 292.5) {
      return (qiblaSource = require("../../assets/Images/W.png"));
    } else if (angle >= 292.5 && angle < 315) {
      return (qiblaSource = require("../../assets/Images/NWW.png"));
    } else if (angle >= 315 && angle < 337.5) {
      return (qiblaSource = require("../../assets/Images/NW.png"));
    } else if (angle >= 337.5 && angle <= 360) {
      return (qiblaSource = require("../../assets/Images/NNW.png"));
    } else {
      return console.log("theres a error in compass component function");
    }
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  var angleToQibla = azimuthCalculus(latitude, longitude);
  var qiblaSource = QiblaSourceFunc(angleToQibla);

  return (
    <Grid style={styles.container}>
      <Header city={data.city} />

      <Text
        style={{
          color: "#fff",
          fontSize: height / 26,
          fontWeight: "bold",
          fontFamily: "Righteous_400Regular",
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        {_direction(degree)}
      </Text>

      <Row style={{ alignItems: "center", marginVertical: 50 }} size={0.1}>
        <Col style={{ alignItems: "center" }}>
          <View
            style={{
              position: "absolute",
              width: width,
              alignItems: "center",
              top: 0,
            }}
          >
            <Image
              source={require("../../assets/Images/compass_pointer.png")}
              style={{
                bottom: wp(5),
                resizeMode: "contain",
              }}
            />
          </View>
        </Col>
      </Row>

      <Row style={{ alignItems: "center" }} size={2}>
        <Col
          style={{ alignItems: "center", transform: [{ rotate: -90 + "deg" }] }}
        >
          <ImageBackground
            source={qiblaSource}
            style={{
              height: 300,
              width: 300,
              justifyContent: "center",
              alignItems: "center",
              transform: [{ rotate: 360 - degree + "deg" }],
            }}
          />
        </Col>
      </Row>

      <View style={styles.separator} />
    </Grid>
  );
};

export default Compass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    flex: 1,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "80%",
    alignSelf: "center",
  },
});
