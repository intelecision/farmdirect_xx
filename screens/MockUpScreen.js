import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import AnimatedHeader from '../components/AnimatedHeader';
import CalendarHeader from './components/CalendarHeader';
import { addDays, addWeeks, differenceInDays } from 'date-fns';

const MockUpScreen = () => {
  const [date, setDate] = useState(new Date());

  const handleNextWeek = () => {
    const nextWeek = addWeeks(date, 1);

    // no more than 2 weeks from today.
    const today = new Date();
    const diff = differenceInDays(today, nextWeek);

    setDate(nextWeek);
  };
  const handlePrevWeek = () => {
    const prevWeek = addWeeks(date, -1);
    // no more than 2 weeks from today.
    const today = new Date();
    const diff = differenceInDays(today, prevWeek);

    setDate(prevWeek);
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ height: 200 }}>
        <CalendarHeader
          date={date}
          onChange={(newDate) => setDate(newDate)}
          onNextWeek={() => handleNextWeek()}
          onPrevWeek={() => handlePrevWeek()}
        />
      </View>
      <Button
        title={date.toDateString()}
        onPress={() => {
          handleNextWeek();
        }}
      />
    </View>
  );
};

export default MockUpScreen;

const styles = StyleSheet.create({});
