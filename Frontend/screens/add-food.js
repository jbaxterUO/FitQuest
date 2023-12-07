import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import NutritionDetails from './nutrition-details';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



const AddFood = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [foodInfo, setfoodInfo] = useState();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannerOpen(false);
    fetchItemByBarcode(data).then((result) => console.log(result));
  };

  const fetchItemByBarcode = async (barcode) => {
    try {
      let response = await fetch(`http://192.168.1.9:5000/api/getbarcode/${barcode}`);
      const json = await response.json();
      setfoodInfo(json);
      return json;
    } catch (e) {
      console.error(e);
    }
  };

  const fetchItemByTitle = async (searchString) => {
    try {
      let response = await fetch(`http://192.168.1.9:5000/api/getSearch/${searchString}`);
      const json = await response.json();
      setfoodInfo(json);
      return json;
    } catch (e) {
      console.error(e);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {scannerOpen && !scanned ? (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <SearchBar
                placeholder="Search for food..."
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
                onSubmitEditing={() => fetchItemByTitle(searchText)}
              />
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => {
                  setScannerOpen(!scannerOpen);
                  setScanned(false);
                }}
                style={styles.scanButton}
              >
                <Ionicons name="barcode" size={64} color="white"/>
              </TouchableOpacity>
            </View>

          </View>

          <ScrollView style={styles.scrollContainer}>
            {foodInfo && <NutritionDetails data={foodInfo}/>}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AddFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#1f1d1c',
  },
  buttonsContainer: {
    width: "15%",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 3,
    borderColor: 'white',
  },
  searchBar: {
    width: "85%"
  },
  scanButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

})