import {HomeScreen} from '../screens/home-screen';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViewDailyFoods from '../screens/view-daily-foods';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import LogOutButton from '../components/logout-button';
import AddFood from '../screens/add-food';
import NutritionDetials from '../screens/nutrition-details';

const Tab = createBottomTabNavigator()

export const CentralStack = () => {
  return(
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        "tabBarStyle": [{backgroundColor: '#33415c'}, {color: 'white'}],
        headerRight: () => <LogOutButton navigation={navigation} />
        })}
    >
      <Tab.Screen 
      name="HomeScreen" 
      component={HomeScreen} 
      options={{title: "FitQuest",
                tabBarIcon: ({focused}) => {return <Octicons name='home' size={24} color="black"/>},
                tabBarActiveTintColor: 'white',
                tabBarLabel: 'Home',
                headerStyle: {backgroundColor: '#33415c',}, 
                headerTintColor: '#E7EBE3', 
                headerTitleStyle: {fontSize: 32, fontWeight: 'bold', fontFamily: 'Menlo'}}}
      />
      <Tab.Screen
      name="ViewDailyFoods"
      component={ViewDailyFoods}
      options={{
        title: 'FitQuest',
        tabBarIcon: ({focused}) => {return <FontAwesome5 name="journal-whills" size={24} color="black" />},
        tabBarActiveTintColor: 'white',
        tabBarLabel: 'Journal',
        headerStyle: {backgroundColor: '#33415c',}, 
        headerTintColor: '#E7EBE3', 
        headerTitleStyle: {fontSize: 32, fontWeight: 'bold', fontFamily: 'Menlo'}}}
      />

    <Tab.Screen
      name="AddFood"
      component={AddFood}
      options={{
        title: 'FitQuest',
        tabBarIcon: ({focused}) => {return <FontAwesome5 name="plus" size={24} color="black" />},
        tabBarActiveTintColor: 'white',
        tabBarLabel: 'AddFood',
        headerStyle: {backgroundColor: '#33415c',}, 
        headerTintColor: '#E7EBE3', 
        headerTitleStyle: {fontSize: 32, fontWeight: 'bold', fontFamily: 'Menlo'}}}
      />
    </Tab.Navigator>
  );
}


styles = StyleSheet.create({
  header: {
    backgroundColor: '#2a2b31',
    fontFamily: 'Menlo', 
    color: 'white'
  }

})