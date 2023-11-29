// PieChart.js
import React, { Component } from 'react';
import PieChart from 'react-native-pie-chart'

const PieChartComponent = ({ data }) =>{
  const widthAndHeight = 125
  const temp = [100, 200, 150]
  const sliceColor = ['#b3ead6', '#ff99a1', '#ffc29e']
    return (
      <PieChart
      widthAndHeight={widthAndHeight}
      series={data ? data : temp}
      sliceColor={sliceColor}
      coverRadius={0.65}
    />
    );

};

export default PieChartComponent;