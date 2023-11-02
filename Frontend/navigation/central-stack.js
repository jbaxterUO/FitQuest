import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home-screen';

const Stack = createStackNavigator();

export const CentralStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerLeft: () => null}}/>
    </Stack.Navigator>
  );
}