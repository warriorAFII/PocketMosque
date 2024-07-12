import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef, useEffect, useState } from "react";
import BottomSheet from "react-native-gesture-bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateMessage = ({ splashScreenHiddenForHome }) => {
  const [isFirstUseOnUpdate, setIsFirstUseOnUpdate] = useState(false);

  const bottomSheet = useRef();

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem("isFirstUseOnUpdate");
      if (!value) {
        await AsyncStorage.setItem("isFirstUseOnUpdate", "true");
        setIsFirstUseOnUpdate(true);
      } else {
        setIsFirstUseOnUpdate(false);
      }
    })();
  }, []);

  if (isFirstUseOnUpdate && splashScreenHiddenForHome) {
    bottomSheet.current.show();
  }
  return (
    <BottomSheet
      sheetBackgroundColor={"#346895"}
      hasDraggableIcon
      ref={bottomSheet}
      height={500}
    >
      <View>
        <ScrollView style={{ marginBottom: 30 }}>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: "Righteous_400Regular",
                color: "white",
                fontSize: 40,
                paddingLeft: 20,
              }}
            >
              What's New! 🎉
            </Text>
            <Text
              style={{
                fontFamily: "Righteous_400Regular",
                color: "white",
                fontSize: 15,
                paddingLeft: 20,
              }}
            >
              v1.0.6
            </Text>

            <View style={{ flexDirection: "row", width: 240 }}>
              <Text
                style={{
                  fontFamily: "Righteous_400Regular",
                  color: "white",
                  padding: 15,
                  paddingLeft: 24,
                }}
              >
                -📿Dhikr section added{`\n`}-⏱12 Hour format added{`\n`}-🤲🏽View
                a months Prayer time
              </Text>

              <Image
                style={{
                  height: 130,
                  width: 130,
                  alignSelf: "flex-end",
                }}
                source={require("../../assets/Images/laptopMan.png")}
              />
            </View>
            <Text
              style={{
                fontFamily: "Righteous_400Regular",
                color: "white",
                padding: 10,
                paddingLeft: 24,
              }}
            >
              With these new features added to Pocket Mosque, I believe that the
              app is in a good state;{`\n`}
              {`\n`} I am going to take a small break from adding new features
              to focus on monitoring and fixing possible bugs to keep the app
              running smoothly. {`\n`}
              {`\n`}This is still early days for the app and I have many
              features I will be bringing to the app in later months{`\n`}In sha
              Allah including:
            </Text>
            <Text
              style={{
                fontFamily: "Righteous_400Regular",
                color: "white",
                padding: 10,
                paddingLeft: 24,
              }}
            >
              -📿Dua section relook with categories{`\n`}-📚Quran screen{`\n`}
              -📱IOS and Android widgets
              {`\n`}
              {`\n`}
              Any issues with the app please message Pocket Mosque's Instagram
              or Twitter (Both found in settings)
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default UpdateMessage;
