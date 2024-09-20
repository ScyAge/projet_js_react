import DataCellComponent from "./dataCell.component.jsx";

const DivMeteoDataComponent = ({data}) => {


    return (
    <div className={"meteoData"}>
        <DataCellComponent donnee={data.pour}/>
        <DataCellComponent donnee={data.temp_min} unite={"temperature"}/>
        <DataCellComponent donnee={data.temp_max} unite={"temperature"}/>
        <DataCellComponent donnee={data.pluviometrie} unite={"mm"}/>
        <DataCellComponent donnee={data.ensoleillement} unite={"h"}/>
        <DataCellComponent donnee={data.jours_gel} unite={"jour"}/>
    </div>
    );
}

export default DivMeteoDataComponent;