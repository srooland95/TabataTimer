import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import moment from "moment";

const { width, height } = Dimensions.get("screen");

const Date = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      const now = moment().format("HH:mm:ss");
      setTime(now);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{time}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          clearInterval();
        }}
      >
        <Text style={styles.buttonText}>mutasd az időt</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 50,
  },
  button: {
    width: width * 0.85,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    marginTop: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 30,
  },
});

export default Date;
