import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { CentralStack } from './navigation/central-stack';
import LoadUpScreen from './screens/load-up-screen';
import LogInScreen from './screens/login-screen';
import 'react-native-gesture-handler';
import { SignUpScreen } from './screens/sign-up-screen';

const RootStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="LoadUpScreen" component={LoadUpScreen} options={{headerShown: false}}/>
        <RootStack.Screen 
          name="SignUpScreen" 
          component={SignUpScreen} 
          options={{title: "FitQuest", headerLeft: () => null, headerStyle: {backgroundColor: '#1F2740'}, headerTintColor: '#E7EBE3', headerTitleStyle: {fontSize: 32, fontWeight: 'bold'}}}
          />
        <RootStack.Screen 
        name="LogInScreen" 
        component={LogInScreen} 
        options={{title: "FitQuest", headerLeft: () => null,  headerStyle: {backgroundColor: '#1F2740'}, headerTintColor: '#E7EBE3', headerTitleStyle: {fontSize: 32, fontWeight: 'bold'}}}
        />
        <RootStack.Screen name="CentralStack" component={CentralStack} options={{headerShown: false, headerLeft: () => null}}/>
      </RootStack.Navigator>
      <StatusBar style="auto"/>
    </NavigationContainer>
  );
}

export default App;


