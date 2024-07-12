import { StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container1: {
    width: wp(78),
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 15,
    marginTop: 10,
    alignSelf: "center",
    flex: 3,
  },
  container2: {
    width: wp(78),
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 15,
    marginTop: 30,
    justifyContent: "space-evenly",
    alignSelf: "center",
    flex: 3,
  },
  container3: {
    width: wp(78),
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 15,
    marginTop: 30,
    justifyContent: "space-evenly",
    alignSelf: "center",
    flex: 3,
  },

  separator: {
    flex: 1,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "80%",
    alignSelf: "center",
  },
  title: {
    fontFamily: "Righteous_400Regular",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    marginLeft: 90,
    fontSize: 30,
    textDecorationLine: "underline",
  },
  back: {
    height: 250,
    color: "#fff",
  },

  textPara: {
    color: "#FFF",
    fontFamily: "Righteous_400Regular",
    position: "absolute",
    marginTop: 40,
    marginLeft: 10,
    fontSize: 14,
  },
  text: {
    color: "#fff",
    fontSize: wp(4.7),
    fontFamily: "Righteous_400Regular",
  },

  icon: {
    color: "#fff",
  },
  icon2: {
    color: "#fff",
  },
  button: {
    // marginLeft: 5,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
  button1: {
    marginLeft: 15,
    flexDirection: "row",
    width: "79%",
    justifyContent: "space-between",
    padding: 20,
  },
  switch: { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
  bottomSheet: {
    color: "rgba(255,255,255,0.5)",
  },
  sheetTitle: {
    color: "white",
    fontFamily: "Righteous_400Regular",
    textAlign: "center",
    fontSize: 25,
  },
  sheetButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5a998e",
    borderColor: "white",
    width: 300,
    alignSelf: "center",
    height: 80,
    borderRadius: 10,
    marginTop: 30,
  },
  selectedButton: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#5a998e",
    borderColor: "white",
    width: 300,

    height: 80,
    borderRadius: 10,
    marginTop: 30,
    borderWidth: 3,
  },
  sheetButtonTitle: {
    flexWrap: "wrap",
    textAlign: "center",
    color: "white",
    fontFamily: "Righteous_400Regular",
    fontSize: 15,
  },
  sheetButtonSubtitle: {
    color: "white",
    fontFamily: "Righteous_400Regular",
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
  },
  sheetButtonContainer: {},
  sheetSubtitle: {
    textAlign: "center",
    width: 300,
    alignSelf: "center",
    color: "white",
    fontFamily: "Righteous_400Regular",
    marginTop: 5,
  },
  buttonTitle: {
    flexWrap: "wrap",
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontFamily: "Righteous_400Regular",
    fontSize: wp(2.8),
  },
  calculationButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    left: 10,
  },
});

export default styles;
