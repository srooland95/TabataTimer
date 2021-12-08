import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Animated,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const colors = {
  black: "#323F4E",
  red: "#F76A6A",
  white: "#ffffff",
};
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

const timers = [...Array(13).keys()].map((i) => i * 5).slice(-12);

const Timer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [timerDuration, setTimerDuration] = useState(timers[0]);

  return (
    <View style={styles.container}>
      <StatusBar style={"light"} />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 100,
          },
        ]}
      >
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.button}></View>
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.flatListContainer}>
        <Text style={styles.number}>{timerDuration}</Text>
        <Animated.FlatList
          style={{ flexGrow: 0 }}
          data={timers}
          keyExtractor={(item) => item.toString()}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(
              ev.nativeEvent.contentOffset.x / ITEM_SIZE
            );
            setTimerDuration(timers[index]);
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.7, 1, 0.7],
            });
            return (
              <View
                style={{
                  width: ITEM_SIZE,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Animated.Text
                  style={[
                    styles.number,
                    {
                      opacity,
                      transform: [{ scale }],
                    },
                  ]}
                >
                  {item}
                </Animated.Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  number: {
    color: colors.white,
    fontSize: ITEM_SIZE * 0.8,
    fontWeight: "900",
  },
  flatListContainer: {
    position: "absolute",
    top: height * 0.3,
    left: 0,
    right: 0,
    flex: 1,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
});

export default Timer;
