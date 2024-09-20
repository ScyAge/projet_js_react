import DataForCityComponent from "./DataForCity.component.jsx";
import '../assets/style/dataForCity.style.css';
import '../assets/style/dataComparison.style.css';
import '../assets/style/favorite.style.css';
import '../assets/style/chartZone.style.css';
import '../assets/style/app.style.css'
import {useState} from "react";
import meteoDataByCity from "../data/meteo-data";
import DataComparisonComponent from "./dataComparison.component.jsx";
import StarComponent from "./star.component.jsx";
import ChartZoneComponent from "./chartZone.component.jsx";


const App = () => {
    const city1 = meteoDataByCity[1] //dans notre cas bordeaux
    const city0 = meteoDataByCity[0] // Lille
    const [actualCity, setActualCity] = useState(city1);
    const optionSelect = meteoDataByCity.map(city => city.city===city1.city ?<option value={city.city} key={city.city} selected={true}>{city.city}</option> :<option value={city.city} key={city.city}>{city.city}</option>);
    const [staredCity, setStaredcity] = useState(city0);
    const [hide, setHide] = useState(false);
    const init_stateStared = (alldata) => alldata.map(city => city === city0 ? ({city_name: city.city, stared: true}) : ({city_name: city.city, stared: false}));
    const [stateStared, setStateStared] = useState(init_stateStared(meteoDataByCity));

    const handleChangeCity = event => {
        const new_city = meteoDataByCity.find(City => City.city === event.target.value);

        setActualCity(new_city);
    }

    const handleChangeStarCp = new_city => {

        const copyStateStared = [...stateStared]
        const old_stared = copyStateStared.find(city => city.city_name === staredCity.city);
        const new_stared = copyStateStared.find(city => city.city_name === new_city.city);
        if (old_stared === new_stared) {
            old_stared.stared = !old_stared.stared;
        } else {
            old_stared.stared = false;
            new_stared.stared = true;
            setStaredcity(new_city);
        }
        setStateStared(copyStateStared);
    }
    const hideButton = () => {
        setHide(prevState => !prevState);
    }

    const chartZone = hide ? <ChartZoneComponent actual={actualCity} fav={staredCity}/> : null;

    return (<div>
            <select onChange={handleChangeCity}>
                {optionSelect}
            </select>
            <StarComponent actualCity={actualCity} handleChangeStarCp={handleChangeStarCp} stateStared={stateStared}/>
            <div className={"dataFor"}>Data for {actualCity.city}</div>
            <DataForCityComponent city={actualCity}/>
            <DataComparisonComponent city={actualCity} stared={staredCity}/>
            <button onClick={hideButton}>{hide ? "caché" : "affiché"}</button>
            {chartZone}
        </div>);
}
export default App;
