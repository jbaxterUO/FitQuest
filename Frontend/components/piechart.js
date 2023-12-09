// PieChart.js
import React, { Component, useEffect, useState } from 'react';
import PieChart from 'react-native-pie-chart'
import useFoodStore from "../stores/food-entries-store";

const PieChartComponent = ({ data }) =>{
  const widthAndHeight = 150
  const temp = [100]
  const tempColor = ['#b3ead6']
  const sliceColor = ['#b3ead6', '#ff99a1', '#ffc29e']
  const { dailyMacros } = useFoodStore();
  const[macrosNonZero, setMacrosNonZero] = useState(false);

  const chartCheck = (data) => {;
    if(!data){
      return false;
    };
    let total = 0;
    data.forEach((item) => {
      total += item;
    });
    if(total > 0){
      setMacrosNonZero(true);
    }
  }

  useEffect(() => {
    chartCheck(dailyMacros);
  }, [dailyMacros]);

    return (
      <PieChart
      widthAndHeight={widthAndHeight}
      series={macrosNonZero ? dailyMacros : temp}
      sliceColor={macrosNonZero ? sliceColor: tempColor}
      coverRadius={0.65}
    />
    );

};

export default PieChartComponent;