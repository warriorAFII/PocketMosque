import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default StyleSheet.create({
  container: {
    marginHorizontal: 20,
    elevation: 8,
    flex: 1,

    marginBottom: 15,
  },
  title: {
    fontFamily: "Righteous_400Regular",
    textAlign: "center",
    fontSize: wp(8),

    marginTop: 10,
    color: "white",
    alignSelf: "center",
  },
  hijriTitle: {
    fontFamily: "Righteous_400Regular",
    textAlign: "center",
    fontSize: wp(4),
    marginBottom: 30,

    color: "white",
    alignSelf: "center",
  },
  image: {
    marginHorizontal: 20,
  },
});
