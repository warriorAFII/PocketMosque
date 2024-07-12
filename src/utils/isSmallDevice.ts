import { Dimensions } from "react-native";

const isSmallDevice = (heightThreshold: number) => {
  const isSmallDevice = Dimensions.get("window").height < heightThreshold;
  return isSmallDevice;
};

export default isSmallDevice;
