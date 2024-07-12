import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },

  card1: {
    // height: wp(23),
    flex: 1,
    borderRadius: 10,
    marginBottom: wp(1),
    resizeMode: "contain",
    // overflow: 'hidden'
  },

  card: {
    flex: 3,
    // height: wp(73),
    marginBottom: wp(1),
  },
  bellIconMain: {},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    // backgroundColor: 'pink',
    borderRadius: 10,
    flex: 1,
  },

  prayertitle: {
    // marginLeft: 10,
    // marginTop: 15,
    fontSize: wp(9),
    color: "white",
    fontFamily: "Righteous_400Regular",
  },

  prayertitlemain: {
    textAlign: "center",
    fontSize: hp(5),
    color: "white",
    fontFamily: "Righteous_400Regular",
    paddingBottom: 5,
  },

  tomorrowTitle: {
    fontSize: hp(2),
    color: "white",
    fontFamily: "Righteous_400Regular",
    paddingBottom: 5,
    marginLeft: 10,
    alignSelf: "center",
    zIndex: 2,
    position: "absolute",
    alignSelf: "flex-start",
    justifyContent: "center",

    paddingRight: 15,
    paddingTop: 10,
  },

  dua: {
    color: "#FFF",
    marginLeft: 2,
    // marginTop: 180,
    textAlign: "center",
    lineHeight: 25,
    fontSize: hp(1.6),

    fontWeight: "bold",

    // position: "absolute",
  },

  duameaning: {
    fontFamily: "Righteous_400Regular",
    fontSize: hp(1.3),
    textAlign: "center",
    color: "#FFF",
    // marginTop: wp(56),
    // width: 320,
    // marginLeft: wp(7),
    // position: "absolute",
  },

  prayertime: {
    color: "#FFF",
    fontSize: hp(3),
    // position: "absolute",
    // paddingTop: 25,
    alignSelf: "center",
    fontFamily: "Righteous_400Regular",
  },

  prayertimemain: {
    fontSize: wp(9),

    color: "#FFF",

    fontFamily: "Righteous_400Regular",
  },

  prayertimer: {
    // marginLeft: wp(14),
    // marginTop: 55,
    color: "#fff",
    fontFamily: "Righteous_400Regular",
    fontSize: wp(5),
  },

  seperatormain: {
    backgroundColor: "white",
    // height: 1,

    width: 1,
    marginHorizontal: 15,

    height: "70%",

    // paddingVertical:

    // width: 60,
    // transform: [{ rotate: "90deg" }],
    // marginLeft: wp(38),
    // marginTop: 40,
    // position: "absolute",
  },

  seperator: {
    backgroundColor: "white",
    // flex: 1,
    // alignSelf: 'flex-end',
    height: hp(7),

    width: 1,
    marginHorizontal: 20,

    // alignSelf: 'center'
  },

  temp: {
    // paddingVertical: 5,
    // fontSize: wp(11.5),
    fontSize: wp(9),
    color: "white",

    // position: "absolute",
    // marginLeft: wp(50),
    // height: 100,
    fontFamily: "Righteous_400Regular",
  },
});

export default styles;
