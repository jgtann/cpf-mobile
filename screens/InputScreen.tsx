import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { calculateCPFProjection } from '../utils/cpfCalculator';

export default function InputScreen({ navigation }: any) {
  const [age, setAge] = useState('');
  const [years, setYears] = useState('');
  const [oa, setOA] = useState('');
  const [sa, setSA] = useState('');
  const [ma, setMA] = useState('');

  const handleCalculate = () => {
    const results = calculateCPFProjection({
      age: parseInt(age),
      years: parseInt(years),
      oa: parseFloat(oa),
      sa: parseFloat(sa),
      ma: parseFloat(ma),
    });
    navigation.navigate('Results', { results });
  };

  const handleClear = () => {
    setAge('');
    setYears('');
    setOA('');
    setSA('');
    setMA('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>CPF Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Projection Years"
        keyboardType="numeric"
        value={years}
        onChangeText={setYears}
      />
      <TextInput
        style={styles.input}
        placeholder="OA"
        keyboardType="numeric"
        value={oa}
        onChangeText={setOA}
      />
      <TextInput
        style={styles.input}
        placeholder="SA"
        keyboardType="numeric"
        value={sa}
        onChangeText={setSA}
      />
      <TextInput
        style={styles.input}
        placeholder="MA"
        keyboardType="numeric"
        value={ma}
        onChangeText={setMA}
      />

      {/* Button container for spacing */}
      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <Button title="Calculate" onPress={handleCalculate} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Clear" onPress={handleClear} color="#cc3333" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#006666',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  buttonWrapper: {
    flex: 1,
  },
});
