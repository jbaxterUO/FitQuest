import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button} from "react-native"
import { useState } from "react"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const verifyNewAccount = async (email, username, password) =>{
    try {
      const response = await fetch(
        'http://192.168.1.9:5000/api/newaccount', 
        {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          })});
      const json = await response.json()
      
      if(response.status === 200){
        return json;
      }
      else{
        setWarning(json.message);
        return json;
      }

    } catch (error){
      console.error(error);
      return JSON.stringify({'response': 'false'})
    }
  }


  return(
    
    <View style={styles.screenContainer}>
      <Text style={{fontWeight: 'bold', fontSize: 48, color: '#E7EBE3', marginBottom: 20}}>SIGN UP</Text>
      <Text style={{fontWeight: 'bold', fontSize: 20, color: 'red', marginBottom: 5}}>{warning}</Text>
      <View style= {styles.textInputContainer}>
        <Text style={styles.text} >Username:</Text>
        <TextInput placeholder="Enter username" style={styles.textInput} value={username} onChangeText={setUsername}/>
      </View>

      <View style= {styles.textInputContainer}>
        <Text style={styles.text} >Email:</Text>
        <TextInput placeholder="Enter email" style={styles.textInput} value={email} onChangeText={setEmail}/>
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
      <Button 
        title="Have an account? Click Here" 
  onPress={() => navigation.navigate('LogInScreen')}/>
      <TouchableOpacity style={styles.button}>
        <Text 
        style={styles.text} 
        onPress={async () => {
        const account_verification = await verifyNewAccount(email, username, password);
        if (account_verification.response === 'true') {
          navigation.navigate('CentralStack', 
          {
            screen: 'HomeScreen',
            params: {'userID': account_verification.id}
          }
          )}}}>Create Account</Text>
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
    marginTop: 180,
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

export default SignUpScreen;