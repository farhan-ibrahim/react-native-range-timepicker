# react-native-range-timepicker

A React Native component for picking time ranges

## Installation

```sh
npm install react-native-range-timepicker
```

## Usage

```js
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

 
 return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.text}>Time selected</Text>
        <Text style={styles.text}>{`${start)} - ${end}`}</Text>
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
  
  // ...
})

   
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
