import DataCellComponent from "./dataCell.component.jsx";
import DivMeteoDataComponentBIS from "./DivMeteoDataBIS.component.jsx";

const DataComparisonComponent = ({city,stared}) => {
    const LignName = ["", "Temp minimale", "Temp maximale", "Pluviométrie", "Ensoleillement", "Jours de gel"]
    const entete = LignName.map(name => <DataCellComponent donnee={name} key={name}/>);

    return (
        <div className={"dataComparison"}>
            <div className={"meteoData"}>{entete}</div>
            <DivMeteoDataComponentBIS data={city.data} ville={city.city}/>
            <DivMeteoDataComponentBIS data={stared.data} ville={stared.city} fav={"favorite"}/>
        </div>
    );
}

export default DataComparisonComponent;