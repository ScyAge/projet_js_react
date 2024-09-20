import DivMeteoDataComponent from "./DivMeteoData.component.jsx";
import meteoData from "../data/meteo-data";
import DataCellComponent from "./dataCell.component.jsx";

const DataForCityComponent = ({city}) => {

    const res = city.data.map(dataMonth => <DivMeteoDataComponent data={dataMonth} key={dataMonth.pour}/>);
    const LignName = ["", "Temp minimale", "Temp maximale", "Pluviométrie", "Ensoleillement", "Jours de gel"]
    const entete = LignName.map(name => <DataCellComponent donnee={name} key={name}/>);

    return (
        <div className="dataForCity">
            <div className={"meteoData"}>{entete}</div>
            {res}
        </div>

    );
}

export default DataForCityComponent;