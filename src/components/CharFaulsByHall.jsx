import React, { useEffect, useState } from "react";
import DataService from '../service/service';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Col, Divider } from "antd";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CharFaulsByHall = ({ labels }) => {
  const labelArray = [];
  const valuesArray = [];

  useEffect(() => {
    if (labels !== undefined && labels !== null) {
      for (const item in labels) {
        labelArray.push(item);
        valuesArray.push(labels[item]);
      }
    }


  }, [labels]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Faults by hall",
      },
    },
  };
  const dataChart = {
    labels: labelArray,
    datasets: [
      {
        label: 'Salones',
        data: valuesArray,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }


  return (<>
    <Divider orientation="left" style={{ border: 'black' }}>Grafico </Divider>
    {labels === undefined ? <></> : <Bar data={dataChart} options={options} />}
  </>
  )
}

export default CharFaulsByHall;
