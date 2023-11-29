import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LogInScreen = ({ navigation}) => {
  const [password, setPassword] = useState('')
  const[email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const[warning, setWarning] = useState('')

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const incorrectAttempt = () =>{
    setEmail('');
    setPassword(''); 
    setWarning('Incorrect Username or Password');
  }

  const verifyLogin = async (email, password) =>{
    try {
      const response = await fetch(
        'http://192.168.1.9:5000/api/login', 
        {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          })});
      const json = await response.json()
      return json

    } catch (error){
      console.error(error);
      return false
    }
  }

  const storeAccessToken = async (token) => {
    try{
    await AsyncStorage.setItem('userToken', token)
    console.log('Token stored successfully');
  } catch(error) {
    console.error('Error storing token:', error);
  }
  }

  return(
    <View style={styles.screenContainer}>
       <Text style={{fontWeight: 'bold', fontSize: 48, color: '#E7EBE3', marginBottom: 40}}>LOG IN</Text>
       <Text style={{fontWeight: 'bold', fontSize: 24, color: 'red', marginBottom: 5}}>{warning}</Text>
       <View style= {styles.textInputContainer}>
        <Text style={styles.text}>Email:</Text>
        <TextInput placeholder="Enter email" style={styles.textInput} value={email} onChangeText={setEmail}></TextInput>
       </View>
      <View style= {styles.textInputContainer}>
        <Text style={styles.text} >Password:</Text>
        <TextInput 
            placeholder="Enter password" 
            style={styles.textInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}/>

            <MaterialCommunityIcons 
            name={showPassword ? 'eye-off' : 'eye'} 
            size={24} 
            color="#E7EBE3"
            style={styles.icon} 
            onPress={toggleShowPassword} 
            />
      </View>
      <Button title="Don't have an account? Click Here" onPress={() => navigation.navigate('SignUpScreen')}/>
      <TouchableOpacity 
      style={styles.button} 
      onPress={async () => 
        {
        const login_verification = await verifyLogin(email, password);
        if (login_verification.response === 'true') {
          const ID = login_verification.id;
          storeAccessToken(login_verification.access_token)
          navigation.navigate('CentralStack', {
            screen: 'HomeScreen',
            params: {'userID': ID},
          })}
        else{incorrectAttempt();}}}>
        <Text style={styles.text}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#E08952',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30
  },
  textInputContainer: {
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#1F2740',
    width: "90%",
    height: "10%",
    borderRadius: 15,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: '#E7EBE3',
    padding: 5,
    marginLeft: 10,
    borderRadius: 15,
    width: "80%",
    fontSize: 18
  },
  button: {
    backgroundColor: '#4A9493',
    width: "90%",
    height: "10%",
    marginTop: 275,
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: '#E7EBE3'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})
export default LogInScreen;