import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import TimeRangePicker from 'react-native-range-timepicker';

export default function App() {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [start, setStart] = React.useState<string>('');
  const [end, setEnd] = React.useState<string>('');

  const onSelect = ({ startTime, endTime }: any) => {
    setStart(startTime);
    setEnd(endTime);
  };

  const onReset = () => {
    setStart('');
    setEnd('');
  };

  const getLocaleTime = (time: string) => {
    if (typeof time !== 'string') {
      return time;
    }

    let a = 'am';
    let mm = time.substring(3, 5);

    // hh : mm :ss => hh:mm a
    const getHours = (t: string) => {
      let hours = t.substring(0, 2);
      if (Number(hours) >= 12) {
        a = 'pm';
        if (Number(hours) === 12) {
          return hours;
        } else {
          return Number(hours) - 12;
        }
      }
      return hours;
    };

    let hh = getHours(time);
    return `${hh}.${mm} ${a}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>PICK TIME RANGE</Text>
        <View style={styles.time}>
          <Text>{`${getLocaleTime(start)} - ${getLocaleTime(end)}`}</Text>
        </View>
      </TouchableOpacity>
      <TimeRangePicker
        visible={visible}
        onReset={onReset}
        onSelect={onSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    marginLeft: 'auto',
    borderColor: '#A8A8A8',
    borderRadius: 8,
    borderWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
});
