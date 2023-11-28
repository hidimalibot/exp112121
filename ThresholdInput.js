// ThresholdInput.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const ThresholdInput = ({ initialThreshold, onSaveThreshold }) => {
  const [threshold, setThreshold] = useState(initialThreshold.toString());

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Set Expiration Reminder (Days):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter threshold"
        value={threshold}
        onChangeText={(text) => setThreshold(text)}
        onBlur={() => onSaveThreshold(parseInt(threshold, 10))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default ThresholdInput;
