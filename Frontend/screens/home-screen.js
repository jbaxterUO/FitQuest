import { Text, View, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native"

export const HomeScreen = () => {
  const navigation = useNavigation()
  return(
    <View style={styles.screen}>
      <Text style={styles.text}>This is Jesse's home screen!</Text>
      <TouchableOpacity>
        <Text>Test switching screens in nested stack!</Text>
      </TouchableOpacity>
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