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
  const valueLineaCero = [];
  const [dataset, setDataset] = useState({ labelArray, valuesArray });
  const loadObjetivos = async () => {
    const res = await DataService.getObjetivosByDayAlcanzadosBySalon({ comunidad, periodo: 3, salon: user })
    res.sort((a, b) => a.id - b.id).forEach(doc => {
      labelArray.push(doc.id);
      valuesArray.push(doc.data().value);
      valueLineaCero.push(0);
    })
    setDataset({ labelArray, valuesArray, valueLineaCero });
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
        label: 'Facturacion',
        data: dataset.valuesArray,
        backgroundColor: 'rgba(114, 57, 248, 0.758)',
        borderColor: 'rgba(114, 57, 248, 0.519)',
      },
      {
        label: '',
        data: dataset.valueLineaCero,
        // backgroundColor: 'rgba(68, 67, 67, 0.5)',
        // borderColor: 'rgba(78, 77, 77, 0.779)',
      },
    ],
  }


  return (<>
    {labels === undefined ? <></> : <Line data={dataChart} options={options} />}
  </>
  )
}

export default ChartObjetivosView;
