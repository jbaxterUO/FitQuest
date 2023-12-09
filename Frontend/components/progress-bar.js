import { View, Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const ProgressBarComponent = () => {
  const data = {
    data: [
      { value: 0.5, color: '#FF6384' },
      { value: 0.75, color: '#36A2EB' },
      { value: 1, color: '#FFCE56' },
      { value: 0.1, color: '#4BC0C0' },
    ],
    labels: ["Hit Macro Goal", "Hit Calorie Goal", "Weekly Gym Goal", "Weekly Weight Goal"]
  };

  return (
    <View>
      {data.data.map((item, index) => (
        <View key={index} style={styles.itemContainer}> 
          <View style={{ backgroundColor: 'white', width: `100%`, height: 30, borderRadius: 10, marginBottom: 6}}>
            <View style={{ backgroundColor: item.color, width: `${item.value * 100}%`, height: 30,  borderRadius: 10, marginBottom: 6}}></View>
          </View>
          <Text style={styles.text}>{data.labels[index]}</Text>
        </View>
      ))}
    </View>
  );
};

export default ProgressBarComponent;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    width: '50%'
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 1,
    color: 'white',
    fontFamily: 'Menlo',
    paddingLeft: 5,
  },
  });