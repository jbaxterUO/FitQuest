import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Food = ({ name, nutrition, servingAmount, servingType }) => (
  <View style={styles.foodContainer}>
    <View style={styles.foodTitleContainer}>
      <Text style={styles.foodTitle}>{name}</Text>
    </View>
  
    <View style={styles.foodBodyContainer}>
      <View>
        <Text style={styles.foodText}>Carbs: {nutrition.carbs ? nutrition.carbs : ''}</Text>
        <Text style={styles.foodText}>Protien: {nutrition.protien ? nutrition.protien : ''}</Text>
        <Text style={styles.foodText}>Fat: {nutrition.fat ? nutrition.fat : ''}</Text>
      </View>
      <View>
        <Text style={styles.foodText}>Calories: {nutrition.calories ? nutrition.calories : ''}</Text>
        <Text style={styles.foodText}>{servingType}: {servingAmount ? servingAmount : ''}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  foodContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#1f1d1c',
  },
  foodTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  foodBodyContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodTitle:
  {
    color: 'white',
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
  foodText: {
    color: 'white',
    fontFamily: 'Menlo'
  }
});

export default Food;