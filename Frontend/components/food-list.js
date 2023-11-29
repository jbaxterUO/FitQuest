// FoodList.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Food from './food-item';


const FoodList = ({ foodItems }) => {
  const [foods, setFoods] = useState([]);

  useEffect(()=> {
  const fetchDaysFood = () => {
    setFoods(foodItems);
    }
    fetchDaysFood();
   }, [foodItems]);

  if(foods){
  return (
    
    <View style={styles.listContainer}>
      <FlatList
        data={foods}
        renderItem={({ item }) => <Food {...item} />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
    </View>
  );}
  else{
    return null;
  }
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  flatList: {
      flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2b31'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
    color: 'white'
  },
});

export default FoodList;
