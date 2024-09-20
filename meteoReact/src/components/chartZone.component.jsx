import {Bar} from "react-chartjs-2";
import {useEffect, useState} from "react";
import Chart   from 'chart.js/auto'

const LABELS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const corr_type_chaine = {temp_min: "Température minimale(°C)", temp_max: "Température maximale(°C)", pluviometrie: "Pluviométrie(mm)", ensoleillement: "Ensoleillement (jours)", jours_gel: "Jours de gel (jours)"}
const chartZoneComponent = ({actual, fav}) => {
    let MAX = 100;
    let MIN = -10
    const [type_data,setTypeData] = useState("temp_min");
    const buildValue = (city, type_data) => {
        return city.data.map(mois => type_data === "ensoleillement" ? (Math.round(mois[type_data] * 10) / 24) : mois[type_data]);
    }
    const buildData = () => {
        const city = buildValue(actual, type_data);
        const fav_city = buildValue(fav, type_data);
        MAX = Math.round(Math.max(Math.max(...city),Math.max(...fav_city)))+1;
        console.log(MAX);
        return (
            {
                labels: LABELS,
                datasets: [
                    {
                        label: `${actual.city}`,
                        data: city,
                        backgroundColor: 'rgb(255,128,128)',
                        borderColor: 'rgba(0, 0, 0, 0.5)',
                        borderWidth: 1
                    },
                    {
                        label: `${fav.city}`,
                        data: fav_city,
                        backgroundColor: 'gold',
                        borderColor: 'rgba(0, 0, 0, 0.5)',
                        borderWidth: 1
                    },

                ]
            })
    }
    const [chartData, setChartData] = useState(buildData());

    const chart = <div className="chartZone">
        <Bar
            data={chartData}
            options={{
                scales: {
                    y: {
                        min: MIN,
                        max: MAX,
                    }
                },
                animation: {
                    duration: 500,
                    easing: 'easeIn'
                },
                plugins: {
                    title: {
                        display: true,
                        text: corr_type_chaine[type_data]
                    }
                },
                legend: {
                    labels: {
                        fontSize: 14
                    }
                }
            }
            }
        />
    </div>
    useEffect(() => setChartData(buildData()),[actual,fav,type_data]);
    const changeData = (event) => {
        setTypeData(event.target.value);
    }

    return (

        <div className={"chartZone"}>
            <button value={"temp_min"} onClick={changeData} >Température minimale(°C)</button>
            <button value={"temp_max"} onClick={changeData}>Température maximale(°C)</button>
            <button value={"pluviometrie"} onClick={changeData}>Pluviométrie(mm)</button>
            <button value={"ensoleillement"} onClick={changeData}>Ensoleillement (jours)</button>
            <button value={"jours_gel"} onClick={changeData}>Jours de gel (jours)</button>
            {chart}
        </div>
    );
}

export default chartZoneComponent;