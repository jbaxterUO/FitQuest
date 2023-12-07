import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Food = ({ name, nutrition, servingAmount, servingType }) => {
  const hasNutritionData = nutrition && Object.keys(nutrition).length > 0;
  return(
    <TouchableOpacity onPress={() => alert(`Clicked on: ${nutrition?.carbs || 'No Data'}`)}>
      <View style={styles.foodContainer}>
        <View style={styles.foodTitleContainer}>
          <Text style={styles.foodTitle}>{name}</Text>
        </View>
        <View style={styles.foodBodyContainer}>
          {hasNutritionData ? (
            <View>
              <Text style={styles.foodText}>Carbs: {nutrition.carbs}</Text>
              <Text style={styles.foodText}>Protein: {nutrition.protien}</Text>
              <Text style={styles.foodText}>Fat: {nutrition.fat}</Text>
            </View>
          ) : (
            <Text style={styles.foodText}>No Data</Text>
          )}
          <View>
            {hasNutritionData && (
              <>
                <Text style={styles.foodText}>Calories: {nutrition.calories}</Text>
                <Text style={styles.foodText}>{servingType}: {servingAmount}</Text>
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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