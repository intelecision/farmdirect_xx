import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Icon } from '@rneui/themed';
import SlotDay from './SlotDay';

import {
  addDays,
  format,
  startOfWeek,
  getDate,
  isSameDay,
  addWeeks,
  compareAsc,
  isToday,
  getWeek,
} from 'date-fns';

const CalendarHeader = ({ date, onChange, onNextWeek, onPrevWeek }) => {
  const [weekDays, setWeekDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [disabledTouch, setDisabledTouch] = useState(false);
  useEffect(() => {
    setWeekDays(getWeekDays(date));
    setSelectedDate(format(new Date(date), 'dd-MMM-yyyy'));

    return () => {};
  }, [date]);

  const getWeekDays = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    final = [];

    for (let index = 0; index < 7; index++) {
      const date = addDays(start, index);
      final.push({
        formatted: format(date, 'EEE').toUpperCase(),
        date,
        day: getDate(date),
      });
    }
    return final;
  };

  const start = startOfWeek(date, { weekStartsOn: 1 });
  const disableBack =
    getWeek(new Date(), { weekStartsOn: 1 }) -
      getWeek(start, { weekStartsOn: 1 }) ===
    0;
  const disableForward =
    getWeek(start, { weekStartsOn: 1 }) -
      getWeek(new Date(), { weekStartsOn: 1 }) ===
    3;

  return (
    <View
      style={{
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 110,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'centre',
          alignItems: 'center',

          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <View>
          {!disableBack ? (
            <Icon
              type='ionicon'
              name='chevron-back-outline'
              size={40}
              onPress={onPrevWeek}
            />
          ) : (
            <Icon
              type='ionicon'
              name='chevron-back-outline'
              color='gray'
              size={40}
            />
          )}
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          {weekDays.map((weekDay, i) => {
            const textStyles = [];
            const badgeStyle = [];
            let disableTouch = false;
            const inDate = compareAsc(new Date(), weekDay.date);

            if (inDate != -1 || isToday(weekDay.date)) {
              disableTouch = true;
            }
            const sameDate = isSameDay(weekDay.date, date);
            if (sameDate) {
              badgeStyle.push(styles.badge);
              textStyles.push(styles.numTextStyle);
            } else {
              textStyles.push(styles.normal, {
                color: isToday(weekDay.date)
                  ? 'tomato'
                  : disableTouch
                  ? 'gray'
                  : 'black',
              });
            }

            return (
              <TouchableOpacity
                key={i}
                disabled={disableTouch}
                //style={touchable}
                onPress={() => {
                  onChange(weekDay.date);
                }}
              >
                <SlotDay
                  key={i}
                  disabled={disableTouch}
                  dayName={weekDay.formatted}
                  dayNum={weekDay.day}
                  textStyles={textStyles}
                  badgeStyle={badgeStyle}
                  isToday={isToday(weekDay.date)}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          {!disableForward ? (
            <Icon
              type='ionicon'
              name='chevron-forward-outline'
              size={40}
              onPress={onNextWeek}
            />
          ) : (
            <Icon
              type='ionicon'
              name='chevron-forward-outline'
              size={40}
              color='gray'
            />
          )}
        </View>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>
          {date.toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default CalendarHeader;

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
    borderRadius: 20,
    height: 30,
    width: 30,
  },
  numTextStyle: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  normal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
  },
  today: {
    color: 'tomato',
  },
  disableStyle: {
    color: 'gray',
  },
});
