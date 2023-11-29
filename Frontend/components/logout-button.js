import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const LogOutButton = ({ navigation }) => {
  return (
    <MaterialCommunityIcons
    name='door-open'
    size={24}
    color="white"
    style={{marginRight: 16}}
    onPress={() => {
    navigation.navigate('LoadUpScreen');
    }}
    />
  );
};

export default LogOutButton