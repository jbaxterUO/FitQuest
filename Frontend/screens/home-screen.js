import { Text, View, StyleSheet } from "react-native"

export const HomeScreen = () => {
  return(
    <View style={styles.screen}>
      <Text style={styles.text}>This is Jesse's home screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20
  },
  text: {
    fontSize: 30
  }
})

export default HomeScreen;