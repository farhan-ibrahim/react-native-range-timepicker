import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from './Themes';
import ScrollPicker from 'react-native-picker-scrollview';

type Props = {
  defaultValue?: string;
  onChangeValue: (value: string) => void;
};

const TimePicker = (props: Props) => {
  const [hour, setHour] = useState('0');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('AM');

  const onHourChange = (data: string) => {
    setHour(data);
  };

  const onMinuteChange = (data: string) => {
    setMinute(data);
  };

  const onPeriodChange = (data: string) => {
    setPeriod(data);
  };

  useEffect(() => {
    const getHours = () => {
      let h = hour;
      if (period === 'AM') {
        if (Number(hour) === 12 && Number(minute) > 0) h = '11';
      } else {
        if (Number(hour) < 12) {
          h = `${Number(hour) + 12}`;
        } else {
          h = hour;
        }
      }
      return Number(h) <= 9 ? `0${h}` : h;
    };

    let hh = getHours();
    let mm = minute;
    let selectedTime = `${hh}:${mm}:00`;
    props.onChangeValue(selectedTime);
  }, [hour, minute, period, props]);

  return (
    <View style={styles.container}>
      <ScrollPicker
        dataSource={Array.from(
          { length: period === 'PM' ? 13 : 12 },
          (_, i) => i
        )}
        wrapperColor={Colors.white}
        // selectedIndex={0}
        renderItem={(data: string) => {
          return (
            <View>
              <Text>{data}</Text>
            </View>
          );
        }}
        onValueChange={onHourChange}
      />
      <ScrollPicker
        dataSource={Array.from({ length: 60 }, (_, i) =>
          i <= 9 ? `0${i}` : i
        )}
        wrapperColor={Colors.white}
        // selectedIndex={0}
        renderItem={(data: string) => {
          return (
            <View>
              <Text>{data}</Text>
            </View>
          );
        }}
        onValueChange={onMinuteChange}
      />
      <ScrollPicker
        dataSource={['AM', 'PM']}
        wrapperColor={Colors.white}
        // selectedIndex={0}
        renderItem={(data: string) => {
          return (
            <View>
              <Text>{data}</Text>
            </View>
          );
        }}
        onValueChange={onPeriodChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
});

export default TimePicker;
