import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // or use MaterialIcons
import { CPFYearProjection } from '../utils/cpfCalculator';


export default function ResultsScreen({ route }: any) {
  const results: CPFYearProjection[] = route.params.results;

  const before55 = results.filter(item => item.age < 55);
  const from55Onward = results.filter(item => item.age >= 55);

  const [showDetailsBefore55, setShowDetailsBefore55] = useState(false);
  const [showDetailsFrom55, setShowDetailsFrom55] = useState(false);

  const renderCurrency = (value: number) => 
     `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const renderTable = (
  data: CPFYearProjection[],
  label: string,
  useRA: boolean,
  showDetails: boolean,
  toggleDetails: () => void
) => (
  <>
    <TouchableOpacity style={styles.sectionHeader} onPress={toggleDetails}>
      <Text style={styles.sectionTitle}>{label}</Text>
      <Icon
        name={showDetails ? 'chevron-up' : 'chevron-down'}
        size={22}
        color="#007777"
      />
    </TouchableOpacity>

    <View style={styles.tableHeader}>
      <Text style={styles.headerCell}>Year</Text>
      <Text style={styles.headerCell}>Age</Text>
      {showDetails ? (
        <>
          <Text style={styles.headerCell}>OA</Text>
          <Text style={styles.headerCell}>{useRA ? 'RA' : 'SA'}</Text>
          <Text style={styles.headerCell}>MA</Text>
        </>
      ) : (
        <Text style={styles.headerCell}>Total</Text>
      )}
    </View>

    {data.map((item) => (
      <View key={item.year} style={styles.tableRow}>
        <Text style={styles.cell}>{item.year}</Text>
        <Text style={styles.cell}>{item.age}</Text>
        {showDetails ? (
          <>
            <Text style={styles.cell}>{renderCurrency(item.oa)}</Text>
            <Text style={styles.cell}>
              {renderCurrency(useRA ? item.ra : item.sa)}
            </Text>
            <Text style={styles.cell}>{renderCurrency(item.ma)}</Text>
          </>
        ) : (
          <Text style={[styles.cell, styles.bold]}>
            {renderCurrency(item.total)}
          </Text>
        )}
      </View>
    ))}
  </>
);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CPF Projection Tables</Text>
      {before55.length > 0 &&
        renderTable(before55, 'Before Age 55', false, showDetailsBefore55, () =>
          setShowDetailsBefore55(!showDetailsBefore55)
        )}
      {from55Onward.length > 0 &&
        renderTable(from55Onward, 'From Age 55 Onward', true, showDetailsFrom55, () =>
          setShowDetailsFrom55(!showDetailsFrom55)
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#006666',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  toggleButton: {
    fontSize: 14,
    color: '#007777',
    textDecorationLine: 'underline',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0f7f7',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
  },
  bold: {
    fontWeight: '600',
  },
});
