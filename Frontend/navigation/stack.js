import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home-screen';
import {LogInScreen} from '../screens/login-screen';

const Stack = createStackNavigator();

export const HomeStack = () => {
  return(
    <Stack.Navigator 
    screenOptions={{
      headerMode: 'screen',
      headerStyle: {backgroundColor: '#FF5722'},
    }}
    >
      <Stack.Screen name="Log In" component={LogInScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

