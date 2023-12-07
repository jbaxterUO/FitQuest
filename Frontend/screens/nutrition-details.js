import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useFoodStore from '../stores/food-entries-store';
import { useState } from 'react';
import { Button } from 'react-native-elements';

export const NutritionDetails = ({ data }) => {
  const [food, setFood] = useState(data);
  const { dailyFood, setDailyFoodItems, removeDailyFooditems } = useFoodStore();

  useEffect(() => {
    setFood(data);
  }, [data]);

  const handleReject = () => {
    setFood(null);
  }

  const handleConfirm = () => {
    setDailyFoodItems(food);
    print(dailyFood);
    setFood(null);
  }

  const renderNutrients = () => {
    if (!food || !food.nutriments) {
      return null;
    }

    const nutrients = food.nutriments;

    return Object.keys(nutrients).map((nutrient, index) => (
      <View key={index} style={styles.nutrientContainer}>
        <Text style={styles.nutrientName}>{nutrient}</Text>
        <Text style={styles.nutrientValue}>{nutrients[nutrient] || 0} {nutrients[`${nutrient}_unit`]}</Text>
      </View>
    ));
  };

  if (!food) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{food.product_name_en}</Text>
      {renderNutrients()}
      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      <Text style={styles.ingredients}>{food.ingredients_text_en}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NutritionDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1f1d1c',
  },
  title: {
    color: 'white',
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 10,
  },
  nutrientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    marginBottom: 2,
  },
  nutrientName: {
    flex: 2,
    color: 'white',
    fontFamily: 'Menlo'
  },
  nutrientValue: {
    flex: 1,
    textAlign: 'right',
    color: 'white',
    fontFamily: 'Menlo'
  },
  ingredientsTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Menlo'
  },
  ingredients: {
    marginTop: 5,
    color: 'white',
    fontFamily: 'Menlo',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#F5E6CA',
    padding: 10,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: '#F5CACA',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Menlo',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

