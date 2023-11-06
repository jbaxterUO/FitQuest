import { Text, View, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native"

export const HomeScreen = ({ route, navigation }) => {
  console.log(route)
  const { userID } = route.params
  return(
    <View style={styles.screen}>
      <Text style={styles.text}>This is a home for someone with ID: {userID} screen!</Text>
      <TouchableOpacity>
        <Text>Test switching screens in nested stack!</Text>
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

export default HomeScreen;