import { NavigationContainer } from '@react-navigation/native';
import { HomeStack } from './navigation/stack';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';


function App() {

  return (
    <NavigationContainer>
      <HomeStack />
      <StatusBar style='auto'/>  
    </NavigationContainer>
  );
}

export default App;


