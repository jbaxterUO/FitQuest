import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import FoodList from './../components/food-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';


export const AddFoodScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateIndex, setDateIndex] = useState(1)
  const [weeklyFood, setWeeklyFood] = useState()
  const [page, setPage] = useState(0) 
  
  const fetchFoodItems = async (page) => {
    try{
        let response = await fetch(
        'http://192.168.1.9:5000/api/getdaily', 
        {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageNumber: page
          })});
          const json = await response.json();
          return json;
    } catch (e) {
      console.error(e);
  }}

  useEffect( () => {
      async function initialFetch(){
        const initial_week = await fetchFoodItems(page);
        setWeeklyFood(initial_week);
      }
      initialFetch()
    }, []);

  const incrementDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setDateIndex(dateIndex - 1);
    setCurrentDate(newDate);
  };

  const decrementDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
    setDateIndex(dateIndex + 1);

    //Plus 1 before modulo to request data one before scroll for smoother loading
    if((dateIndex + 1) % 7 === 0){
      // A bit of an expensive operation but it keeps the data fetching in check, also there should never be more than ~60 items in memory at once for this so it should be okay
      const keysArray = Object.keys(weeklyFood).map(Number);
      const maxKeyValue = Math.max(... keysArray)

      // Plus 2 because we want to see if the next value would need to be loaded and we are already in here on the dateIndex + 1 so, 1 past that
       if(dateIndex + 2 > maxKeyValue){
        setPage(page + 1); 
        handleNewPage();
       }
    }
  };

  const handleNewPage = async () => {
    const next_page = await fetchFoodItems(page + 1);
    setWeeklyFood({...weeklyFood, ...next_page});
  }

  const handleAddFood = () => {
    console.log("BIG MAD")
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={decrementDate}>
          <Text style={styles.button}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{currentDate.toDateString()}</Text>
        <TouchableOpacity onPress={incrementDate}>
          <Text style={styles.button}>Next</Text>
        </TouchableOpacity>
      </View>
      {weeklyFood && (<FoodList foodItems={weeklyFood[dateIndex]}/>)}
      
      <Button title="Add Food" onPress={handleAddFood} />
    </SafeAreaView>
  );
}

export default AddFoodScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#2a2b31',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    height: '10%',
    borderBottomWidth: 3,
    borderColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    fontFamily: 'Menlo',
    textAlign: 'center',
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 6,
    color: 'white',
    fontFamily: 'Menlo',
    textAlign: 'center',
  },

})