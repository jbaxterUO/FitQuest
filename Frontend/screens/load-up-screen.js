import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native"

function LoadUpScreen ({ navigation }){
  const handleNavigateToLoginScreen = () =>{
    navigation.navigate("LogInScreen")
  }

  const handleNavigateToSignUpScreen = () =>{
    navigation.navigate("SignUpScreen")
  }

  return(
    <View style={styles.container}>
      <ImageBackground source={require('../assets/SignUpBackGround.jpg')} style={styles.image} resizeMode="cover">
        <View style={styles.screen}>
          <TouchableOpacity onPress={handleNavigateToSignUpScreen}>
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigateToLoginScreen}>
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