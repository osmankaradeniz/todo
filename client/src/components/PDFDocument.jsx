import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center'
  },
  cell: {
    width: '50%',
    padding: 5,
    justifyContent: 'center',
    paddingHorizontal: "12px",
    paddingVertical: "6px"
  },
  headerCell: {
    backgroundColor: '#f1f1f1',
    fontWeight: 'bold'
  }
});

const PDFDocument = ({ data }) => {
  console.log(JSON.stringify(data, null, 4));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={[styles.cell, styles.headerCell]}>
              <Text>Mission</Text>
            </View>
            <View style={[styles.cell, styles.headerCell]}>
              <Text>Date</Text>
            </View>
            <View style={[styles.cell, styles.headerCell]}>
              <Text>Checked</Text>
            </View>

          </View>
          {data.map((item, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.cell}>
                <Text>{item.text}</Text>
              </View>
              <View style={styles.cell}>
                <Text>{item.time}</Text>
              </View>
              <View style={styles.cell}>
                <Text>{item.checked ? 'true' : 'false'}</Text>
              </View>

            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
};

export default PDFDocument;
