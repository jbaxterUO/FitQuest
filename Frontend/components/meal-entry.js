import {ScrollView, StyleSheet, Text} from 'react-native';

export default function MealEntry() {
  return (
        <Text style={styles.text}>
          Here is my block of text!
        </Text>
  );
}


const styles = StyleSheet.create({
  text: {
    color: 'white',
  }
});