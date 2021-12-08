import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
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
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isChanged, setIsChanged] = useState<boolean>(false);

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
    setIsVisible(false);
  };

  const onConfirm = () => {
    props.onSelect({
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    });
    setIsVisible(false);
  };

  // check if endTime is after startTime
  useEffect(() => {
    let endTimeHour = selectedEndTime.substring(0, 2);
    let endTimeMinute = selectedEndTime.substring(3, 5);
    let startTimeHour = selectedStartTime.substring(0, 2);
    let startTimeMinute = selectedStartTime.substring(3, 5);

    // if no endTime is selected, set isValid to true
    if (selectedStartTime === '00:00:00' || selectedEndTime === '00:00:00') {
      setIsChanged(false);
      setIsValid(false);
      return;
    } else {
      setIsChanged(true);
    }

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
    if (props.visible && !isVisible) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [props.visible]);

  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationInTiming={200}
        animationOutTiming={200}
        style={styles.modal}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.boldCenterText}>{props.title || ''}</Text>
            <Text style={styles.warningText}>
              {!isValid && isChanged
                ? 'End time must be greater than start time'
                : ''}
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
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: Colors.white,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
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
    fontSize: 16,
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
