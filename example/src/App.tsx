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
    setVisible(false);
  };

  const onReset = () => {
    setVisible(false);
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
      <View style={styles.timeContainer}>
        <Text style={styles.text}>Time selected</Text>
        <Text style={styles.text}>{`${getLocaleTime(start)} - ${getLocaleTime(
          end
        )}`}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>CLICK TO PICK TIME RANGE</Text>
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
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    padding: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'red',
    borderColor: '#A8A8A8',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
});
