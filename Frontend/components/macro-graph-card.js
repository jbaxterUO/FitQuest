import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import PieChartComponent from './piechart';

const MacroGraphCardComponent = ({ children }) => {

  return (
      <View style={styles.card}>
        {children}
      </View>
  );
};


styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '75%',
    backgroundColor: '#1f1d1c', 
    borderRadius: 20,
    paddingTop: 5,
  },

})


export default MacroGraphCardComponent;