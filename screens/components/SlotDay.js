import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { isToday } from "date-fns";

const SlotDay = ({
  disabled,
  dayName,
  dayNum,
  isToday,
  textStyles,
  badgeStyle,
}) => {
  const todayBadge = {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: isToday ? "green" : "transparent",
    borderColor: isToday ? "tomato" : "transparent",
    borderWidth: 0.5,
    borderRadius: 20,
    height: 40,
    width: 40,
  };

  const numStyles = [];
  if (disabled) {
    numStyles.push(styles.disableDayNumStyle);
  } else {
    numStyles.push(styles.dayNumStyle);
  }
  return (
    <View style={styles.content}>
      <Text style={styles.dayStyle}>{dayName}</Text>
      <View style={[badgeStyle]}>
        <Text style={[numStyles, , textStyles]}>{dayNum}</Text>
      </View>
    </View>
  );
};

export default SlotDay;
//isToday
const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    margin: 10,
  },
  dayStyle: {
    marginBottom: 4,
    fontSize: 14,
    color: "gray",
  },
  dayNumStyle: {
    fontSize: 15,
    fontWeight: "700",
  },
  disableDayStyle: {
    marginBottom: 4,
    fontSize: 14,
    color: "gray",
  },
  disableDayNumStyle: {
    fontSize: 15,
    fontWeight: "700",
    color: "gray",
  },
  badge: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
    borderColor: "green",
    borderRadius: 20,
    height: 30,
    width: 30,
  },

  badge: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",

    borderRadius: 20,
    height: 30,
    width: 30,
  },
});
