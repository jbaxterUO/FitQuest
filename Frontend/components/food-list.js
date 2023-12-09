// FoodList.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Food from './food-item';


const FoodList = ({ foodItems, navigation }) => {

  useEffect(() => {
  }, [foodItems]);

  if(foodItems){
  return (
    
    <View style={styles.listContainer}>
      <FlatList
        data={foodItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <Food {...item} navigation={navigation}/>}
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
