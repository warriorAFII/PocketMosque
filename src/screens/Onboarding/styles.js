import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  imagelocation: {
    width: "100%",
    maxHeight: hp(60),
  },
  titleLocation: {
    color: "#177bac",
    fontSize: 28,
    bottom: 40,
    fontFamily: "Righteous_400Regular",
  },
  subtitleLocation: {
    color: "grey",
    justifyContent: "center",
    fontFamily: "Righteous_400Regular",
    textAlign: "center",
    bottom: 40,
    fontSize: 14,
    width: wp(82),
  },
  subtitleLocationAsterisk: {
    color: "#177bac",
    justifyContent: "center",
    fontFamily: "Righteous_400Regular",
    textAlign: "center",
    width: wp(82),
    bottom: 30,
  },
  imageNotif: {
    width: wp(100),
    bottom: 30,
  },

  titleNotif: {
    fontSize: wp(6.5),
    color: "#177bac",
    fontFamily: "Righteous_400Regular",
    bottom: 115,
  },
  subtitleNotif: {
    color: "grey",
    textAlign: "center",
    fontFamily: "Righteous_400Regular",
    width: wp(82),
    bottom: 115,
  },

  imageMain: {
    width: "120%",
    marginRight: 50,
  },

  titleMain: {
    fontSize: wp(6.5),
    color: "#177bac",
    fontFamily: "Righteous_400Regular",
    bottom: 42,
  },

  subtitleMain: {
    color: "grey",
    fontFamily: "Righteous_400Regular",
    marginBottom: 300,
    textAlign: "center",
    width: wp(82),
    bottom: 40,
  },
});

export default styles;
