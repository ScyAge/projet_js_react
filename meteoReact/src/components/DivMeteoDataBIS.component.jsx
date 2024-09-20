import DataCellComponent from "./dataCell.component.jsx";

const DivMeteoDataComponentBIS = ({data, ville, fav = ""}) => {

    const moy_temp_min = data.reduce((prev, mois) => prev + mois.temp_min, 0) / 12;
    const moy_temp_max = data.reduce((prev, mois) => prev + mois.temp_max, 0) / 12;
    const sum_pluv = data.reduce((prev, mois) => prev + mois.pluviometrie, 0);
    const sum_ens = data.reduce((prev, mois) => prev + mois.ensoleillement, 0);
    const sum_jdg = data.reduce((prev, mois) => prev + mois.jours_gel, 0);
    return (
        <div className={`meteoData ${fav}`}>
            <DataCellComponent donnee={ville}/>
            <DataCellComponent donnee={Math.round(moy_temp_min * 10) / 10} unite={"temperature"}/>
            <DataCellComponent donnee={Math.round(moy_temp_max * 10) / 10} unite={"temperature"}/>
            <DataCellComponent donnee={sum_pluv} unite={"mm"}/>
            <DataCellComponent donnee={sum_ens} unite={"h"}/>
            <DataCellComponent donnee={sum_jdg} unite={"jour"}/>
        </div>
    );
}

export default DivMeteoDataComponentBIS;