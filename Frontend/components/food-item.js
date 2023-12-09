import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Food = ({ name, nutrients, servingAmount, servingType, ingredients, navigation }) => {
  const hasNutrientsData = nutrients && Object.keys(nutrients).length > 0;
  const foodInfo = {name: name, nutrients: nutrients, servingAmount: servingAmount, servingType: servingType, ingredients: ingredients};
  return(
    <TouchableOpacity onPress={() => {
      navigation.navigate('NutritionDetails', {nutrientInfo: foodInfo});
      }}>

      <View style={styles.foodContainer}>
        <View style={styles.foodTitleContainer}>
          <Text style={styles.foodTitle}>{name}</Text>
        </View>
        <View style={styles.foodBodyContainer}>
          {hasNutrientsData ? (
            <View>
              <Text style={styles.foodText}>Carbs: {nutrients.carbohydrates}</Text>
              <Text style={styles.foodText}>Protein: {nutrients.protein}</Text>
              <Text style={styles.foodText}>Fat: {nutrients.fat}</Text>
            </View>
          ) : (
            <Text style={styles.foodText}>No Data</Text>
          )}
          <View>
            {hasNutrientsData && (
              <>
                <Text style={styles.foodText}>Calories: {nutrients.calories}</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#1f1d1c',
    marginVertical: 5,
    borderRadius: 5,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    borderWidth: 1,
    marginBottom: 1,
  },
  foodTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  foodBodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodTitle: {
    color: 'white',
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
  foodText: {
    color: 'white',
    fontFamily: 'Menlo',
    fontSize: 14,
    marginTop: 5,
  },
});

export default Food;