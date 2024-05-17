import { useState, useEffect } from "react";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { addDays, format, getDate, isSameDay, isToday ,isTomorrow} from "date-fns";

const SlotCalendarStrip = ({ date, onChange }) => {
  const [weekDays, setWeekDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(undefined);
  useEffect(() => {
    setWeekDays(getWeekDays(date));
    setSelectedDate(format(new Date(date), "dd-MMM-yyyy"));

    return () => {};
  }, []);

  const getWeekDays = (date) => {
    const weekStartsOn = addDays(date, 1);
    const start = weekStartsOn;

    let final = [];

    for (let index = 0; index < 14; index++) {
      const date = addDays(start, index);
      final.push({
        formatted: format(date, "EEE dd MMM"),
        dayName: format(date, "EEE"),
        month: format(date, "MMM"),
        date,
        day: getDate(date),
      });
    }
    return final;
  };

  return (
    <View
      style={{
         height:150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",

      }}
    >
      <ScrollView
        horizontal
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {weekDays.map((weekDay, i) => {
            let isSelected = false;
            const textStyles = [];
            const selectedStyle = [];
            const sameDate = isSameDay(weekDay.date, date);
            if (sameDate) {
              isSelected = true;

            } else {
              textStyles.push(styles.normal, {
                color: isToday(weekDay.date) ? "tomato" : "gray",
              });
            }
            return (
              <View key={i} style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    onChange(weekDay.date);
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    {isToday(weekDay.date) && isSelected ? (
                      <Text>Today</Text>
                    ) : null}
                    {isTomorrow(weekDay.date) && isSelected ? (
                      <Text>Tomorrow</Text>
                    ) : null}
                    <View
                      style={[
                        styles.normal,
                        {
                          backgroundColor: isSelected
                            ? "tomato"
                            : "transparent",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayName,
                          {
                            marginBottom: 6,
                            marginTop: 10,
                            color: isSelected ? "white" : "black",
                          },
                        ]}
                      >
                        {weekDay.dayName}
                      </Text>
                      <Text
                        style={[
                          styles.TextStyle,
                          {
                            color: isSelected ? "white" : "black",
                          },
                        ]}
                      >
                        {weekDay.day}
                      </Text>
                      <Text
                        style={[
                          styles.dayName,
                          {
                            color: isSelected ? "white" : "black",
                          },
                        ]}
                      >
                        {weekDay.month}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {/*<Text style={{ fontSize: 40 }}>|</Text>*/}
                <View style={{borderWidth:.5, height:30, borderColor:"#ddd"}}/>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SlotCalendarStrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TextStyle: {
    fontSize: 32,
    //fontWeight: "700",
    fontFamily: "Philosopher_Regular",
  },
  dayName: {
    fontSize: 15,
  },
  today: {
    color: "tomato",
  },
  normal: {
    height: 100,
    width: 90,
    //flexDirection: "row",
    alignItems: "center",
    //justifyContent: "center",
    margin: 10,

    borderRadius: 6,
    borderColor: "tomato",
  },
  selectedStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
// style={buttonStyle}
