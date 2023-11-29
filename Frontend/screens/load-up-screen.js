import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoadUpScreen({ navigation }) {
  const ID = 0;

  const retrieveToken = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem('userToken');
      return tokenValue;
    } catch (err) {
      console.error('Error retrieving token:', err);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const retrievedValue = await retrieveToken();
      if (retrievedValue !== null) {
        navigation.navigate('CentralStack', {
          screen: 'HomeScreen',
          params: { userID: ID },
        });
      }
    };

    fetchData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/SignUpBackGround.jpg')}
        style={styles.image}
        resizeMode="cover"
      >
        <View style={styles.screen}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LogInScreen')}>
            <Text style={styles.text}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: '1',
    justifyContent: 'flex-end',
  },
  screen: {
    padding: 10,
    justifyContent: 'center',
    margin: 10
  },
  text: {
    color: '#E7EBE3',
    textAlign: 'center',
    fontSize: 32,
    margin: 10
  },
})
export default LoadUpScreen;