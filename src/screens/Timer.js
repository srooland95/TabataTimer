import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("screen");

const colors = {
  black: "#292C31",
  white: "#FDFDFD",
  main: "#A9DDD8",
};
const ITEM_SIZE = width * 0.4;
const ITEM_SPACING = (width - ITEM_SIZE) * 0.5;

const timers = [...Array(13).keys()].map((i) => i * 5).slice(-12);

const Timer = () => {
  return (
    <View style={styles.container}>
      <StatusBar style={"light"} />
      <View style={styles.timePickerContainer}>
        <FlatList
          data={timers}
          keyExtractor={(item) => item.toString()}
          style={{ flexGrow: 0 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          snapToInterval={ITEM_SIZE}
          contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: ITEM_SIZE,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.number}>{item}</Text>
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: colors.main,
            borderRadius: 50,
          }}
        ></View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
  },
  timePickerContainer: {
    height: ITEM_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: height * 0.1,
  },
  number: {
    color: colors.white,
    fontSize: ITEM_SIZE * 0.8,
  },
});

export default Timer;
