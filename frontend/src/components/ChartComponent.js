import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const ChartComponent = ({ type, data, options }) => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Cleanup previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Initialize chart
    chartInstanceRef.current = new Chart(chartRef.current, {
      type,
      data,
      options,
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [type, data, options]); // Reinitialize chart if props change

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;
