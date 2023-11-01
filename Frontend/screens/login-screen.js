import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

export const LogInScreen = () => {
  const navigation = useNavigation()
  return(
    <View style={styles.screen}>
       <View style= {styles.textInputContainer}>
        <Text style={styles.text}>Email</Text>
        <TextInput placeholder="email" style={styles.textInput}></TextInput>
       </View>
      <View style= {styles.textInputContainer}>
        <Text style={styles.text}>Password</Text>
        <TextInput placeholder="password" style={styles.textInput}></TextInput>
      </View>
      <View style={{alignContent: 'center'}}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center'
  },
  textInputContainer: {
    margin: 5
  },
  textInput: {
    backgroundColor: 'white',
    padding: 20
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: '#333333'
  },
  btn: {
    backgroundColor: '#007AFF',
    height: '25%',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 20
  }
})

export default LogInScreen;