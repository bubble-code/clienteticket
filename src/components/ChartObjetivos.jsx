import React, { useEffect, useState } from "react";
import DataService from '../service/service';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import useAuth from "../hooks/useAuth";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const ChartObjetivosView = () => {
  const { auth } = useAuth();
  const { comunidad, user } = auth;
  const labelArray = [];
  const valuesArray = [];
  const [dataset, setDataset] = useState({ labelArray, valuesArray });
  const loadObjetivos = async () => {
    const res = await DataService.getObjetivosByDayAlcanzadosBySalon({ comunidad, periodo: 3, salon: user })
    res.forEach(doc => {
      labelArray.push(doc.id);
      valuesArray.push(doc.data().value);
    })
    setDataset({ labelArray, valuesArray });
  }

  useEffect(() => {
    loadObjetivos();
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: "Facturacion",
      },
    },
  };
  const dataChart = {
    labels: dataset.labelArray,
    datasets: [
      {
        label: 'Facturacion por Dia',
        data: dataset.valuesArray,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }


  return (<>
    {labels === undefined ? <></> : <Line data={dataChart} options={options} />}
  </>
  )
}

export default ChartObjetivosView;
