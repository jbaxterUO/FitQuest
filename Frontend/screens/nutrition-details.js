import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import useFoodStore from '../stores/food-entries-store';

export const NutritionDetails = ({ route }) => {
  const [food, setFood] = useState({name: '', nutrients: {}, ingredients: ''});
  const { dailyFoodItems, setDailyFoodItems } = useFoodStore();
  let nutrientInfo = {}

  useEffect(() => {
    nutrientInfo = route.params.nutrientInfo;
    setFood(nutrientInfo);
  }, [route.params]);

  const handleReject = () => {
    setFood(null);
  }

  const handleConfirm = () => {
    setDailyFoodItems(food);
    setFood(null);
  }

  const renderNutrients = () => {
    if (!food || !food.nutrients) {
      return null;
    }
    return Object.keys(food.nutrients).map((nutrient, index) => (
      nutrient.includes('unit') ? null :
      <View key={index} style={styles.nutrientContainer}>
        <Text style={styles.nutrientName}>{nutrient}</Text>
        <Text style={styles.nutrientValue}>{food.nutrients[nutrient] || 0} {food.nutrients[`${nutrient}_unit`] || "g"}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{food.name}</Text>
      {renderNutrients()}
      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      <Text style={styles.ingredients}>{food.ingredients}</Text>
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
    flex: 1,
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
    backgroundColor: '#C1E1C1',
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

