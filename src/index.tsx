import React, { useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors } from './Themes';
import TimePicker from './Timepicker';

export type RangeTimePickerProps = {
  visible: boolean;
  title?: string;
  onReset: () => void;
  onSelect: (timeRange: { startTime: any; endTime: any }) => void;
};

const TimeRangePicker: React.FC<RangeTimePickerProps> = (
  props: RangeTimePickerProps
) => {
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [isValid, setIsValid] = useState(true);
  const modalRef = useRef<Modalize>(null);

  const onChangeStartTime = (value: string) => {
    setSelectedStartTime(value);
  };

  const onChangeEndTime = (value: string) => {
    setSelectedEndTime(value);
  };

  const onReset = () => {
    setSelectedStartTime('');
    setSelectedEndTime('');
    props.onReset();
    modalRef.current?.close();
  };

  const onConfirm = () => {
    props.onSelect({
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    });
    modalRef.current?.close();
  };

  // check if endTime is after startTime
  useEffect(() => {
    let endTimeHour = selectedEndTime.substring(0, 2);
    let endTimeMinute = selectedEndTime.substring(3, 5);
    let startTimeHour = selectedStartTime.substring(0, 2);
    let startTimeMinute = selectedStartTime.substring(3, 5);

    // if endTimeHour less than startTimeHour
    if (Number(endTimeHour) < Number(startTimeHour)) {
      setIsValid(false);
    } else if (
      Number(endTimeHour) === Number(startTimeHour) &&
      Number(endTimeMinute) <= Number(startTimeMinute)
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [selectedStartTime, selectedEndTime]);

  useEffect(() => {
    if (props.visible) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [props.visible]);

  return (
    <Portal>
      <Modalize
        adjustToContentHeight
        ref={modalRef}
        handlePosition={'inside'}
        scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
      >
        <View style={styles.header}>
          <Text style={styles.boldCenterText}>{props.title || ''}</Text>
          <Text style={styles.warningText}>
            {isValid ? '' : 'End time must be greater than start time'}
          </Text>
          <View style={styles.label}>
            <Text style={styles.boldCenterText}>START</Text>
            <Text style={styles.boldCenterText}>END</Text>
          </View>
        </View>
        <View style={styles.pickerContainer}>
          <TimePicker onChangeValue={onChangeStartTime} />
          <TimePicker onChangeValue={onChangeEndTime} />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={onReset}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm} disabled={!isValid}>
            <Text
              style={[
                styles.boldCenterText,
                {
                  color: isValid ? Colors.black : Colors.red,
                },
              ]}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footer: {
    paddingTop: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 2,
    borderTopColor: Colors.grey,
  },
  boldCenterText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  warningText: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.red,
  },
});

export default TimeRangePicker;
