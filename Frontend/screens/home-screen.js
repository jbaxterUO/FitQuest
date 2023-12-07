import { Text, View, StyleSheet, ScrollView, Button } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native"
import MacroGraphCardComponent from "../components/macro-graph-card";
import { useState, useEffect} from "react";
import PieChartComponent from "../components/piechart";
import { SafeAreaView } from "react-native-safe-area-context";
import useFoodStore from "../stores/food-entries-store";


export const HomeScreen = ({ route, navigation }) => {
  const { userID } = route.params;
  const [chartData, setChartData] = useState();
  const { dailyFood, fetchDailyFood, setDailyFoodItems, removeDailyFooditems } = useFoodStore();

  useEffect(() => {
    // Fetch data from the database
    onLaunch = () => {
      setChartData([150, 100, 200]);
      fetchDailyFood(0, 'http://192.168.1.9:5000/api/getdaily')
    }
    onLaunch();
    },[]);

    if(chartData){
      return(
        <SafeAreaView style={styles.screenContainer}>
          <View style={styles.cardsContainer}>
            <MacroGraphCardComponent>
              <PieChartComponent data={chartData}/>
              <Text style={styles.cardText}>Macros</Text>
            </MacroGraphCardComponent>
          </View>

          <View style={styles.cardsContainer}>
            <MacroGraphCardComponent>
                <PieChartComponent data={chartData}/>
                <Text style={styles.cardText}>Quests</Text>
            </MacroGraphCardComponent>
          </View>
        </SafeAreaView>


      );
    }
    else{
      return (
        <Text>"woop WOOP Woop"</Text>
      )
    }

}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignitems: 'center',
    backgroundColor: '#2a2b31',
  },
  cardsContainer: {
    flex: 2,
    alignItems: 'center'
  },
  cardText: {
    fontFamily: 'Menlo',
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
})

export default HomeScreen;