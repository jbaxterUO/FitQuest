import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Make sure to import the appropriate icon library

export const AddFoodBackButton = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ViewDailyFoods')}>
      <FontAwesome5 name="arrow-left" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default AddFoodBackButton;