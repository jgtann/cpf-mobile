// File: screens/InputScreen.tsx
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
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
      years: parseInt(years), // ✅ Now included
      oa: parseFloat(oa),
      sa: parseFloat(sa),
      ma: parseFloat(ma),
    });
    navigation.navigate('Results', { results });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>CPF Calculator</Text>
      <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" value={age} onChangeText={setAge} />
      <TextInput style={styles.input} placeholder="Projection Years" keyboardType="numeric" value={years} onChangeText={setYears} />
      <TextInput style={styles.input} placeholder="OA" keyboardType="numeric" value={oa} onChangeText={setOA} />
      <TextInput style={styles.input} placeholder="SA" keyboardType="numeric" value={sa} onChangeText={setSA} />
      <TextInput style={styles.input} placeholder="MA" keyboardType="numeric" value={ma} onChangeText={setMA} />
      <Button title="Calculate" onPress={handleCalculate} />
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
});
