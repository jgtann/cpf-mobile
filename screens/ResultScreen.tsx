import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CPFYearProjection } from '../utils/cpfCalculator';

const getSummaryData = (results: CPFYearProjection[]) => {
  if (results.length === 0) return null;

  const first = results[0];
  const last = results[results.length - 1];

  const totalStart = first.oa + first.sa + first.ra + first.ma;
  const totalEnd = last.total;
  const totalInterest = totalEnd - totalStart;

  return {
    endYear: last.year,
    endAge: last.age,
    totalCPF: totalEnd,
    totalInterest,
    reachedRetirement: last.age >= 55,
  };
};

export default function ResultsScreen({ route }: any) {
  const results: CPFYearProjection[] = route.params.results;

  const summary = getSummaryData(results);

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

      {/* ✅ Summary Cards */}
      {summary && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>📆 Age {summary.endAge} in {summary.endYear}</Text>
          <Text style={styles.summaryText}>💰 Total CPF: {renderCurrency(summary.totalCPF)}</Text>
          <Text style={styles.summaryText}>📈 Interest Earned: {renderCurrency(summary.totalInterest)}</Text>
          {summary.reachedRetirement && (
            <Text style={styles.summaryText}>🎯 Retirement Account created at age 55</Text>
          )}
        </View>
      )}

      {/* ✅ Tables */}
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
  summaryContainer: {
    backgroundColor: '#e6f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
    color: '#004d4d',
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
